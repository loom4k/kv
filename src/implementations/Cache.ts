import ICache from "../abstractions/ICache";
import ICacheItem from "../payloads/abstractions/ICacheItem";

export default class Cache<K, V> implements ICache<K, V> {
  private readonly cache: Map<K, ICacheItem<V>>;
  private readonly defaultTTL: number;
  private readonly maxSize: number;

  private usageOrder: Map<K, number>;
  private currentSize: number = 0;

  constructor(defaultTTL: number = 60000, maxSize: number = 100) {
    this.cache = new Map<K, ICacheItem<V>>();
    this.defaultTTL = defaultTTL;
    this.maxSize = maxSize;

    this.usageOrder = new Map<K, number>();
  }

  set(key: K, value: V, ttl: number = this.defaultTTL): void {
    const expiresAt = Date.now() + ttl;
    if (this.currentSize >= this.maxSize) {
      this.evict();
    }

    this.cache.set(key, { value, expiresAt });
    this.usageOrder.set(key, Date.now());
    this.currentSize++;
  }

  get(key: K): V | undefined {
    const item = this.cache.get(key);
    if (item && Date.now() < item.expiresAt) {
      this.usageOrder.set(key, Date.now());
      return item.value;
    } else {
      this.cache.delete(key);
      this.usageOrder.delete(key);
      this.currentSize--;
      return undefined;
    }
  }

  delete(key: K): void {
    if (this.cache.delete(key)) {
      this.usageOrder.delete(key);
      this.currentSize--;
    }
  }

  clear(): void {
    this.cache.clear();
    this.usageOrder.clear();
    this.currentSize = 0;
  }

  private evict(): void {
    let oldestKey: K | undefined;
    let oldestTime: number = Infinity;

    for (const [key, time] of this.usageOrder.entries()) {
      if (time < oldestTime) {
        oldestKey = key;
        oldestTime = time;
      }
    }

    if (oldestKey !== undefined) {
      this.delete(oldestKey);
    }
  }
}