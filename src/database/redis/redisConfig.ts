import Redis from "ioredis";

const redisClient = new Redis();

async function getRedis(value: string) {
    return await redisClient.get(value);
}

async function setRedis(key: string, value: string, EX: number) {
    return await redisClient.set(key, value, "EX", EX);
}

export { redisClient, getRedis, setRedis };
