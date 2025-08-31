import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/Dashboard/StatCard';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useAuth } from '@/contexts/AuthContext';
import { 
  CheckCircle, 
  Clock, 
  XCircle, 
  FileText,
  AlertCircle,
  Calendar,
  User
} from 'lucide-react';
import { departments, pendingApprovals } from '@/data/mockData';

export default function DepartmentDashboard() {
  const { user } = useAuth();
  
  // Find department data
  const deptData = departments.find(d => 
    user?.department?.toLowerCase().includes(d.key) || 
    d.name.toLowerCase().includes(user?.department?.toLowerCase() || '')
  ) || departments[0];

  const deptApprovals = pendingApprovals.filter(approval => 
    user?.department && (
      approval.department.toLowerCase().includes(user.department.toLowerCase()) ||
      user.department.toLowerCase().includes(approval.department.toLowerCase())
    )
  );

  const getDepartmentColor = () => {
    return deptData.color as 'operations' | 'engineering' | 'finance' | 'hr' | 'safety';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Department Dashboard</h1>
        <p className="text-muted-foreground flex items-center gap-2">
          <User className="w-4 h-4" />
          {user?.department} • Complete system overview and management
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          title="Approved"
          value={deptData.approved}
          icon={<CheckCircle className="w-5 h-5" />}
          color="finance"
          description="Successfully completed"
        />
        <StatCard
          title="Pending"
          value={deptData.pending}
          icon={<Clock className="w-5 h-5" />}
          color="engineering"
          description="Awaiting your review"
        />
        <StatCard
          title="Rejected"
          value={deptData.rejected}
          icon={<XCircle className="w-5 h-5" />}
          color="safety"
          description="Requires revision"
        />
      </div>

      {/* Department Performance */}
      <Card className="relative overflow-hidden">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className={`w-4 h-4 rounded-full bg-${deptData.color}`} />
            {deptData.name} Performance
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium">Approval Rate</span>
                  <span className="text-sm font-bold">{deptData.approvalRate}%</span>
                </div>
                <Progress 
                  value={deptData.approvalRate} 
                  className="h-3"
                />
              </div>
              
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-status-approved">{deptData.approved}</p>
                  <p className="text-xs text-muted-foreground">Approved</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-status-pending">{deptData.pending}</p>
                  <p className="text-xs text-muted-foreground">Pending</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-status-rejected">{deptData.rejected}</p>
                  <p className="text-xs text-muted-foreground">Rejected</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="text-center p-4 bg-muted/30 rounded-lg">
                <FileText className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                <p className="text-2xl font-bold">{deptData.totalTasks}</p>
                <p className="text-sm text-muted-foreground">Total Tasks Assigned</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Pending Actions */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Approvals */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-status-pending" />
              Pending Approvals
            </CardTitle>
          </CardHeader>
          <CardContent>
            {deptApprovals.length > 0 ? (
              <div className="space-y-4">
                {deptApprovals.map((approval) => (
                  <div key={approval.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium">{approval.section}</h4>
                        <p className="text-sm text-muted-foreground">{approval.documentTitle}</p>
                      </div>
                      <Badge 
                        className={`
                          ${approval.priority === 'high' ? 'bg-status-rejected' : 
                            approval.priority === 'medium' ? 'bg-status-pending' : 'bg-status-low'} 
                          text-white
                        `}
                      >
                        {approval.priority}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      Due: {new Date(approval.dueDate).toLocaleDateString()}
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <Button size="sm" className="bg-status-approved hover:bg-status-approved/90">
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Approve
                      </Button>
                      <Button size="sm" variant="outline" className="border-status-rejected text-status-rejected hover:bg-status-rejected hover:text-white">
                        <XCircle className="w-4 h-4 mr-1" />
                        Reject
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <CheckCircle className="w-12 h-12 mx-auto text-status-approved mb-4" />
                <p className="text-muted-foreground">No pending approvals</p>
                <p className="text-sm text-muted-foreground">All tasks are up to date!</p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                <CheckCircle className="w-5 h-5 mt-0.5 text-status-approved flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Document Approved</p>
                  <p className="text-xs text-muted-foreground">
                    Budget Allocation Guidelines - Section approved
                  </p>
                  <p className="text-xs text-muted-foreground">2 hours ago</p>
                </div>
              </div>
              
              <div className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                <Clock className="w-5 h-5 mt-0.5 text-status-pending flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">New Assignment</p>
                  <p className="text-xs text-muted-foreground">
                    Employee Handbook - Safety section requires review
                  </p>
                  <p className="text-xs text-muted-foreground">4 hours ago</p>
                </div>
              </div>

              <div className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                <FileText className="w-5 h-5 mt-0.5 text-muted-foreground flex-shrink-0" />
                <div className="space-y-1">
                  <p className="text-sm font-medium">Document Updated</p>
                  <p className="text-xs text-muted-foreground">
                    Maintenance Procedures - Version 2.1 available
                  </p>
                  <p className="text-xs text-muted-foreground">1 day ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}