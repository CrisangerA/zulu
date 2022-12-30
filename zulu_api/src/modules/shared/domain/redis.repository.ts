export default interface RedisRepository {
  GetCached(key: string): Promise<string | null>;
  SetCached(key: string, data: string): Promise<string | null>;
}
