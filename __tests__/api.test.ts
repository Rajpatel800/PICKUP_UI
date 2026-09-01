jest.mock('../src/config/env', () => ({
  env: { API_BASE_URL: 'https://api.pickup.dev', REQUEST_TIMEOUT_MS: 5000 }
}));
import { ApiClient } from '../src/services/api/ApiClient';
import { ApiError } from '../src/services/api/ApiError';

describe('ApiClient', () => {
  let client: ApiClient;

  beforeEach(() => {
    // @ts-ignore
    ApiClient.instance = undefined; // Reset singleton
    client = ApiClient.getInstance();
    globalThis.fetch = jest.fn();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('performs a successful GET request', async () => {
    const mockResponse = { data: 'success' };
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true, headers: { get: () => 'application/json' },
      json: async () => mockResponse,
    });

    const result = await client.get('/test');
    expect(result).toEqual(mockResponse);
    expect(globalThis.fetch).toHaveBeenCalledWith(
      'https://api.pickup.dev/test',
      expect.objectContaining({ method: 'GET' })
    );
  });

  it('throws ApiError on HTTP failure', async () => {
    (globalThis.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 404, headers: { get: () => 'application/json' },
      json: async () => ({ message: 'Not found' }),
    });

    try { await client.get('/test'); } catch (e: any) { expect(e).toBeInstanceOf(ApiError); expect(e.statusCode).toBe(404); }
  });

  it('retries on network failure if retryable', async () => {
    (globalThis.fetch as jest.Mock)
      .mockRejectedValueOnce(new TypeError('Failed to fetch'))
      .mockResolvedValueOnce({
        ok: true,
        headers: { get: () => 'application/json' },
        json: async () => ({ success: true }),
      });

    const result = await client.get('/retry-test', { retryable: true });
    expect(result).toEqual({ success: true });
    expect(globalThis.fetch).toHaveBeenCalledTimes(2);
  });
});