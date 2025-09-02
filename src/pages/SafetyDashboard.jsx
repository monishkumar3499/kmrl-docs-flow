import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { UploadDialog } from '@/components/UploadDialog';
import { useToast } from '@/hooks/use-toast';
import { FileText, Clock, CheckCircle, AlertCircle, Upload, Check, X } from 'lucide-react';

export default function SafetyDashboard() {
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
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
            Safety & Regulatory Department
          </h1>
          <p className="text-muted-foreground">Manage safety protocols and regulatory compliance</p>
        </div>
        <UploadDialog 
          trigger={
            <Button className="bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 flex items-center gap-2">
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
              <FileText className="h-4 w-4 text-red-600" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">21</div>
            <p className="text-xs font-bold text-muted-foreground">Safety documents</p>
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
            <div className="text-2xl font-bold text-yellow-600">7</div>
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
            <div className="text-2xl font-bold text-green-600">13</div>
            <p className="text-xs font-bold text-muted-foreground">Compliant</p>
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
            <FileText className="h-5 w-5 text-red-600" />
            Safety Compliance Guidelines - Q4 2023
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Quarterly safety compliance guidelines covering passenger safety protocols, 
            emergency procedures, risk assessment frameworks, and regulatory requirements.
          </p>
          
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary" className="bg-red-100 text-red-800 border-red-200">
              Safety
            </Badge>
            <Badge className="bg-yellow-500 text-white">
              Final Review
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