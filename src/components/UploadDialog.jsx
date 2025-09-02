import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/contexts/AuthContext';
import { Upload, FileText, Plus, X } from 'lucide-react';

const DOCUMENT_TYPES = [
  'policy',
  'manual',
  'procedure',
  'guideline',
  'report',
  'form',
  'specification'
];

const PRIORITY_LEVELS = [
  { value: 'low', label: 'Low', color: 'bg-green-500' },
  { value: 'medium', label: 'Medium', color: 'bg-yellow-500' },
  { value: 'high', label: 'High', color: 'bg-red-500' }
];

export const UploadDialog = ({ trigger }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('');
  const [priority, setPriority] = useState('medium');
  const [sections, setSections] = useState([{ title: '', department: '' }]);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleAddSection = () => {
    setSections([...sections, { title: '', department: '' }]);
  };

  const handleRemoveSection = (index) => {
    if (sections.length > 1) {
      setSections(sections.filter((_, i) => i !== index));
    }
  };

  const handleSectionChange = (index, field, value) => {
    const updatedSections = sections.map((section, i) => 
      i === index ? { ...section, [field]: value } : section
    );
    setSections(updatedSections);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!title || !type || sections.some(s => !s.title || !s.department)) {
      toast({
        title: 'Error',
        description: 'Please fill in all required fields',
        variant: 'destructive'
      });
      return;
    }

    // Create new document
    const newDocument = {
      id: `doc-${Date.now()}`,
      title,
      description,
      type,
      priority,
      status: 'pending',
      department: user?.department || 'Admin',
      createdAt: new Date().toISOString(),
      currentApprovers: sections.map(s => s.department),
      sections: sections.map((section, index) => ({
        id: `section-${index}`,
        title: section.title,
        department: section.department,
        status: 'pending',
        approver: null
      }))
    };

    // Store in localStorage (in real app, this would be sent to backend)
    const existingDocs = JSON.parse(localStorage.getItem('kmrl-documents') || '[]');
    const updatedDocs = [...existingDocs, newDocument];
    localStorage.setItem('kmrl-documents', JSON.stringify(updatedDocs));

    toast({
      title: 'Success',
      description: 'Document uploaded successfully'
    });

    // Reset form
    setTitle('');
    setDescription('');
    setType('');
    setPriority('medium');
    setSections([{ title: '', department: '' }]);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Upload className="w-5 h-5" />
            Upload New Document
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Document Title *</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter document title"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Brief description of the document"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Document Type *</Label>
                <Select value={type} onValueChange={setType} required>
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {DOCUMENT_TYPES.map((docType) => (
                      <SelectItem key={docType} value={docType}>
                        {docType.charAt(0).toUpperCase() + docType.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="priority">Priority Level</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    {PRIORITY_LEVELS.map((level) => (
                      <SelectItem key={level.value} value={level.value}>
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${level.color}`} />
                          {level.label}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Approval Sections */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Approval Sections *</Label>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={handleAddSection}
                className="flex items-center gap-1"
              >
                <Plus className="w-4 h-4" />
                Add Section
              </Button>
            </div>

            <div className="space-y-3">
              {sections.map((section, index) => (
                <div key={index} className="flex gap-2 items-end">
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Section title"
                      value={section.title}
                      onChange={(e) => handleSectionChange(index, 'title', e.target.value)}
                      required
                    />
                  </div>
                  <div className="flex-1 space-y-2">
                    <Select
                      value={section.department}
                      onValueChange={(value) => handleSectionChange(index, 'department', value)}
                      required
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Operations">Operations</SelectItem>
                        <SelectItem value="Engineering & Maintenance">Engineering & Maintenance</SelectItem>
                        <SelectItem value="Finance & Procurement">Finance & Procurement</SelectItem>
                        <SelectItem value="Human Resources">Human Resources</SelectItem>
                        <SelectItem value="Safety & Regulatory">Safety & Regulatory</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  {sections.length > 1 && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRemoveSection(index)}
                      className="px-2"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* File Upload Placeholder */}
          <div className="space-y-2">
            <Label>Document File</Label>
            <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
              <FileText className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">File upload functionality would be implemented here</p>
              <p className="text-xs text-muted-foreground mt-2">For demo purposes, document metadata is stored</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" className="bg-gradient-to-r from-primary to-orange-400">
              Upload Document
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};