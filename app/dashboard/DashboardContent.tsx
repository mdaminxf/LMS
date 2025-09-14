'use client';

import { useAuth } from '@/lib/auth';
import { mockActivities, mockLeaderboard, mockAnalytics } from '@/lib/mockData';
import ProtectedRoute from '@/components/ProtectedRoute';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Clock, 
  CheckCircle, 
  FileText, 
  Users, 
  TrendingUp, 
  Calendar,
  Star,
  Award,
  Target
} from 'lucide-react';

function StudentDashboard({ user }: { user: any }) {
  const userActivities = mockActivities.filter(activity => activity.studentId === user.id);
  const approvedCount = userActivities.filter(activity => activity.status === 'approved').length;
  const pendingCount = userActivities.filter(activity => activity.status === 'pending').length;
  const totalCredits = userActivities
    .filter(activity => activity.status === 'approved')
    .reduce((sum, activity) => sum + activity.credits, 0);

  const progressPercentage = Math.min((totalCredits / 30) * 100, 100); // Assuming 30 credits target

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Welcome back, {user.name}!</h1>
          <p className="text-gray-600">Track your achievements and build your portfolio</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Trophy className="h-4 w-4 mr-2" />
          Add Achievement
        </Button>
      </div>

      {/* Profile Card */}
      <Card className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <img
              src={user.avatar}
              alt={user.name}
              className="h-20 w-20 rounded-full border-4 border-white/20 object-cover"
            />
            <div className="flex-1">
              <h2 className="text-2xl font-bold">{user.name}</h2>
              <p className="text-blue-100">{user.rollNo} • {user.department}</p>
              <p className="text-blue-100">{user.year} • {user.degree}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">{Math.round(progressPercentage)}%</div>
              <div className="text-sm text-blue-100">Progress</div>
            </div>
          </div>
          
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-2">
              <span>Achievement Progress</span>
              <span>{totalCredits}/30 Credits</span>
            </div>
            <Progress value={progressPercentage} className="bg-white/20" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Achievements</p>
                <p className="text-3xl font-bold text-gray-900">{userActivities.length}</p>
              </div>
              <Trophy className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved</p>
                <p className="text-3xl font-bold text-green-600">{approvedCount}</p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending</p>
                <p className="text-3xl font-bold text-orange-600">{pendingCount}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Credits Earned</p>
                <p className="text-3xl font-bold text-blue-600">{totalCredits}</p>
              </div>
              <Star className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities & Upcoming Deadlines */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activities</CardTitle>
            <CardDescription>Your latest submissions and approvals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userActivities.slice(0, 5).map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'approved' ? 'bg-green-500' :
                      activity.status === 'pending' ? 'bg-orange-500' : 'bg-red-500'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.category}</p>
                    </div>
                  </div>
                  <Badge variant={
                    activity.status === 'approved' ? 'default' :
                    activity.status === 'pending' ? 'secondary' : 'destructive'
                  }>
                    {activity.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
            <CardDescription>Important dates to remember</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-red-50 border border-red-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-red-600" />
                  <div>
                    <p className="font-medium text-sm">Portfolio Submission</p>
                    <p className="text-xs text-gray-500">Final deadline</p>
                  </div>
                </div>
                <Badge variant="destructive">3 days</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-orange-600" />
                  <div>
                    <p className="font-medium text-sm">Internship Report</p>
                    <p className="text-xs text-gray-500">Summer internship</p>
                  </div>
                </div>
                <Badge variant="secondary">1 week</Badge>
              </div>

              <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Calendar className="h-4 w-4 text-blue-600" />
                  <div>
                    <p className="font-medium text-sm">Certificate Verification</p>
                    <p className="text-xs text-gray-500">MOOC certificates</p>
                  </div>
                </div>
                <Badge>2 weeks</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function FacultyDashboard({ user }: { user: any }) {
  const pendingApprovals = mockActivities.filter(activity => activity.status === 'pending').length;
  const totalStudents = 150; // Mock data

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Faculty Dashboard</h1>
          <p className="text-gray-600">Manage student achievements and approvals</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <CheckCircle className="h-4 w-4 mr-2" />
          Review Submissions
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                <p className="text-3xl font-bold text-orange-600">{pendingApprovals}</p>
              </div>
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-blue-600">{totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">This Month</p>
                <p className="text-3xl font-bold text-green-600">24</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Reports</p>
                <p className="text-3xl font-bold text-purple-600">12</p>
              </div>
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions & Leaderboard */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full justify-start">
              <CheckCircle className="h-4 w-4 mr-2" />
              Verify MOOC Certificates ({mockActivities.filter(a => a.category === 'MOOC' && a.status === 'pending').length})
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Trophy className="h-4 w-4 mr-2" />
              Review Internships ({mockActivities.filter(a => a.category === 'Internship' && a.status === 'pending').length})
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <Award className="h-4 w-4 mr-2" />
              Approve Leadership Roles ({mockActivities.filter(a => a.category === 'Leadership' && a.status === 'pending').length})
            </Button>
            <Button variant="outline" className="w-full justify-start">
              <FileText className="h-4 w-4 mr-2" />
              Generate Reports
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Top Performing Students</CardTitle>
            <CardDescription>Leaderboard by achievement points</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockLeaderboard.slice(0, 5).map((student) => (
                <div key={student.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="flex-shrink-0">
                      <span className="inline-flex items-center justify-center h-8 w-8 bg-blue-600 text-white text-sm font-bold rounded-full">
                        {student.rank}
                      </span>
                    </div>
                    <img
                      src={student.avatar}
                      alt={student.name}
                      className="h-8 w-8 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-sm">{student.name}</p>
                      <p className="text-xs text-gray-500">{student.department}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-sm">{student.points}</p>
                    <p className="text-xs text-gray-500">points</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">System overview and management</p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Target className="h-4 w-4 mr-2" />
          System Settings
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-blue-600">{mockAnalytics.totalStudents}</p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {mockAnalytics.activeStudents} active this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Certificates</p>
                <p className="text-3xl font-bold text-green-600">{mockAnalytics.totalCertificates}</p>
              </div>
              <Trophy className="h-8 w-8 text-green-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {mockAnalytics.pendingApprovals} pending approval
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Growth Rate</p>
                <p className="text-3xl font-bold text-purple-600">{mockAnalytics.monthlyGrowth}%</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              vs last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Departments</p>
                <p className="text-3xl font-bold text-orange-600">{mockAnalytics.departmentStats.length}</p>
              </div>
              <FileText className="h-8 w-8 text-orange-600" />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              active departments
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Department Overview & Activity Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Department Overview</CardTitle>
            <CardDescription>Student distribution by department</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockAnalytics.departmentStats.map((dept, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{dept.department}</span>
                    <span className="text-gray-500">{dept.students} students</span>
                  </div>
                  <Progress 
                    value={(dept.students / mockAnalytics.totalStudents) * 100} 
                    className="h-2"
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent System Activity</CardTitle>
            <CardDescription>Latest platform activities</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
                <CheckCircle className="h-4 w-4 text-green-600" />
                <div>
                  <p className="text-sm font-medium">25 certificates approved</p>
                  <p className="text-xs text-gray-500">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
                <Users className="h-4 w-4 text-blue-600" />
                <div>
                  <p className="text-sm font-medium">12 new student registrations</p>
                  <p className="text-xs text-gray-500">4 hours ago</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3 p-3 bg-orange-50 rounded-lg">
                <Trophy className="h-4 w-4 text-orange-600" />
                <div>
                  <p className="text-sm font-medium">8 achievement submissions</p>
                  <p className="text-xs text-gray-500">6 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const { user } = useAuth();

  const renderDashboard = () => {
    switch (user?.role) {
      case 'student':
        return <StudentDashboard user={user} />;
      case 'faculty':
        return <FacultyDashboard user={user} />;
      case 'admin':
        return <AdminDashboard />;
      default:
        return <div>Loading...</div>;
    }
  };

  return (
    <ProtectedRoute>
      <Layout>
        {renderDashboard()}
      </Layout>
    </ProtectedRoute>
  );
}