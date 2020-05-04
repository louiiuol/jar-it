/**
 * Represents current User's informations
 * when creating new account.
 */
export class RegisterInfo {

  constructor(
    public readonly username: string,
    public readonly email: string,
    public readonly password: string,
    public readonly birthDate: Date,
    public readonly avatar?: string
  ) { }

}
