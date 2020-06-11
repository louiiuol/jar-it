/**
 * Represents current User's informations
 * when updating existing account.
 */
export class UserUpdate {
  constructor(
    public actualPassword: string,
    public username?: string,
    public email?: string,
    public birthDate?: Date,
    public avatar?: string,
    public password?: string
    ) {}
}
