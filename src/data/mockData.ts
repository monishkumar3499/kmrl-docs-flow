// Mock data for the KMRL-iDMS system

export interface Document {
  id: string;
  title: string;
  type: 'manual' | 'procedure' | 'policy' | 'report';
  department: string;
  status: 'pending' | 'approved' | 'rejected';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  sections: DocumentSection[];
  currentApprovers: string[];
}

export interface DocumentSection {
  id: string;
  title: string;
  department: string;
  status: 'pending' | 'approved' | 'rejected';
  approver?: string;
  approvedAt?: string;
  comments?: string;
}

export interface DepartmentStats {
  name: string;
  key: string;
  approvalRate: number;
  totalTasks: number;
  approved: number;
  pending: number;
  rejected: number;
  color: string;
}

// Mock departments data
export const departments: DepartmentStats[] = [
  {
    name: 'Operations',
    key: 'operations',
    approvalRate: 100,
    totalTasks: 3,
    approved: 3,
    pending: 0,
    rejected: 0,
    color: 'operations'
  },
  {
    name: 'Engineering',
    key: 'engineering',
    approvalRate: 33.3,
    totalTasks: 3,
    approved: 1,
    pending: 1,
    rejected: 1,
    color: 'engineering'
  },
  {
    name: 'Finance',
    key: 'finance',
    approvalRate: 100,
    totalTasks: 1,
    approved: 1,
    pending: 0,
    rejected: 0,
    color: 'finance'
  },
  {
    name: 'Hr',
    key: 'hr',
    approvalRate: 100,
    totalTasks: 1,
    approved: 1,
    pending: 0,
    rejected: 0,
    color: 'hr'
  },
  {
    name: 'Safety',
    key: 'safety',
    approvalRate: 0,
    totalTasks: 2,
    approved: 0,
    pending: 2,
    rejected: 0,
    color: 'safety'
  }
];

// Mock documents data
export const mockDocuments: Document[] = [
  {
    id: 'doc-1',
    title: 'Employee Handbook Update',
    type: 'manual',
    department: 'Human Resources',
    status: 'pending',
    priority: 'low',
    createdAt: '2024-01-15T10:00:00Z',
    currentApprovers: ['Safety', 'Engineering'],
    sections: [
      {
        id: 'sec-1-1',
        title: 'Safety Protocols',
        department: 'Safety & Regulatory',
        status: 'pending'
      },
      {
        id: 'sec-1-2',
        title: 'Technical Standards',
        department: 'Engineering & Maintenance',
        status: 'pending'
      }
    ]
  },
  {
    id: 'doc-2',
    title: 'Maintenance Procedure Manual',
    type: 'procedure',
    department: 'Engineering & Maintenance',
    status: 'approved',
    priority: 'high',
    createdAt: '2024-01-10T14:30:00Z',
    currentApprovers: [],
    sections: [
      {
        id: 'sec-2-1',
        title: 'Equipment Maintenance',
        department: 'Operations',
        status: 'approved',
        approver: 'Operations Team Lead',
        approvedAt: '2024-01-12T09:15:00Z'
      },
      {
        id: 'sec-2-2',
        title: 'Safety Compliance',
        department: 'Safety & Regulatory',
        status: 'approved',
        approver: 'Safety Officer',
        approvedAt: '2024-01-12T11:30:00Z'
      }
    ]
  },
  {
    id: 'doc-3',
    title: 'Budget Allocation Guidelines',
    type: 'policy',
    department: 'Finance & Procurement',
    status: 'approved',
    priority: 'medium',
    createdAt: '2024-01-08T16:20:00Z',
    currentApprovers: [],
    sections: [
      {
        id: 'sec-3-1',
        title: 'Procurement Rules',
        department: 'Finance & Procurement',
        status: 'approved',
        approver: 'Finance Manager',
        approvedAt: '2024-01-09T10:45:00Z'
      }
    ]
  }
];

// Mock pending approvals
export const pendingApprovals = [
  {
    id: 'approval-1',
    documentId: 'doc-1',
    documentTitle: 'Employee Handbook Update',
    section: 'Safety Protocols',
    department: 'Safety & Regulatory',
    priority: 'low',
    dueDate: '2024-01-20T23:59:59Z'
  },
  {
    id: 'approval-2',
    documentId: 'doc-1',
    documentTitle: 'Employee Handbook Update',
    section: 'Technical Standards',
    department: 'Engineering & Maintenance',
    priority: 'low',
    dueDate: '2024-01-22T23:59:59Z'
  },
  {
    id: 'approval-3',
    documentId: 'doc-4',
    documentTitle: 'Safety Inspection Report',
    section: 'Compliance Review',
    department: 'Safety & Regulatory',
    priority: 'high',
    dueDate: '2024-01-18T23:59:59Z'
  }
];

// Summary statistics
export const overallStats = {
  totalDocuments: 5,
  unroutedDocuments: 1,
  pendingApprovals: 3,
  completedApprovals: 7,
  totalApprovals: 10,
  approved: 6,
  pending: 3,
  rejected: 1
};