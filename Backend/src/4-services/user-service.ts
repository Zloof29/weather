import { OkPacketParams } from "mysql2";
import { cyber } from "../2-utils/cyber";
import { Role } from "../3-models/enums";
import { UserModel } from "../3-models/user-model";
import { dal } from "../2-utils/dal";
import { CredentialsModel } from "../3-models/credentials-model";
import { UnauthorizedError } from "../3-models/client-error";

class UserService {
  public async register(user: UserModel) {
    //add validation here..

    const sql = "INSERT INTO users VALUES(default, ?, ?, ?, ?, ?)";

    user.roleId = Role.User;

    user.password = cyber.hash(user.password);

    const values = [
      user.firstName,
      user.lastName,
      user.email,
      user.password,
      user.roleId,
    ];

    const info: OkPacketParams = await dal.execute(sql, values);

    user.id = info.insertId;

    const token = cyber.generateNewToken(user);

    return token;
  }

  public async login(credentials: CredentialsModel) {
    // add validation...

    credentials.password = cyber.hash(credentials.password);

    const sql = `SELECT * FROM users WHERE email = ? AND password = ?`;

    const values = [credentials.email, credentials.password];

    const users = await dal.execute(sql, values);

    const user = users[0];

    if (!user) throw new UnauthorizedError("Incorrect email or password");

    const token = cyber.generateNewToken(user);

    return token;
  }
}

export const userService = new UserService();
