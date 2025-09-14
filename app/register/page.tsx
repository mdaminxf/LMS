'use client';

import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { departments, degrees } from '@/lib/mockData';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Upload, Eye, EyeOff, Loader2, User, Mail, Lock, Hash, GraduationCap, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function RegisterPage() {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    rollNo: '',
    department: '',
    year: '',
    degree: '',
    idDocument: null as File | null,
    gdprConsent: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    if (!formData.gdprConsent) {
      setError('Please accept the terms and conditions');
      setLoading(false);
      return;
    }

    const success = await register(formData);
    
    if (success) {
      setSuccess(true);
      setTimeout(() => {
        window.location.href = '/login';
      }, 2000);
    } else {
      setError('Registration failed. Please try again.');
    }
    
    setLoading(false);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({ ...formData, idDocument: file });
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-600 rounded-2xl mb-4">
                <span className="text-2xl">✓</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Registration Successful!</h2>
              <p className="text-gray-600 mb-4">
                Your account has been created successfully. Redirecting to login page...
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-600 rounded-2xl mb-4">
            <span className="text-2xl font-bold text-white">S</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Join Our Platform</h1>
          <p className="text-gray-600">Create your Student Achievement Portal account</p>
        </div>

        <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-center">Create Account</CardTitle>
            <CardDescription className="text-center">
              Fill in your details to get started
            </CardDescription>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Personal Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Create a password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm your password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="pl-10 pr-10"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                      >
                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Academic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Academic Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rollNo">Roll Number</Label>
                    <div className="relative">
                      <Hash className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                      <Input
                        id="rollNo"
                        placeholder="Enter your roll number"
                        value={formData.rollNo}
                        onChange={(e) => setFormData({ ...formData, rollNo: e.target.value })}
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="year">Current Year</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, year: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1st Year">1st Year</SelectItem>
                        <SelectItem value="2nd Year">2nd Year</SelectItem>
                        <SelectItem value="3rd Year">3rd Year</SelectItem>
                        <SelectItem value="4th Year">4th Year</SelectItem>
                        <SelectItem value="Final Year">Final Year</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, department: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        {departments.map(dept => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="degree">Degree Program</Label>
                    <Select onValueChange={(value) => setFormData({ ...formData, degree: value })}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select degree" />
                      </SelectTrigger>
                      <SelectContent>
                        {degrees.map(degree => (
                          <SelectItem key={degree} value={degree}>{degree}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Document Upload */}
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Document Verification</h3>
                
                <div className="space-y-2">
                  <Label htmlFor="idDocument">Student ID Document</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition-colors">
                    <input
                      id="idDocument"
                      type="file"
                      accept=".pdf,.jpg,.jpeg,.png"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label htmlFor="idDocument" className="cursor-pointer">
                      <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                      <p className="text-sm text-gray-600 mb-1">
                        {formData.idDocument ? formData.idDocument.name : 'Click to upload your student ID'}
                      </p>
                      <p className="text-xs text-gray-400">PDF, JPG, JPEG, PNG up to 10MB</p>
                    </label>
                  </div>
                </div>
              </div>

              {/* GDPR Consent */}
              <div className="space-y-4">
                <div className="flex items-start space-x-2">
                  <Checkbox
                    id="gdprConsent"
                    checked={formData.gdprConsent}
                    onCheckedChange={(checked) => setFormData({ ...formData, gdprConsent: checked as boolean })}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <Label
                      htmlFor="gdprConsent"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      I agree to the Terms and Conditions
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      By creating an account, you agree to our{' '}
                      <Link href="/terms" className="text-blue-600 hover:underline">Terms of Service</Link>
                      {' '}and{' '}
                      <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>
                    </p>
                  </div>
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700" 
                disabled={loading}
              >
                {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Create Account
              </Button>

              <div className="text-center text-sm">
                Already have an account?{' '}
                <Link 
                  href="/login" 
                  className="text-blue-600 hover:text-blue-500 hover:underline font-medium"
                >
                  Sign in
                </Link>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}