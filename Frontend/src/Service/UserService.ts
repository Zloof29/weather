import { UserModel } from "../Models/UserModel";
import { store, userAction } from "../Redux/store";
import axios from "axios";
import { appConfig } from "../Utils/AppConfig";
import { CredentialsModel } from "../Models/CredentialsModel";
import { jwtDecode } from "jwt-decode";

class UserService {
  public constructor() {
    const token = localStorage.getItem("token");
    if (!token) return;
    const container = jwtDecode<{ user: UserModel }>(token);
    const dbUser = container.user;
    const action = userAction.initUser(dbUser);
    store.dispatch(action);
  }

  public async register(user: UserModel) {
    const response = await axios.post<string>(appConfig.registerUrl, user);

    const token = response.data;

    localStorage.setItem("token", token);

    const container = jwtDecode<{ user: UserModel }>(token);
    const dbUser = container.user;

    const action = userAction.initUser(dbUser);
    store.dispatch(action);
  }

  public async login(credentials: CredentialsModel) {
    const response = await axios.post<string>(appConfig.loginUrl, credentials);

    const token = response.data;

    localStorage.setItem("token", token);

    const container = jwtDecode<{ user: UserModel }>(token);
    const dbUser = container.user;

    const action = userAction.initUser(dbUser);
    store.dispatch(action);
  }

  public logout() {
    localStorage.removeItem("token");
    const action = userAction.logoutUser();
    store.dispatch(action);
  }
}

export const userService = new UserService();
