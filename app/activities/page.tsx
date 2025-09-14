'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { mockActivities, activityCategories } from '@/lib/mockData';
import { useOffline } from '@/lib/offline';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Plus, 
  Upload, 
  Calendar, 
  FileText, 
  Trophy, 
  Search,
  Filter,
  CheckCircle,
  Clock,
  XCircle,
  Lightbulb
} from 'lucide-react';

export default function ActivitiesPage() {
  const { user } = useAuth();
  const { saveOfflineData, isOnline } = useOffline();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newActivity, setNewActivity] = useState({
    title: '',
    category: '',
    provider: '',
    date: '',
    endDate: '',
    description: '',
    certificateFile: null as File | null
  });

  const userActivities = mockActivities.filter(activity => activity.studentId === user?.id);

  const filteredActivities = userActivities.filter(activity => {
    const matchesSearch = activity.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         activity.provider.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filterCategory === 'all' || activity.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const autoFillSuggestions = [
    {
      title: 'Complete Python for Data Science',
      category: 'MOOC',
      provider: 'Coursera - University of Michigan'
    },
    {
      title: 'AWS Solutions Architect Associate',
      category: 'MOOC', 
      provider: 'Amazon Web Services'
    },
    {
      title: 'Google Summer of Code',
      category: 'Research',
      provider: 'Google LLC'
    },
    {
      title: 'IEEE Student Branch Secretary',
      category: 'Leadership',
      provider: 'IEEE Student Branch'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const activityData = {
      ...newActivity,
      id: Date.now().toString(),
      studentId: user?.id,
      status: 'pending',
      submittedDate: new Date().toISOString(),
      credits: 3 // Default credits
    };

    if (isOnline()) {
      // In a real app, this would send to the backend
      await fetch('/api/activities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(activityData)
      });
    } else {
      // Save offline for later sync
      saveOfflineData({ activities: [activityData] });
    }

    setIsAddDialogOpen(false);
    setNewActivity({
      title: '',
      category: '',
      provider: '',
      date: '',
      endDate: '',
      description: '',
      certificateFile: null
    });

    // Refresh page or update local state
    window.location.reload();
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewActivity({ ...newActivity, certificateFile: file });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-orange-600" />;
      case 'rejected':
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-orange-100 text-orange-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <ProtectedRoute allowedRoles={['student']}>
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Activity Tracker</h1>
              <p className="text-gray-600">Add and manage your achievements, certifications, and activities</p>
            </div>
            <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
              <DialogTrigger asChild>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Activity
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Add New Activity</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="title">Activity Title</Label>
                      <Input
                        id="title"
                        placeholder="e.g., Machine Learning Course"
                        value={newActivity.title}
                        onChange={(e) => setNewActivity({ ...newActivity, title: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select onValueChange={(value) => setNewActivity({ ...newActivity, category: value })}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          {activityCategories.map(category => (
                            <SelectItem key={category} value={category}>{category}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="provider">Provider/Organization</Label>
                    <Input
                      id="provider"
                      placeholder="e.g., Coursera - Stanford University"
                      value={newActivity.provider}
                      onChange={(e) => setNewActivity({ ...newActivity, provider: e.target.value })}
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="date">Start Date</Label>
                      <Input
                        id="date"
                        type="date"
                        value={newActivity.date}
                        onChange={(e) => setNewActivity({ ...newActivity, date: e.target.value })}
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date (Optional)</Label>
                      <Input
                        id="endDate"
                        type="date"
                        value={newActivity.endDate}
                        onChange={(e) => setNewActivity({ ...newActivity, endDate: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description</Label>
                    <Textarea
                      id="description"
                      placeholder="Describe what you learned or achieved..."
                      value={newActivity.description}
                      onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                      rows={3}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="certificate">Certificate/Document</Label>
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                      <input
                        id="certificate"
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={handleFileUpload}
                        className="hidden"
                      />
                      <label htmlFor="certificate" className="cursor-pointer">
                        <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-600 mb-1">
                          {newActivity.certificateFile ? newActivity.certificateFile.name : 'Click to upload certificate'}
                        </p>
                        <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
                      </label>
                    </div>
                  </div>

                  {/* Auto-fill Suggestions */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-3">
                      <Lightbulb className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">Quick Fill Suggestions</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                      {autoFillSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          onClick={() => setNewActivity({
                            ...newActivity,
                            title: suggestion.title,
                            category: suggestion.category,
                            provider: suggestion.provider
                          })}
                          className="text-left p-2 bg-white border border-blue-200 rounded hover:bg-blue-50 transition-colors"
                        >
                          <p className="text-sm font-medium text-blue-900">{suggestion.title}</p>
                          <p className="text-xs text-blue-600">{suggestion.category} • {suggestion.provider}</p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {!isOnline() && (
                    <Alert>
                      <AlertDescription>
                        You're offline. This activity will be saved locally and synced when you're back online.
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex justify-end space-x-3">
                    <Button type="button" variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                      Add Activity
                    </Button>
                  </div>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                      placeholder="Search activities..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="md:w-48">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger>
                      <Filter className="h-4 w-4 mr-2" />
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {activityCategories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Activities List */}
          <div className="grid grid-cols-1 gap-6">
            {filteredActivities.length > 0 ? (
              filteredActivities.map((activity) => (
                <Card key={activity.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1 space-y-3">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(activity.status)}
                          <h3 className="text-lg font-semibold text-gray-900">{activity.title}</h3>
                          <Badge variant="secondary">{activity.category}</Badge>
                          <Badge className={`${getStatusColor(activity.status)} capitalize`}>
                            {activity.status}
                          </Badge>
                        </div>

                        <p className="text-gray-600">{activity.provider}</p>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(activity.date).toLocaleDateString()}
                              {activity.endDate && ` - ${new Date(activity.endDate).toLocaleDateString()}`}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Trophy className="h-4 w-4" />
                            <span>{activity.credits} Credits</span>
                          </div>
                        </div>

                        <p className="text-gray-700">{activity.description}</p>

                        {activity.status === 'approved' && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className="text-sm text-green-800">
                              ✅ Approved by {activity.approvedBy} on {new Date(activity.approvedDate!).toLocaleDateString()}
                            </p>
                          </div>
                        )}

                        {activity.status === 'rejected' && (
                          <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                            <p className="text-sm text-red-800">
                              ❌ Rejected by {activity.rejectedBy} on {new Date(activity.rejectedDate!).toLocaleDateString()}
                            </p>
                            <p className="text-sm text-red-700 mt-1">{activity.rejectionReason}</p>
                          </div>
                        )}
                      </div>

                      <div className="ml-6">
                        <Button variant="outline" size="sm">
                          <FileText className="h-4 w-4 mr-2" />
                          View Certificate
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <Trophy className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No activities found</h3>
                  <p className="text-gray-600 mb-4">
                    {searchTerm || filterCategory !== 'all' 
                      ? 'Try adjusting your search or filter criteria.'
                      : 'Start adding your achievements and certifications to build your portfolio.'
                    }
                  </p>
                  <Button onClick={() => setIsAddDialogOpen(true)} className="bg-blue-600 hover:bg-blue-700">
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Activity
                  </Button>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}