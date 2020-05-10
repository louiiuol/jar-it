/**
 * Interface to receive Token valid fields only
 */
export interface IToken{

  readonly access_token: string;
  readonly token_type: string;
  readonly refresh_token: string;
  readonly expires_in: number;
  readonly scope: string;
  readonly roles: [{ authority: string }];
  readonly userId: number;
  readonly username: string;
  readonly avatar: string;

}

/**
 * Represents current User's token / identifier based
 * on given object matching IToken interface
 */
export class Token {

  public readonly access_token: string;
  public readonly token_type: string;
  public readonly refresh_token: string;
  public readonly expires_in: number;
  public readonly scope: string;
  public readonly roles: [{ authority: string }];
  public readonly userId: number;
  public readonly username: string;
  public readonly avatar: string;

  constructor(obj: IToken) {
    this.access_token = obj.access_token;
    this.token_type = obj.token_type;
    this.refresh_token = obj.refresh_token;
    this.expires_in = obj.expires_in;
    this.scope = obj.scope;
    this.roles = obj.roles;
    this.userId = obj.userId;
    this.username = obj.username;
    this.avatar = obj.avatar;
  }

}
