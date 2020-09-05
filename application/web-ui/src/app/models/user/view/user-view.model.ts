/**
 * Represents other User's informations.
 */
export class UserView {

    constructor(
        public id: number,
        public username: string,
        public avatar: string
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
