export default class ClientForbiddenException extends Error {
    constructor(message: string) {
        super(message);
        this.name = 'ClientForbiddenException';
        Object.setPrototypeOf(this, ClientForbiddenException.prototype);
    }
}
