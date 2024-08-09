import ICache from "./ICache";

export default interface ICacheManager {
  caches: ICache<unknown, unknown>[];

  add(cache: ICache<unknown, unknown>): void;
  get<K, V>(key: K): V | undefined;
  remove(cache: ICache<unknown, unknown>): void;
  clear(): void;
}