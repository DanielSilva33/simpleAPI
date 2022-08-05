import winston, { transports } from "winston";
import moment from "moment";

const logger = winston.createLogger({
    defaultMeta: {
        name: "simple-api",
        time: moment().format(),
    },
    level: "info",
    format: winston.format.json(),
    transports: [new winston.transports.Console()],
});

export { logger };
