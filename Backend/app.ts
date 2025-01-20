import path from "path";
import { fileSaver } from "uploaded-file-saver";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import expressFileUpload from "express-fileupload";
import { securityMiddleware } from "./src/6-middleware/security-middleware";
import { errorsMiddleware } from "./src/6-middleware/errors-middleware";
import { appConfig } from "./src/2-utils/app-config";

fileSaver.config(path.join(__dirname, "1-assets", "images"));

const server = express();

server.use(helmet());

server.use(cors());

server.use(express.json());

server.use(expressFileUpload());

server.use(securityMiddleware.preventXssAttacks);

// here I need to register routes!

server.use("*", errorsMiddleware.routeNotFound);

server.use(errorsMiddleware.catchAll);

if (appConfig.isDevelopment) {
  server.listen(appConfig.port, () =>
    console.log("Listening on http://localhost:" + appConfig.port)
  );
} else {
  console.log("Server is not running in development mode.");
}
