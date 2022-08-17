import { app } from "./app";
import { logger } from "./errors/Winston";

app.listen(process.env.PORT || 3333, () => {
    logger.info(`Server is running on PORT ${process.env.PORT || 3333}`);
});
