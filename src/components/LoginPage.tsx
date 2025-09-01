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
import { FileText, Shield, Users } from 'lucide-react';

const DEPARTMENTS = [
  'Operations',
  'Engineering & Maintenance',
  'Finance & Procurement',
  'Human Resources',
  'Safety & Regulatory'
];

export const LoginPage = () => {
  const [loginType, setLoginType] = useState<'admin' | 'staff'>('admin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [department, setDepartment] = useState('');
  const { login, isLoading } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
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
    <div className="min-h-screen bg-gradient-to-br from-background to-muted flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <div className="p-3 bg-gradient-to-r from-primary to-orange-400 rounded-2xl">
              <FileText className="w-8 h-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">KMRL-iDMS</h1>
              <p className="text-sm text-muted-foreground">Document Management System</p>
            </div>
          </div>
          <p className="text-muted-foreground">
            Kochi Metro Rail Limited<br/>
            Integrated Document Management & Approval System
          </p>
        </div>

        <Card className="card-premium">
          <CardHeader className="pb-4">
            <CardTitle className="text-center">System Login</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={loginType} onValueChange={(value) => setLoginType(value as 'admin' | 'staff')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
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
                <TabsContent value="staff" className="mt-0">
                  <div className="space-y-2 mb-4">
                    <Label htmlFor="department">Department</Label>
                    <Select value={department} onValueChange={setDepartment} required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your department" />
                      </SelectTrigger>
                      <SelectContent>
                        {DEPARTMENTS.map((dept) => (
                          <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </TabsContent>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder={loginType === 'admin' ? 'kmrladmin@gmail.com' : 'Department email'}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    required
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-primary to-orange-400 hover:from-primary-hover hover:to-orange-500 rounded-xl"
                  disabled={isLoading}
                >
                  {isLoading ? 'Signing in...' : 'Sign In'}
                </Button>
              </form>

              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-muted rounded-2xl text-xs">
                <p className="font-medium mb-3">Demo Credentials:</p>
                <div className="space-y-2">
                  <div>
                    <p><strong>Admin:</strong></p>
                    <p className="text-muted-foreground ml-2">kmrladmin@gmail.com / AdminPass@123</p>
                  </div>
                  <div>
                    <p><strong>Operations:</strong></p>
                    <p className="text-muted-foreground ml-2">kmrl.operations@gmail.com / OpsPass@123</p>
                  </div>
                  <div>
                    <p><strong>Engineering & Maintenance:</strong></p>
                    <p className="text-muted-foreground ml-2">kmrl.engineering@gmail.com / EngPass@123</p>
                  </div>
                  <div>
                    <p><strong>Finance & Procurement:</strong></p>
                    <p className="text-muted-foreground ml-2">kmrl.finance@gmail.com / FinPass@123</p>
                  </div>
                  <div>
                    <p><strong>Human Resources:</strong></p>
                    <p className="text-muted-foreground ml-2">kmrl.hr@gmail.com / HRPass@123</p>
                  </div>
                  <div>
                    <p><strong>Safety & Regulatory:</strong></p>
                    <p className="text-muted-foreground ml-2">kmrl.safety@gmail.com / SafePass@123</p>
                  </div>
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};