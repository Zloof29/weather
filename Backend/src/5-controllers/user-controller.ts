import express, { Request, Response, NextFunction } from "express";
import { UserModel } from "../3-models/user-model";
import { userService } from "../4-services/user-service";
import { StatusCode } from "../3-models/enums";
import { CredentialsModel } from "../3-models/credentials-model";

class UserController {
  public readonly router = express.Router();

  public constructor() {
    this.router.post("/register", this.register);
    this.router.post("/login", this.logIn);
  }

  private async register(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const user = new UserModel(request.body);
      const token = await userService.register(user);
      response.status(StatusCode.Created).json(token);
    } catch (error: any) {
      next(error);
    }
  }

  private async logIn(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const credentials = new CredentialsModel(request.body);
      const token = await userService.login(credentials);
      response.json(token);
    } catch (error: any) {
      next(error);
    }
  }
}

export const userController = new UserController();
