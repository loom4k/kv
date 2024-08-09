export default interface ICacheItem<T> {
  value: T;
  expiresAt: number;
}