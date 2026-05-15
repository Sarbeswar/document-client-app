export type WorkflowStatus = 'Pending' | 'InProgress' | 'Completed' | 'Failed' | 'Cancelled';
export interface DashboardStats { totalRequests: number; failedRequests: number; inProgressRequests: number; completedRequests: number; }
export interface WorkflowSummary { requestId: string; fileName: string; owner?: string; status: WorkflowStatus; createdAt: string; updatedAt?: string; currentStep?: string; }
export interface DashboardResponse { stats: DashboardStats; recentWorkflows: WorkflowSummary[]; statusDistribution?: { status: WorkflowStatus; count: number }[]; }
export interface WorkflowEvent { name: string; status: WorkflowStatus; timestamp: string; details?: string; kafkaTopic?: string; correlationId?: string; }
export interface WorkflowStatusResponse { requestId: string; status: WorkflowStatus; sagaState: string; currentStep: string; events: WorkflowEvent[]; metadata?: Record<string, unknown>; }
export interface UploadMetadata { documentType: string; businessUnit: string; classification: string; description?: string; retentionCode?: string; }
export interface UploadResponse { requestId: string; status: WorkflowStatus; message: string; correlationId?: string; }
export interface DownloadHistoryItem { documentId: string; fileName: string; requestedBy: string; downloadedAt: string; correlationId?: string; }
