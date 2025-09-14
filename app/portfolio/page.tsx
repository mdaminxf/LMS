'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { mockActivities, portfolioTemplates } from '@/lib/mockData';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { 
  FileText, 
  Download, 
  Share2, 
  Eye, 
  QrCode, 
  Copy,
  Check,
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Award,
  BookOpen,
  Briefcase,
  Users
} from 'lucide-react';

export default function PortfolioPage() {
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState(0);
  const [copied, setCopied] = useState(false);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const userActivities = mockActivities.filter(activity => 
    activity.studentId === user?.id && activity.status === 'approved'
  );

  const shareableUrl = `https://sap-portal.demo.com/portfolio/demo123`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareableUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    // In a real app, this would generate and download a PDF
    const link = document.createElement('a');
    link.href = '/api/portfolio/download?template=' + selectedTemplate;
    link.download = `${user?.name?.replace(' ', '_')}_Portfolio.pdf`;
    link.click();
  };

  const categorizeActivities = () => {
    const categories = {
      education: userActivities.filter(a => a.category === 'MOOC'),
      internships: userActivities.filter(a => a.category === 'Internship'),
      leadership: userActivities.filter(a => a.category === 'Leadership'),
      research: userActivities.filter(a => a.category === 'Research'),
      competitions: userActivities.filter(a => a.category === 'Competition'),
      others: userActivities.filter(a => !['MOOC', 'Internship', 'Leadership', 'Research', 'Competition'].includes(a.category))
    };
    return categories;
  };

  const activities = categorizeActivities();

  const PortfolioPreview = () => (
    <div className="bg-white max-w-4xl mx-auto p-8 shadow-lg" id="portfolio-preview">
      {/* Header */}
      <div className="border-b-2 border-blue-600 pb-6 mb-8">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">{user?.name}</h1>
            <p className="text-xl text-blue-600 mb-4">{user?.degree} Student • {user?.department}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Mail className="h-4 w-4" />
                {user?.email}
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {user?.department} Department
              </div>
            </div>
          </div>
          <div className="text-right">
            <img
              src={user?.avatar}
              alt={user?.name}
              className="w-24 h-24 rounded-lg object-cover mb-4"
            />
            <div className="bg-gray-100 p-2 rounded">
              <QrCode className="h-16 w-16 text-gray-600 mx-auto" />
              <p className="text-xs text-gray-500 mt-1 text-center">Portfolio QR</p>
            </div>
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
          <BookOpen className="h-6 w-6 mr-2 text-blue-600" />
          Academic Information
        </h2>
        <div className="bg-gray-50 p-4 rounded-lg">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="font-semibold text-gray-700">Roll Number</p>
              <p className="text-gray-900">{user?.rollNo}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Current Year</p>
              <p className="text-gray-900">{user?.year}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Department</p>
              <p className="text-gray-900">{user?.department}</p>
            </div>
            <div>
              <p className="font-semibold text-gray-700">Degree Program</p>
              <p className="text-gray-900">{user?.degree}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications & MOOCs */}
      {activities.education.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Award className="h-6 w-6 mr-2 text-blue-600" />
            Certifications & Online Courses
          </h2>
          <div className="space-y-4">
            {activities.education.map((activity) => (
              <div key={activity.id} className="border-l-4 border-blue-600 pl-4">
                <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                <p className="text-blue-600">{activity.provider}</p>
                <p className="text-sm text-gray-600">{new Date(activity.date).toLocaleDateString()}</p>
                <p className="text-sm text-gray-700 mt-1">{activity.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Internships */}
      {activities.internships.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Briefcase className="h-6 w-6 mr-2 text-blue-600" />
            Professional Experience
          </h2>
          <div className="space-y-4">
            {activities.internships.map((activity) => (
              <div key={activity.id} className="border-l-4 border-green-600 pl-4">
                <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                <p className="text-green-600">{activity.provider}</p>
                <p className="text-sm text-gray-600">
                  {new Date(activity.date).toLocaleDateString()}
                  {activity.endDate && ` - ${new Date(activity.endDate).toLocaleDateString()}`}
                </p>
                <p className="text-sm text-gray-700 mt-1">{activity.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Leadership */}
      {activities.leadership.length > 0 && (
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
            <Users className="h-6 w-6 mr-2 text-blue-600" />
            Leadership & Extracurricular Activities
          </h2>
          <div className="space-y-4">
            {activities.leadership.map((activity) => (
              <div key={activity.id} className="border-l-4 border-purple-600 pl-4">
                <h3 className="font-semibold text-gray-900">{activity.title}</h3>
                <p className="text-purple-600">{activity.provider}</p>
                <p className="text-sm text-gray-600">
                  {new Date(activity.date).toLocaleDateString()}
                  {activity.endDate && ` - ${new Date(activity.endDate).toLocaleDateString()}`}
                </p>
                <p className="text-sm text-gray-700 mt-1">{activity.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Footer */}
      <div className="border-t pt-6 mt-8 text-center text-sm text-gray-500">
        <p>Generated from Student Achievement Portal • {new Date().toLocaleDateString()}</p>
        <p className="mt-1">Verify at: {shareableUrl}</p>
      </div>
    </div>
  );

  return (
    <ProtectedRoute allowedRoles={['student']}>
      <Layout>
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Portfolio Generator</h1>
              <p className="text-gray-600">Create and share your professional portfolio</p>
            </div>
            <div className="flex space-x-3">
              <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Portfolio Preview</DialogTitle>
                  </DialogHeader>
                  <PortfolioPreview />
                </DialogContent>
              </Dialog>
              
              <Button onClick={handleDownload} className="bg-blue-600 hover:bg-blue-700">
                <Download className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </div>

          <Tabs defaultValue="templates" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="templates">Templates</TabsTrigger>
              <TabsTrigger value="preview">Live Preview</TabsTrigger>
              <TabsTrigger value="share">Share & Export</TabsTrigger>
            </TabsList>

            <TabsContent value="templates" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Choose a Template</CardTitle>
                  <CardDescription>Select a template that best represents your professional profile</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {portfolioTemplates.map((template, index) => (
                      <div
                        key={template.id}
                        className={`border-2 rounded-lg cursor-pointer transition-all hover:shadow-lg ${
                          selectedTemplate === index ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                        }`}
                        onClick={() => setSelectedTemplate(index)}
                      >
                        <div className="p-4">
                          <img
                            src={template.thumbnail}
                            alt={template.name}
                            className="w-full h-48 object-cover rounded-lg mb-4"
                          />
                          <div className="flex items-center justify-between mb-2">
                            <h3 className="font-semibold text-gray-900">{template.name}</h3>
                            <Badge variant="secondary">{template.category}</Badge>
                          </div>
                          <p className="text-sm text-gray-600">{template.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="preview" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Live Portfolio Preview</CardTitle>
                  <CardDescription>
                    This is how your portfolio will look with the selected template
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-gray-100 p-8 rounded-lg">
                    <PortfolioPreview />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="share" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shareable Link</CardTitle>
                    <CardDescription>Share your portfolio with employers and peers</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 p-3 bg-gray-100 rounded-lg font-mono text-sm">
                        {shareableUrl}
                      </div>
                      <Button onClick={handleCopy} variant="outline" size="sm">
                        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                      </Button>
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button variant="outline" className="flex-1">
                        <Share2 className="h-4 w-4 mr-2" />
                        Share via Email
                      </Button>
                      <Button variant="outline" className="flex-1">
                        <Globe className="h-4 w-4 mr-2" />
                        LinkedIn
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Export Options</CardTitle>
                    <CardDescription>Download your portfolio in different formats</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 gap-3">
                      <Button onClick={handleDownload} variant="outline" className="justify-start">
                        <FileText className="h-4 w-4 mr-2" />
                        Download as PDF
                      </Button>
                      
                      <Button variant="outline" className="justify-start">
                        <Download className="h-4 w-4 mr-2" />
                        Export as Word Document
                      </Button>
                      
                      <Button variant="outline" className="justify-start">
                        <QrCode className="h-4 w-4 mr-2" />
                        Generate QR Code
                      </Button>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h4 className="font-medium text-sm text-gray-900 mb-2">Portfolio Statistics</h4>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Total Activities</p>
                          <p className="font-semibold">{userActivities.length}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Credits Earned</p>
                          <p className="font-semibold">
                            {userActivities.reduce((sum, activity) => sum + activity.credits, 0)}
                          </p>
                        </div>
                        <div>
                          <p className="text-gray-600">Last Updated</p>
                          <p className="font-semibold">{new Date().toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Portfolio Score</p>
                          <p className="font-semibold">A+</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </Layout>
    </ProtectedRoute>
  );
}