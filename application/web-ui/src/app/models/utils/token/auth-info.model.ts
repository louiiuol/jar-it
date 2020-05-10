import { Token } from './token.model';

/**
 * Represents current User's informations
 * from given Token
 */
export class AuthInfo {

  public readonly id: number;
  public readonly username: string;
  public readonly avatar: string;
  public readonly roles: [{ authority: string }];

  constructor(readonly token?: Token) {
    this.id = token.userId;
    this.username = token.username;
    this.avatar = token.avatar;
    this.roles = token.roles;
  }

}
