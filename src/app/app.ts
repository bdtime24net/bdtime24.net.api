import express, { Application } from "express";
import middleware from "./middleware";
import routes from "./routes";
import YAML from "yamljs";
import swaggerUI from "swagger-ui-express";
import { errorHandler } from "./errors";
import { notFoundHandler } from "../errors/notFoundError";
import rateLimit from "express-rate-limit";


const app: Application = express();
const doc = YAML.load(`${process.cwd()}/src/docs/swagger.yaml`);


app.use("/docs", swaggerUI.serve, swaggerUI.setup(doc));

middleware.forEach((mw) => app.use(mw));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); 

app.use("/api", routes);

app.use(rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 1000, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    headers: true, // Add RateLimit headers to the response
}));


app.use(notFoundHandler);
app.use(errorHandler);


export default app;
