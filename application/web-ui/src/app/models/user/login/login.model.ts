/**
 * Represents current User's informations
 * when logging existing account.
 */
export class AuthLogin {

  constructor(
    public readonly username: string,
    public readonly password: string
  ) { }

}
