export default class ConfictException extends Error{
    constructor(message: string){
        super(message);
        this.name = "ConflictException"
    }
}
