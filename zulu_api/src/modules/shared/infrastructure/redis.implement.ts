import RedisRepository from "../domain/redis.repository";
import {RedisClientType, createClient} from 'redis';

export default class RedisRepositoryImpl implements RedisRepository {
  private client: RedisClientType;
  constructor() {
    this.client = createClient({
      url: process.env.REDIS_URL,
    });
    this.client.connect();
  }

  GetCached(key: string) {
    return this.client.get(key);
  }
  SetCached(key: string, data: string) {
    return this.client.set(key, data);
  }
}