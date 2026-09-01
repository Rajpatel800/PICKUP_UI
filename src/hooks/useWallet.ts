import { useState, useCallback, useEffect } from 'react';
import { WalletService } from '../services/wallet/WalletService';
import type { WalletBalance, Transaction } from '../types/wallet';

export function useWallet() {
  const [balance, setBalance] = useState<WalletBalance | null>(null);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchWallet = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [bal, txns] = await Promise.all([
        WalletService.getInstance().getBalance(),
        WalletService.getInstance().getTransactions(),
      ]);
      setBalance(bal);
      setTransactions(txns);
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : 'Unknown error') || 'Failed to fetch wallet data');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWallet();
  }, [fetchWallet]);

  const recharge = useCallback(async (amount: number, methodId: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const txn = await WalletService.getInstance().recharge(amount, methodId);
      // Re-fetch balance and txns
      await fetchWallet();
      return txn;
    } catch (err: unknown) {
      setError((err instanceof Error ? err.message : 'Unknown error') || 'Recharge failed');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, [fetchWallet]);

  return { balance, transactions, isLoading, error, fetchWallet, recharge };
}
