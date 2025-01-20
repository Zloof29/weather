import { Request, Response, NextFunction } from "express";
import { StatusCode } from "../3-models/enums";
import { appConfig } from "../2-utils/app-config";
import { RouteNotFoundError } from "../3-models/client-error";

class ErrorsMiddleware {
  public catchAll(
    err: any,
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    console.log(err);

    const statusCode = err.status || StatusCode.InternalServerError;

    // for the production
    const isCrash = statusCode >= 500 && statusCode <= 599;
    const message =
      appConfig.isProduction && isCrash
        ? "Some error, please try again."
        : err.message;

    response.status(statusCode).send(message);
  }

  public routeNotFound(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const err = new RouteNotFoundError(request.originalUrl, request.method);

    next(err);
  }
}

export const errorsMiddleware = new ErrorsMiddleware();
