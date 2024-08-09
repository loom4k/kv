import ICache from "./abstractions/ICache";
import ICacheManager from "./abstractions/ICacheManager";

export default class CacheManager implements ICacheManager {
  caches: ICache<unknown, unknown>[];

  constructor() {
    this.caches = [];
  }

  add(cache: ICache<unknown, unknown>): void {
    this.caches.push(cache);
  }

  get<K, V>(key: K): V | undefined {
    for (const cache of this.caches) {
      const value = cache.get(key);
      if (value) {
        return value as V;
      }
    }
    return undefined;
  }

  remove(cache: ICache<unknown, unknown>): void {
    const index = this.caches.indexOf(cache);
    if (index !== -1) {
      this.caches.splice(index, 1);
    }
  }

  clear(): void {
    this.caches = [];
  }
}