/**
 * Types and interfaces for Pangolins Cyber - Ngúnji Agent
 */

export interface CompanyProfile {
  companyName: string;
  companySize: '1-5' | '6-20' | '21-50' | '51-200' | '200+';
  province: string;
  industry: string;
  hasItTeam: boolean;
  usesCloudWorkspace: 'google' | 'microsoft' | 'both' | 'none';
  storesPersonalData: boolean; // e.g. clients, employee HR, NIF, bank details
  storesSensitiveData: boolean; // e.g. health, biometric, financial
}

export type ScopeCategory =
  | 'CYBERSECURITY'
  | 'DATA_PROTECTION'
  | 'DPO'
  | 'APD'
  | 'COMPLIANCE'
  | 'PRIVACY'
  | 'INCIDENT_RESPONSE'
  | 'GRC'
  | 'SECURITY_AWARENESS'
  | 'OUT_OF_SCOPE';

export interface ScopeCheckResult {
  inScope: boolean;
  category: ScopeCategory;
  reason: string;
  confidence: number;
}

export interface ChunkMetadata {
  id: string;
  country: string; // 'AO' or 'INT'
  jurisdiction: string; // 'Angola' or 'International'
  authority: string; // 'APD', 'NIST', 'CIS', 'ISO', 'Governo de Angola'
  category: string;
  subcategory: string;
  document_type: 'law' | 'directive' | 'guideline' | 'standard' | 'best_practice';
  effective_date?: string;
  document_title: string;
  article?: string;
  paragraph?: string;
  source_priority: number; // 10 = Official Law/APD, 8 = Official Guideline, 6 = International Standard
  language: 'pt' | 'en';
}

export interface KnowledgeChunk {
  id: string;
  metadata: ChunkMetadata;
  content: string;
  keywords: string[];
}

export interface Citation {
  documentTitle: string;
  article?: string;
  paragraph?: string;
  authority: string;
  excerpt: string;
  chunkId: string;
  sourcePriority: number;
}

export interface CitationValidationResult {
  isValidated: boolean;
  confidenceScore: number;
  unverifiedClaims: string[];
  legalNotes: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'agent' | 'system';
  timestamp: string;
  text: string;
  scopeGuard?: ScopeCheckResult;
  citations?: Citation[];
  searchGroundingUsed?: boolean;
  searchQuery?: string;
  searchStatus?: 'active' | 'quota_fallback' | 'disabled' | 'error';
  searchNotice?: string;
  originalQuery?: string;
  validationResult?: CitationValidationResult;
  isStreaming?: boolean;
  isError?: boolean;
}

export interface AuditQuestion {
  id: string;
  category: 'passwords' | 'mfa' | 'backups' | 'phishing' | 'apd_law' | 'dpo' | 'incidents' | 'devices' | 'access' | 'data_inventory';
  title: string;
  description: string;
  weight: number;
  legalReference?: string;
  frameworkReference?: string;
  options: {
    label: string;
    score: number; // 0 to 10
    recommendation?: string;
  }[];
}

export interface AuditResult {
  overallScore: number; // 0 - 100
  riskLevel: 'Crítico' | 'Alto' | 'Médio' | 'Bom' | 'Excelente';
  categoryScores: Record<string, { score: number; maxScore: number; percentage: number }>;
  completedAt: string;
  companyProfile: CompanyProfile;
  urgentActions: string[];
  mediumActions: string[];
  longTermActions: string[];
  apdComplianceStatus: 'Não Conforme' | 'Parcialmente Conforme' | 'Conforme';
}
