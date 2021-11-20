class TokenKeeper {
  private store: Storage;

  private key: string;

  constructor(store: Storage, key: string) {
    this.store = store;
    this.key = key;
  }

  setToken(item: string): void {
    this.store.setItem(this.key, item);
  }

  getToken(): string | null {
    return this.store.getItem(this.key);
  }

  dropToken(): void {
    this.store.removeItem(this.key);
  }
}

export default TokenKeeper;
