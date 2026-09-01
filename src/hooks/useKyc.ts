import { useState, useCallback, useEffect } from 'react';
import { KycService } from '../services/kyc/KycService';
import type { KycDocument } from '../types/user';

export function useKyc() {
  const [documents, setDocuments] = useState<KycDocument[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchDocuments = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const docs = await KycService.getInstance().getDocuments();
      setDocuments(docs);
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : 'Unknown error') || 'Failed to fetch documents');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDocuments();
  }, [fetchDocuments]);

  const uploadDocument = useCallback(async (type: KycDocument['type'], fileUri: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const newDoc = await KycService.getInstance().uploadDocument(type, fileUri);
      await fetchDocuments();
      return newDoc;
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : 'Unknown error') || 'Upload failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchDocuments]);

  return { documents, isLoading, error, fetchDocuments, uploadDocument };
}
