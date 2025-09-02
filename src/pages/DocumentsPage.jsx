import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar,
  User,
  ChevronDown,
  Eye,
  X,
  Check,
  AlertTriangle
} from 'lucide-react';
import { mockDocuments, departments } from '@/data/mockData';

export default function DocumentsPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('all');
  const [dateFrom, setDateFrom] = useState(undefined);
  const [dateTo, setDateTo] = useState(undefined);
  const [showFilters, setShowFilters] = useState(false);

  // Filter documents based on user role and filters
  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDepartment = selectedDepartment === 'all' || doc.department === selectedDepartment;
    
    const docDate = new Date(doc.createdAt);
    const matchesDateFrom = !dateFrom || docDate >= dateFrom;
    const matchesDateTo = !dateTo || docDate <= dateTo;
    
    if (user?.role === 'admin') {
      return matchesSearch && matchesDepartment && matchesDateFrom && matchesDateTo;
    }
    
    // For staff, show only relevant documents
    return matchesSearch && matchesDepartment && matchesDateFrom && matchesDateTo && (
      doc.department === user?.department ||
      doc.currentApprovers.includes(user?.department?.split(' ')[0] || '')
    );
  });

  const clearFilters = () => {
    setSelectedDepartment('all');
    setDateFrom(undefined);
    setDateTo(undefined);
  };

  const hasActiveFilters = selectedDepartment !== 'all' || dateFrom || dateTo;

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-status-approved';
      case 'pending': return 'bg-status-pending';
      case 'rejected': return 'bg-status-rejected';
      default: return 'bg-muted';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-status-rejected';
      case 'medium': return 'bg-status-pending';
      case 'low': return 'bg-status-low';
      default: return 'bg-muted';
    }
  };

  const handleApprove = (sectionId, documentId) => {
    toast({
      title: 'Success',
      description: 'Section approved successfully'
    });
  };

  const handleReject = (sectionId, documentId) => {
    toast({
      title: 'Document Rejected',
      description: 'Section has been rejected',
      variant: 'destructive'
    });
  };

  const handleReview = (sectionId, documentId) => {
    toast({
      title: 'Review Mode',
      description: 'Opening document for review'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Documents</h1>
          <p className="text-muted-foreground">Manage and track document approvals</p>
        </div>

        {/* Search and Filters - Fixed spacing */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search documents..."
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
              Filter
              {hasActiveFilters && <Badge variant="secondary" className="ml-1 px-1 text-xs">!</Badge>}
            </Button>
          </div>

          {/* Filters Panel - Fixed layout */}
          {showFilters && (
            <Card>
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                  {/* Department Filter */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Department</label>
                    <Select value={selectedDepartment} onValueChange={setSelectedDepartment}>
                      <SelectTrigger>
                        <SelectValue placeholder="All Departments" />
                      </SelectTrigger>
                      <SelectContent className="bg-background border border-border">
                        <SelectItem value="all">All Departments</SelectItem>
                        {departments.map((dept) => (
                          <SelectItem key={dept.key} value={dept.name}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Date From */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Date From</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {dateFrom ? format(dateFrom, 'PPP') : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-background border border-border">
                        <CalendarComponent
                          mode="single"
                          selected={dateFrom}
                          onSelect={setDateFrom}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>

                  {/* Date To */}
                  <div className="space-y-2">
                    <label className="text-sm font-bold">Date To</label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline" className="w-full justify-start text-left font-normal">
                          <Calendar className="mr-2 h-4 w-4" />
                          {dateTo ? format(dateTo, 'PPP') : 'Pick a date'}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 bg-background border border-border">
                        <CalendarComponent
                          mode="single"
                          selected={dateTo}
                          onSelect={setDateTo}
                          disabled={(date) => date > new Date() || date < new Date('1900-01-01')}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Clear Filters */}
                {hasActiveFilters && (
                  <div className="mt-4 flex justify-end">
                    <Button variant="ghost" size="sm" onClick={clearFilters} className="flex items-center gap-1">
                      <X className="w-4 h-4" />
                      Clear Filters
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-3 font-bold">
                    <FileText className="w-5 h-5 text-primary" />
                    {document.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1 font-bold">
                      <User className="w-3 h-3" />
                      {document.department}
                    </span>
                    <span className="flex items-center gap-1 font-bold">
                      <Calendar className="w-3 h-3" />
                      {new Date(document.createdAt).toLocaleDateString()}
                    </span>
                    <span className="capitalize font-bold">{document.type}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge className={`${getPriorityColor(document.priority)} text-white`}>
                    {document.priority}
                  </Badge>
                  <Badge className={`${getStatusColor(document.status)} text-white`}>
                    {document.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              {/* Document Sections */}
              <div>
                <h4 className="text-sm font-bold mb-3">Approval Sections</h4>
                <div className="space-y-2">
                  {document.sections.map((section) => (
                    <div
                      key={section.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-bold">{section.title}</p>
                        <p className="text-xs font-bold text-muted-foreground">{section.department}</p>
                        {section.approver && (
                          <p className="text-xs text-muted-foreground">
                            Approved by {section.approver}
                          </p>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className={`${getStatusColor(section.status)} text-white text-xs`}>
                          {section.status}
                        </Badge>
                        {section.status === 'pending' && user?.role === 'staff' && (
                          <div className="flex gap-1">
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="px-2 text-green-600 border-green-600 hover:bg-green-50"
                              onClick={() => handleApprove(section.id, document.id)}
                            >
                              <Check className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              className="px-2 text-red-600 border-red-600 hover:bg-red-50"
                              onClick={() => handleReject(section.id, document.id)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleReview(section.id, document.id)}
                            >
                              Review
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm font-bold text-muted-foreground">
                  {document.currentApprovers.length > 0 && (
                    <span>Awaiting: {document.currentApprovers.join(', ')}</span>
                  )}
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="flex items-center gap-1">
                    <Eye className="w-4 h-4" />
                    View Details
                  </Button>
                  {user?.role === 'admin' && (
                    <Button size="sm" variant="outline">
                      <ChevronDown className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredDocuments.length === 0 && (
        <Card>
          <CardContent className="text-center py-12">
            <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
            <p className="font-bold text-muted-foreground">No documents found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}