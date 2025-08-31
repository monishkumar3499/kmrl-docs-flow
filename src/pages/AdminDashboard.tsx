import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { StatCard } from '@/components/Dashboard/StatCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { 
  FileText, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  TrendingUp,
  Users,
  BarChart3
} from 'lucide-react';
import { departments, overallStats, pendingApprovals } from '@/data/mockData';
import { cn } from '@/lib/utils';

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <p className="text-muted-foreground">Complete system overview and management</p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Documents"
          value={overallStats.totalDocuments}
          icon={<FileText className="w-5 h-5" />}
          color="primary"
          description="All system documents"
        />
        <StatCard
          title="Unrouted Documents"
          value={overallStats.unroutedDocuments}
          icon={<AlertCircle className="w-5 h-5" />}
          color="hr"
          description="Awaiting routing"
        />
        <StatCard
          title="Pending Approvals"
          value={overallStats.pendingApprovals}
          icon={<Clock className="w-5 h-5" />}
          color="engineering"
          description="Requires action"
        />
        <StatCard
          title="Completed Approvals"
          value={overallStats.completedApprovals}
          icon={<CheckCircle className="w-5 h-5" />}
          color="finance"
          description="Successfully processed"
        />
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="approvals">Approvals</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Department Cards */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {departments.map((dept) => (
              <Card key={dept.key} className="relative overflow-hidden">
                <CardHeader className="pb-3">
                  <div className="flex items-center gap-2">
                    <div className={cn(
                      "w-3 h-3 rounded-full",
                      `bg-${dept.color}`
                    )} />
                    <CardTitle className="text-lg">{dept.name}</CardTitle>
                    <TrendingUp className="w-4 h-4 ml-auto text-muted-foreground" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Approval Rate</span>
                      <span className="font-medium">{dept.approvalRate}%</span>
                    </div>
                    <Progress 
                      value={dept.approvalRate} 
                      className={cn("h-2", `bg-${dept.color}/20`)}
                    />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-status-approved font-medium">{dept.approved}</span>
                    <span>Approved</span>
                    <span className="text-status-pending font-medium">{dept.pending}</span>
                    <span>Pending</span>
                    <span className="text-status-rejected font-medium">{dept.rejected}</span>
                    <span>Rejected</span>
                  </div>
                  
                  <div className="flex items-center gap-2 pt-2 border-t">
                    <Users className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Total Tasks</span>
                    <Badge variant="secondary" className="ml-auto">{dept.totalTasks}</Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Department Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                Department Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-4 gap-8 text-center">
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-primary">{overallStats.totalApprovals}</p>
                  <p className="text-sm text-muted-foreground">Total Approvals</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-status-approved">{overallStats.approved}</p>
                  <p className="text-sm text-muted-foreground">Approved</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-status-pending">{overallStats.pending}</p>
                  <p className="text-sm text-muted-foreground">Pending</p>
                </div>
                <div className="space-y-2">
                  <p className="text-3xl font-bold text-status-rejected">{overallStats.rejected}</p>
                  <p className="text-sm text-muted-foreground">Rejected</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card>
            <CardHeader>
              <CardTitle>Recent Unrouted Documents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium">Employee Handbook Update</p>
                    <p className="text-sm text-muted-foreground">manual</p>
                  </div>
                  <Badge className="bg-status-low text-white">low</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="approvals">
          <Card>
            <CardHeader>
              <CardTitle>Pending Approvals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pendingApprovals.map((approval) => (
                  <div key={approval.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <p className="font-medium">{approval.section}</p>
                      <p className="text-sm text-muted-foreground">Document ID: {approval.documentId.split('-')[1]}</p>
                    </div>
                    <Badge className="bg-status-pending text-white">Pending</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>System Performance</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Overall Efficiency</span>
                    <span>87%</span>
                  </div>
                  <Progress value={87} />
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Average Processing Time</span>
                    <span>2.3 days</span>
                  </div>
                  <Progress value={76} />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div className="flex gap-3">
                    <CheckCircle className="w-4 h-4 mt-0.5 text-status-approved" />
                    <div>
                      <p>Budget Guidelines approved by Finance</p>
                      <p className="text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Clock className="w-4 h-4 mt-0.5 text-status-pending" />
                    <div>
                      <p>Safety Protocol awaiting review</p>
                      <p className="text-muted-foreground">4 hours ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}