export class Confess {

    swear: string;
    author: { id: number } = { id: undefined };
    jar: { id: number } = { id: undefined };

    constructor(swear: string, authorId: number, jarId: number) {
        this.swear = swear;
        this.author.id = authorId;
        this.jar.id = jarId;
    }

}
