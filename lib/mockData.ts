export const departments = [
  'Computer Science',
  'Information Technology',
  'Electronics',
  'Mechanical',
  'Civil',
  'Chemical',
  'Electrical',
];
export type Student = {
  id: string;
  email: string;
  password: string;
  role: 'student';
  name: string;
  rollNo: string;
  department: string;
  year: string;
  degree: string;
  avatar: string;
  joinDate: string;
};

export type Faculty = {
  id: string;
  email: string;
  password: string;
  role: 'faculty';
  name: string;
  department: string;
  designation: string;
  avatar: string;
};

export type Admin = {
  id: string;
  email: string;
  password: string;
  role: 'admin';
  name: string;
  designation: string;
  avatar: string;
};

export type User = Student | Faculty | Admin;

export const degrees = ['B.Tech', 'M.Tech', 'B.Sc', 'M.Sc', 'MBA', 'PhD'];

export const activityCategories = [
  'MOOC',
  'Internship',
  'Research',
  'Volunteering',
  'Leadership',
  'Competition',
  'Project',
  'Workshop',
];

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'student@demo.com',
    password: 'demo123',
    role: 'student',
    name: 'Alex Johnson',
    rollNo: 'CS21B001',
    department: 'Computer Science',
    year: '3rd Year',
    degree: 'B.Tech',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
    joinDate: '2021-08-01',
  },
  {
    id: '2',
    email: 'faculty@demo.com',
    password: 'demo123',
    role: 'faculty',
    name: 'Dr. Sarah Wilson',
    department: 'Computer Science',
    designation: 'Associate Professor',
    avatar: 'https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    id: '3',
    email: 'admin@demo.com',
    password: 'demo123',
    role: 'admin',
    name: 'John Administrator',
    designation: 'System Administrator',
    avatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export const mockActivities = [
  {
    id: '1',
    studentId: '1',
    title: 'Machine Learning Specialization',
    category: 'MOOC',
    provider: 'Coursera - Stanford University',
    date: '2024-01-15',
    status: 'approved',
    description:
      'Completed comprehensive ML course covering supervised and unsupervised learning',
    certificateUrl: 'https://example.com/cert1.pdf',
    verificationCode: 'ML2024001',
    credits: 4,
    submittedDate: '2024-01-16',
    approvedDate: '2024-01-18',
    approvedBy: 'Dr. Sarah Wilson',
  },
  {
    id: '2',
    studentId: '1',
    title: 'Summer Internship at Google',
    category: 'Internship',
    provider: 'Google Inc.',
    date: '2023-06-01',
    endDate: '2023-08-31',
    status: 'approved',
    description:
      'Software Engineering Intern working on Search Infrastructure team',
    certificateUrl: 'https://example.com/cert2.pdf',
    credits: 8,
    submittedDate: '2023-09-05',
    approvedDate: '2023-09-07',
    approvedBy: 'Dr. Sarah Wilson',
  },
  {
    id: '3',
    studentId: '1',
    title: 'IEEE Student Chapter President',
    category: 'Leadership',
    provider: 'IEEE Student Branch',
    date: '2023-01-01',
    endDate: '2023-12-31',
    status: 'pending',
    description:
      'Leading a team of 50+ students, organizing technical events and workshops',
    certificateUrl: 'https://example.com/cert3.pdf',
    credits: 6,
    submittedDate: '2024-01-10',
  },
  {
    id: '4',
    studentId: '1',
    title: 'AWS Cloud Practitioner',
    category: 'MOOC',
    provider: 'Amazon Web Services',
    date: '2023-12-20',
    status: 'rejected',
    description: 'Cloud computing fundamentals and AWS services overview',
    certificateUrl: 'https://example.com/cert4.pdf',
    credits: 3,
    submittedDate: '2023-12-22',
    rejectedDate: '2023-12-24',
    rejectedBy: 'Dr. Sarah Wilson',
    rejectionReason:
      'Certificate format not acceptable. Please resubmit with official certificate.',
  },
];

export const mockNotifications = [
  {
    id: '1',
    userId: '1',
    title: 'Certificate Approved',
    message:
      'Your Machine Learning Specialization certificate has been approved by Dr. Sarah Wilson',
    type: 'success',
    date: '2024-01-18T10:30:00Z',
    read: false,
  },
  {
    id: '2',
    userId: '1',
    title: 'New Deadline Approaching',
    message: 'Portfolio submission deadline is approaching - Due in 3 days',
    type: 'warning',
    date: '2024-01-16T14:20:00Z',
    read: false,
  },
  {
    id: '3',
    userId: '2',
    title: '5 Pending Approvals',
    message: 'You have 5 certificates pending for approval',
    type: 'info',
    date: '2024-01-15T09:15:00Z',
    read: true,
  },
];

export const mockLeaderboard = [
  {
    rank: 1,
    name: 'Alex Johnson',
    rollNo: 'CS21B001',
    department: 'Computer Science',
    points: 28,
    achievements: 12,
    avatar:
      'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    rank: 2,
    name: 'Emma Davis',
    rollNo: 'IT21B003',
    department: 'Information Technology',
    points: 24,
    achievements: 10,
    avatar:
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
  {
    rank: 3,
    name: 'Michael Chen',
    rollNo: 'EC21B007',
    department: 'Electronics',
    points: 22,
    achievements: 9,
    avatar:
      'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?auto=compress&cs=tinysrgb&w=400',
  },
];

export const mockAnalytics = {
  totalStudents: 1250,
  activeStudents: 980,
  totalCertificates: 3420,
  pendingApprovals: 45,
  monthlyGrowth: 12.5,
  departmentStats: [
    { department: 'Computer Science', students: 380, activities: 1240 },
    { department: 'Information Technology', students: 320, activities: 890 },
    { department: 'Electronics', students: 280, activities: 720 },
    { department: 'Mechanical', students: 270, activities: 570 },
  ],
  activityTrends: [
    { month: 'Aug', activities: 120 },
    { month: 'Sep', activities: 180 },
    { month: 'Oct', activities: 240 },
    { month: 'Nov', activities: 320 },
    { month: 'Dec', activities: 280 },
    { month: 'Jan', activities: 350 },
  ],
};

export const onboardingSlides = [
  {
    id: 1,
    title: 'Track Your Achievements',
    description:
      'Upload and organize all your certificates, internships, and extracurricular activities in one place',
    image:
      'https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: 'Trophy',
  },
  {
    id: 2,
    title: 'Get Verified Instantly',
    description:
      'Faculty members verify your achievements quickly with our streamlined approval process',
    image:
      'https://images.pexels.com/photos/3184339/pexels-photo-3184339.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: 'CheckCircle',
  },
  {
    id: 3,
    title: 'Generate Your Portfolio',
    description:
      'Create professional portfolios and resumes automatically from your verified achievements',
    image:
      'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: 'FileText',
  },
  {
    id: 4,
    title: 'Share & Showcase',
    description:
      'Share your achievements with employers and peers through secure, shareable links',
    image:
      'https://images.pexels.com/photos/3184341/pexels-photo-3184341.jpeg?auto=compress&cs=tinysrgb&w=600',
    icon: 'Share',
  },
];

export const portfolioTemplates = [
  {
    id: 1,
    name: 'Modern Resume',
    description: 'Clean and contemporary design perfect for tech roles',
    thumbnail:
      'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Resume',
  },
  {
    id: 2,
    name: 'Academic CV',
    description:
      'Comprehensive format ideal for research and academic positions',
    thumbnail:
      'https://images.pexels.com/photos/590020/pexels-photo-590020.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'CV',
  },
  {
    id: 3,
    name: 'Creative Portfolio',
    description: 'Showcase your projects and achievements with visual impact',
    thumbnail:
      'https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=400',
    category: 'Portfolio',
  },
];
