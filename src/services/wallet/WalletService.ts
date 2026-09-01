import { ApiClient } from '../api/ApiClient';
import { env } from '../../config/env';
import type { WalletBalance, Transaction } from '../../types/wallet';
import { mockWalletBalance, mockTransactions } from '../../data/mockData';

export interface IWalletService {
  getBalance(): Promise<WalletBalance>;
  getTransactions(): Promise<Transaction[]>;
  recharge(amount: number, methodId: string): Promise<Transaction>;
}

function delay(ms: number): Promise<void> {
  return new Promise<void>((resolve) => setTimeout(resolve, ms));
}

export class MockWalletService implements IWalletService {
  async getBalance(): Promise<WalletBalance> {
    await delay(500);
    return mockWalletBalance;
  }

  async getTransactions(): Promise<Transaction[]> {
    await delay(500);
    return [...mockTransactions];
  }

  async recharge(amount: number, _methodId: string): Promise<Transaction> {
    await delay(1000);
    return {
      id: `TXN-${Date.now()}`,
      date: new Date().toISOString(),
      amount,
      type: 'credit',
      category: 'recharge',
      title: 'Wallet Recharge',
      currency: 'INR',
      time: new Date().toLocaleTimeString(),
    };
  }
}

export class ApiWalletService implements IWalletService {
  private client = ApiClient.getInstance();

  async getBalance(): Promise<WalletBalance> {
    return this.client.get<WalletBalance>('/wallet/balance');
  }

  async getTransactions(): Promise<Transaction[]> {
    return this.client.get<Transaction[]>('/wallet/transactions');
  }

  async recharge(amount: number, methodId: string): Promise<Transaction> {
    return this.client.post<Transaction>('/wallet/recharge', { amount, methodId }, { retryable: false, deduplicate: false });
  }
}

export class WalletService {
  private static instance: IWalletService;

  static getInstance(): IWalletService {
    if (!WalletService.instance) {
      WalletService.instance = env.IS_MOCK_MODE ? new MockWalletService() : new ApiWalletService();
    }
    return WalletService.instance;
  }
}