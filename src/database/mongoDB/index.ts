import mongoose from "mongoose";
import { logger } from "../../errors/Winston";

mongoose.set("debug", function (collectionName, method, query) {
    const result = { collectionName, method, query };
    logger.info(result);
});

const mongoConnect = mongoose
    .connect(`${process.env.URL_MONGODB}`)
    .then(() => {
        logger.info("Connect to database");
    })
    .catch((err) => logger.error(err.message));

export { mongoConnect };
