import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle, FileCheck } from 'lucide-react';

export default function ApprovalsPage() {
  const approvedDocuments = [
    {
      id: '1',
      title: 'Metro Operations Manual - Version 2.1',
      department: 'Operations',
      approvedDate: '2024-01-15',
      approver: 'John Smith',
      departmentColor: 'operations'
    },
    {
      id: '2',
      title: 'Rolling Stock Maintenance Protocol - Rev 3.2',
      department: 'Engineering & Maintenance',
      approvedDate: '2024-01-14',
      approver: 'Sarah Johnson',
      departmentColor: 'engineering'
    },
    {
      id: '3',
      title: 'Employee Code of Conduct - Updated 2024',
      department: 'Human Resources',
      approvedDate: '2024-01-12',
      approver: 'Mike Chen',
      departmentColor: 'hr'
    },
    {
      id: '4',
      title: 'Safety Compliance Guidelines - Q4 2023',
      department: 'Safety & Regulatory',
      approvedDate: '2024-01-10',
      approver: 'Lisa Brown',
      departmentColor: 'safety'
    },
    {
      id: '5',
      title: 'Budget Allocation Framework - FY 2024',
      department: 'Finance & Procurement',
      approvedDate: '2024-01-08',
      approver: 'David Wilson',
      departmentColor: 'finance'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
            Approved Documents
          </h1>
          <p className="text-muted-foreground">View all approved documents across departments</p>
        </div>
        <div className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-status-approved" />
          <span className="font-semibold text-status-approved">{approvedDocuments.length} Documents Approved</span>
        </div>
      </div>

      {/* Approved Documents List */}
      <div className="space-y-4">
        {approvedDocuments.map((doc) => (
          <Card key={doc.id} className="card-premium">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-status-approved mt-1 flex-shrink-0" />
                    <div className="space-y-2">
                      <h3 className="font-semibold text-lg">{doc.title}</h3>
                      <div className="flex flex-wrap gap-2">
                        <Badge 
                          variant="secondary"
                          className={`bg-${doc.departmentColor}/10 text-${doc.departmentColor} border-${doc.departmentColor}/20`}
                        >
                          {doc.department}
                        </Badge>
                        <Badge variant="outline" className="text-status-approved border-status-approved">
                          Approved
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <p>Approved by: <span className="font-medium">{doc.approver}</span></p>
                        <p>Date: <span className="font-medium">{new Date(doc.approvedDate).toLocaleDateString()}</span></p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2 sm:flex-col sm:w-24">
                  <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                    View
                  </Button>
                  <Button size="sm" className="bg-gradient-to-r from-primary to-orange-400 flex-1 sm:flex-none">
                    Download
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Summary Card */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-status-approved" />
            Approval Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-status-approved/10 rounded-xl">
              <div className="text-2xl font-bold text-status-approved">{approvedDocuments.length}</div>
              <p className="text-sm text-muted-foreground">Total Approved</p>
            </div>
            <div className="text-center p-4 bg-operations/10 rounded-xl">
              <div className="text-2xl font-bold text-operations">5</div>
              <p className="text-sm text-muted-foreground">Departments</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-xl">
              <div className="text-2xl font-bold text-primary">100%</div>
              <p className="text-sm text-muted-foreground">Compliance Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}