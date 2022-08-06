import { app } from "./app";
import { logger } from "./errors/Winston";

app.listen(process.env.PORT, () => {
    logger.info(`Server is running on PORT ${process.env.PORT}`);
});
