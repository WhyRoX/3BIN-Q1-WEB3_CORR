import cors from "cors";
import express, { type Express } from "express";
import helmet from "helmet";
import { pino } from "pino";
import { healthCheckRouter } from "@/api/healthCheck/healthCheckRouter.js";
import userRouter from "@/api/user/userRouter.js";
import errorHandler from "@/common/middleware/errorHandler.js";
import rateLimiter from "@/common/middleware/rateLimiter.js";
import requestLogger from "@/common/middleware/requestLogger.js";
import { env } from "@/common/utils/envConfig.js";
import expenseRouter from "./api/expense/expenseRouter.js";
import transferRouter from "./api/transfer/transferRouter.js";
import transactionRouter from "./api/transaction/transactionRouter.js";
import graphqlMiddleware from "./graphql/middleware.js";
import { ruruHTML } from "ruru/server";

const logger = pino({ name: "server start" });
const app: Express = express();

if (env.isDevelopment) {
  const config = { endpoint: "/graphql" };
  // Serve Ruru HTML
  app.get("/ruru", (req, res) => {
    res.format({
      html: () => res.status(200).send(ruruHTML(config)),
      default: () => res.status(406).send("Not Acceptable"),
    });
  });
}

// Set the application to trust the reverse proxy
app.set("trust proxy", true);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: env.CORS_ORIGIN, credentials: true }));
app.use("/graphql", graphqlMiddleware);
app.use(helmet());
app.use(rateLimiter);

// Request logging
app.use(requestLogger);

// Routes
app.use("/health-check", healthCheckRouter);

app.use("/api/users", userRouter);
app.use("/api/expenses", expenseRouter);
app.use("/api/transfers", transferRouter);
app.use("/api/transactions", transactionRouter);

// Error handlers
app.use(errorHandler());

// Export app and logger so they can be imported by index.ts
export { app, logger };
