import Redis from "ioredis";

const redisClient = new Redis({
    port: Number(process.env.PORT_REDIS),
    host: process.env.HOST_REDIS,
    username: process.env.USERNAME_REDIS,
    password: process.env.PASSWORD_REDIS,
});

async function getRedis(value: string) {
    return await redisClient.get(value);
}

async function setRedis(key: string, value: string, EX: number) {
    return await redisClient.set(key, value, "EX", EX);
}

export { getRedis, setRedis };
