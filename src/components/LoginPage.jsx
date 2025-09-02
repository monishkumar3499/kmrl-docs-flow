import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';
import { Shield, Users, Eye, EyeOff } from 'lucide-react';

const DEPARTMENTS = [
  'Operations',
  'Engineering & Maintenance',
  'Finance & Procurement',
  'Human Resources',
  'Safety & Regulatory'
];

export const LoginPage = () => {
  const [loginType, setLoginType] = useState('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (loginType === 'staff' && !department) {
      toast({
        title: 'Error',
        description: 'Please select a department',
        variant: 'destructive'
      });
      return;
    }

    const success = await login(email, password, loginType === 'staff' ? department : undefined);
    
    if (!success) {
      toast({
        title: 'Login Failed',
        description: 'Invalid credentials. Please try again.',
        variant: 'destructive'
      });
    } else {
      toast({
        title: 'Welcome!',
        description: 'Login successful'
      });
      
      // Navigate to appropriate dashboard
      if (loginType === 'admin') {
        navigate('/admin');
      } else {
        // Navigate to specific department dashboard
        const deptKey = department?.toLowerCase().replace(/\s+/g, '').replace('&', '');
        navigate(`/departments/${deptKey}`);
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Login Form */}
      <div className="w-full lg:w-1/2 bg-background flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Logo and Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-6">
              <img 
                src="/kmrl-logo.png" 
                alt="KMRL Logo" 
                className="w-16 h-16 object-contain"
              />
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Sign in</h1>
          </div>

          <Tabs value={loginType} onValueChange={(value) => setLoginType(value)} className="mb-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="admin" className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Admin
              </TabsTrigger>
              <TabsTrigger value="staff" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Staff
              </TabsTrigger>
            </TabsList>

            <form onSubmit={handleSubmit} className="space-y-4">
              <TabsContent value="staff" className="mt-4">
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Select value={department} onValueChange={setDepartment} required>
                    <SelectTrigger className="bg-background">
                      <SelectValue placeholder="Select your department" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border">
                      {DEPARTMENTS.map((dept) => (
                        <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </TabsContent>

              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={loginType === 'admin' ? 'kmrladmin@gmail.com' : 'Department email'}
                  className="bg-background"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="bg-background pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div className="text-left">
                <a href="#" className="text-sm text-red-600 hover:text-red-700">
                  Forgot password?
                </a>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-red-600 hover:bg-red-700 text-white"
                disabled={isLoading}
              >
                {isLoading ? 'Signing in...' : 'Sign in'}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 p-4 bg-muted rounded-lg text-xs">
              <p className="font-bold mb-3 text-foreground">Demo Credentials:</p>
              <div className="space-y-2">
                <div>
                  <p className="font-bold text-foreground">Admin:</p>
                  <p className="text-muted-foreground ml-2">kmrladmin@gmail.com / AdminPass@123</p>
                </div>
                <div>
                  <p className="font-bold text-foreground">Operations:</p>
                  <p className="text-muted-foreground ml-2">kmrl.operations@gmail.com / OpsPass@123</p>
                </div>
                <div>
                  <p className="font-bold text-foreground">Engineering & Maintenance:</p>
                  <p className="text-muted-foreground ml-2">kmrl.engineering@gmail.com / EngPass@123</p>
                </div>
                <div>
                  <p className="font-bold text-foreground">Finance & Procurement:</p>
                  <p className="text-muted-foreground ml-2">kmrl.finance@gmail.com / FinPass@123</p>
                </div>
                <div>
                  <p className="font-bold text-foreground">Human Resources:</p>
                  <p className="text-muted-foreground ml-2">kmrl.hr@gmail.com / HRPass@123</p>
                </div>
                <div>
                  <p className="font-bold text-foreground">Safety & Regulatory:</p>
                  <p className="text-muted-foreground ml-2">kmrl.safety@gmail.com / SafePass@123</p>
                </div>
              </div>
            </div>
          </Tabs>
        </div>
      </div>

      {/* Right Side - Welcome Banner */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-blue-900 to-blue-800 items-center justify-center p-8">
        <div className="text-center text-white">
          <h2 className="text-4xl font-bold mb-4">
            Welcome to <span className="text-teal-300">KMRL-iDMS</span>
          </h2>
          <p className="text-xl text-blue-100">
            Kochi Metro Rail Limited<br/>
            Integrated Document Management & Approval System
          </p>
        </div>
      </div>
    </div>
  );
};