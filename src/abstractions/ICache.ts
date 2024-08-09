export default interface ICache<K, V> {
  set(key: K, value: V, tll: number): void;
  get(key: K): V | undefined;
  delete(key: K): void;
  clear(): void;
}