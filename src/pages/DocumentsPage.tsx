import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FileText, 
  Search, 
  Filter, 
  Calendar,
  User,
  ChevronDown,
  Eye
} from 'lucide-react';
import { mockDocuments } from '@/data/mockData';

export default function DocumentsPage() {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');

  // Filter documents based on user role
  const filteredDocuments = mockDocuments.filter(doc => {
    const matchesSearch = doc.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (user?.role === 'admin') {
      return matchesSearch;
    }
    
    // For staff, show only relevant documents
    return matchesSearch && (
      doc.department === user?.department ||
      doc.currentApprovers.includes(user?.department?.split(' ')[0] || '')
    );
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-status-approved';
      case 'pending': return 'bg-status-pending';
      case 'rejected': return 'bg-status-rejected';
      default: return 'bg-muted';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-status-rejected';
      case 'medium': return 'bg-status-pending';
      case 'low': return 'bg-status-low';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="space-y-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Documents</h1>
          <p className="text-muted-foreground">Manage and track document approvals</p>
        </div>

        {/* Search and Filters */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search documents..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filter
          </Button>
        </div>
      </div>

      {/* Documents List */}
      <div className="space-y-4">
        {filteredDocuments.map((document) => (
          <Card key={document.id} className="hover:shadow-md transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-3">
                    <FileText className="w-5 h-5 text-primary" />
                    {document.title}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <User className="w-3 h-3" />
                      {document.department}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {new Date(document.createdAt).toLocaleDateString()}
                    </span>
                    <span className="capitalize">{document.type}</span>
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
                <h4 className="text-sm font-medium mb-3">Approval Sections</h4>
                <div className="space-y-2">
                  {document.sections.map((section) => (
                    <div
                      key={section.id}
                      className="flex items-center justify-between p-3 bg-muted/30 rounded-lg"
                    >
                      <div className="space-y-1">
                        <p className="text-sm font-medium">{section.title}</p>
                        <p className="text-xs text-muted-foreground">{section.department}</p>
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
                          <Button size="sm" variant="outline">
                            Review
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="text-sm text-muted-foreground">
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
            <p className="text-muted-foreground">No documents found</p>
            <p className="text-sm text-muted-foreground">Try adjusting your search or filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}