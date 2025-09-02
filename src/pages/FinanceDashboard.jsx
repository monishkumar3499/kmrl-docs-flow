import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UploadDialog } from '@/components/UploadDialog';
import { useToast } from '@/hooks/use-toast';
import { FileText, Clock, CheckCircle, AlertCircle, Upload, Check, X } from 'lucide-react';

export default function FinanceDashboard() {
  const { toast } = useToast();

  const handleApprove = () => {
    toast({
      title: 'Success',
      description: 'Document approved successfully'
    });
  };

  const handleReject = () => {
    toast({
      title: 'Document Rejected', 
      description: 'Document has been rejected',
      variant: 'destructive'
    });
  };

  const handleReview = () => {
    toast({
      title: 'Review Mode',
      description: 'Opening document for review'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header with Upload Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-green-600 to-green-800 bg-clip-text text-transparent">
            Finance & Procurement Department
          </h1>
          <p className="text-muted-foreground">Manage financial policies and procurement procedures</p>
        </div>
        <UploadDialog 
          trigger={
            <Button className="bg-gradient-to-r from-green-600 to-green-800 hover:from-green-700 hover:to-green-900 flex items-center gap-2">
              <Upload className="w-4 h-4" />
              Upload Document
            </Button>
          }
        />
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="card-premium">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-muted-foreground">Total Documents</CardTitle>
              <FileText className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">19</div>
            <p className="text-xs font-bold text-muted-foreground">Financial documents</p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-muted-foreground">Pending Approvals</CardTitle>
              <Clock className="h-4 w-4 text-yellow-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">6</div>
            <p className="text-xs font-bold text-muted-foreground">Under review</p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-muted-foreground">Approved</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">12</div>
            <p className="text-xs font-bold text-muted-foreground">Completed</p>
          </CardContent>
        </Card>

        <Card className="card-premium">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-bold text-muted-foreground">Rejected</CardTitle>
              <AlertCircle className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">1</div>
            <p className="text-xs font-bold text-muted-foreground">Needs revision</p>
          </CardContent>
        </Card>
      </div>

      {/* Sample Document */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-bold">
            <FileText className="h-5 w-5 text-green-600" />
            Budget Allocation Framework - FY 2024
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Comprehensive budget allocation guidelines for fiscal year 2024 including departmental 
            allocations, capital expenditure plans, and financial controls.
          </p>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-green-100 text-green-800 border-green-200">
              Finance
            </Badge>
            <Badge className="bg-green-500 text-white">
              Approved
            </Badge>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2 pt-4">
            <Button variant="outline" className="flex-1 sm:flex-none">
              View
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 sm:flex-none text-green-600 border-green-600 hover:bg-green-50"
              onClick={handleApprove}
            >
              <Check className="w-4 h-4 mr-1" />
              Approve
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 sm:flex-none text-red-600 border-red-600 hover:bg-red-50"
              onClick={handleReject}
            >
              <X className="w-4 h-4 mr-1" />
              Reject
            </Button>
            <Button 
              variant="outline" 
              className="flex-1 sm:flex-none"
              onClick={handleReview}
            >
              Review
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}