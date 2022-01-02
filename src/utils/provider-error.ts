export class ProviderError extends Error {
  constructor(hookName: string, providerName: string) {
    super(`${hookName} must be used within a ${providerName}`);
    this.name = 'ProviderError';
  }
}
