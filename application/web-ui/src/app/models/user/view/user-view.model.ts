/**
 * Represents other User's informations.
 */
export class UserView {

  constructor(
    public readonly id: number,
    public readonly username: string,
    public readonly avatar: string
  ) { }

}
/**
 * Interface for basic User informations
 */
export interface IUserView {

  readonly id: number;
  readonly username: string;
  readonly avatar: string;

}
