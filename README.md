# KV Store (Key-Value Store)

An efficient in-memory Least Recently Used (LRU) cache implementation in TypeScript. This library helps manage memory by keeping the most frequently accessed items and evicting the least recently used ones when the cache reaches its capacity.

## Features

- **Efficient**: O(1) operations for insertion, deletion, and access.
- **Configurable**: Set maximum cache size to control memory usage.
- **TypeScript Support**: Written in TypeScript for strong typing and editor support.

## Installation

To install the pacakge, use npm:
```bash
npm install @loom4k/kv
```

## Usage

### Importing the library

```typescript
import CacheManager, { Cache } from "@loom4k/kv";
```

### Creating and registering a new cache

```typescript
const manager = new CacheManager();
// Create a cache of numbers accessed through a string
const cache = new Cache<string, number>(100);
manager.add("my-cache", cache);
```

### Adding items to the cache

```typescript
const cache = manager.get<string, number>("my-cache");
cache.set('key1', 'value1');
cache.set('key2', 'value2');
```

### Retrieving values from the cache

```typescript
const value = cache.get('key1'); // Returns 'value1'
const missingValue = cache.get('key3'); // Returns undefined
```

### Removing items from the cache

```typescript
cache.delete('key1');
```

### Clearing the cache

```typescript
cache.clear();
```

## Example

Here's a complete example demonstrating the use of the LRU cache:

```typescript
import CacheManager, { Cache } from "@loom4k/kv";

const manager = new CacheManager();
const cache = new Cache<string, string>(3);

cache.set('a', '1');
cache.set('b', '2');
cache.set('c', '3');

console.log(cache.get('a')); // Outputs: '1'

cache.set('d', '4'); // Evicts 'b' since the cache size is 3

console.log(cache.get('b')); // Outputs: undefined
console.log(cache.get('c')); // Outputs: '3'
console.log(cache.get('d')); // Outputs: '4'
```