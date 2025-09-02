import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, FileCheck, Search, Filter, Calendar, User } from 'lucide-react';

export default function ApprovalsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const { toast } = useToast();

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

  const departments = [
    'Operations',
    'Engineering & Maintenance', 
    'Finance & Procurement',
    'Human Resources',
    'Safety & Regulatory'
  ];

  // Filter documents based on search and department
  const filteredDocuments = approvedDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         doc.approver.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || doc.department === selectedDepartment;
    
    return matchesSearch && matchesDepartment;
  });

  const hasActiveFilters = selectedDepartment !== 'all' || searchTerm;

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedDepartment('all');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
            Approved Documents
          </h1>
          <p className="text-muted-foreground">View all approved documents across departments</p>
        </div>
        <div className="flex items-center gap-2">
          <FileCheck className="h-5 w-5 text-status-approved" />
          <span className="font-bold text-status-approved">{filteredDocuments.length} Documents Approved</span>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="space-y-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by document title or approver..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button 
            variant="outline" 
            className="flex items-center gap-2 shrink-0"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter className="w-4 h-4" />
            Filter by Department
            {hasActiveFilters && <Badge variant="secondary" className="ml-1 px-1 text-xs">!</Badge>}
          </Button>
        </div>

        {/* Department Filter */}
        {showFilters && (
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-4 items-end">
                <div className="space-y-2 flex-1">
                  <label className="text-sm font-bold">Filter by Department</label>
                  <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                    <SelectTrigger>
                      <SelectValue placeholder="All Departments" />
                    </SelectTrigger>
                    <SelectContent className="bg-background border border-border">
                      <SelectItem value="all">All Departments</SelectItem>
                      {departments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {hasActiveFilters && (
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear Filters
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Approved Documents List */}
      <div className="space-y-4">
        {filteredDocuments.map((doc) => (
          <Card key={doc.id} className="card-premium">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-status-approved mt-1 flex-shrink-0" />
                    <div className="space-y-2">
                      <h3 className="font-bold text-lg">{doc.title}</h3>
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
                        <p className="flex items-center gap-1">
                          <User className="w-3 h-3" />
                          Approved by: <span className="font-bold">{doc.approver}</span>
                        </p>
                        <p className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          Date: <span className="font-bold">{new Date(doc.approvedDate).toLocaleDateString()}</span>
                        </p>
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

      {/* No Results Message */}
      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileCheck className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="font-bold text-muted-foreground">No approved documents found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}

      {/* Summary Card */}
      <Card className="card-premium">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-bold">
            <CheckCircle className="h-5 w-5 text-status-approved" />
            Approval Summary
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-status-approved/10 rounded-xl">
              <div className="text-2xl font-bold text-status-approved">{approvedDocuments.length}</div>
              <p className="text-sm font-bold text-muted-foreground">Total Approved</p>
            </div>
            <div className="text-center p-4 bg-operations/10 rounded-xl">
              <div className="text-2xl font-bold text-operations">5</div>
              <p className="text-sm font-bold text-muted-foreground">Departments</p>
            </div>
            <div className="text-center p-4 bg-primary/10 rounded-xl">
              <div className="text-2xl font-bold text-primary">100%</div>
              <p className="text-sm font-bold text-muted-foreground">Compliance Rate</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}