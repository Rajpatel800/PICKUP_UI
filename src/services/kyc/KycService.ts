import { ApiClient } from '../api/ApiClient';
import { env } from '../../config/env';
import type { KycDocument } from '../../types/user';

export interface IKycService {
  getDocuments(): Promise<KycDocument[]>;
  uploadDocument(type: KycDocument['type'], fileUri: string): Promise<KycDocument>;
}

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export class MockKycService implements IKycService {
  async getDocuments(): Promise<KycDocument[]> {
    await delay(500);
    return [];
  }

  async uploadDocument(type: KycDocument['type'], _fileUri: string): Promise<KycDocument> {
    await delay(1500);
    return {
      id: `DOC-${Date.now()}`,
      type,
      status: 'pending',
      uploadedAt: new Date().toISOString(),
      label: type
    };
  }
}

/** React Native FormData file part shape (not standard web FormData). */
interface RNFormDataFilePart {
  uri: string;
  type: string;
  name: string;
}

export class ApiKycService implements IKycService {
  private client = ApiClient.getInstance();

  async getDocuments(): Promise<KycDocument[]> {
    return this.client.get<KycDocument[]>('/kyc/documents');
  }

  async uploadDocument(type: KycDocument['type'], fileUri: string): Promise<KycDocument> {
    const formData = new FormData();
    formData.append('type', type);
    // React Native's FormData accepts objects with uri/type/name
    // which differs from the standard web FormData API.
    const filePart: RNFormDataFilePart = {
      uri: fileUri,
      type: 'image/jpeg',
      name: `document-${Date.now()}.jpg`,
    };
    formData.append('file', filePart as unknown as Blob);

    return this.client.post<KycDocument>('/kyc/documents', formData, {
      retryable: false,
    });
  }
}

export class KycService {
  private static instance: IKycService;

  static getInstance(): IKycService {
    if (!KycService.instance) {
      KycService.instance = env.IS_MOCK_MODE ? new MockKycService() : new ApiKycService();
    }
    return KycService.instance;
  }
}