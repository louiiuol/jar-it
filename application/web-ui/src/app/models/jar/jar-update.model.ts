export class JarUpdate {

    constructor(
        public id: number,
        public title?: string,
        public description?: string,
        public addressee?: number,
        public balance?: number,
        public referenceCost?: number,
        public maxAmount?: number,
        public closingDate?: Date
    ) { }

}
