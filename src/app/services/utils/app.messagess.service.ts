import { Injectable } from '@angular/core';
import { Subject, Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class AppMessagesService {

    constructor() { }


    private _messageError: errorMsg = new errorMsg();
    private _messageSuccess: successMsg = new successMsg();

    messageSuccesEmit: Subject<successMsg> = new Subject();
    messageErrorEmit: Subject<errorMsg> = new Subject();

    get messageError(): errorMsg {
        return this._messageError;
    }

    setMessageError(value: errorMsg) {
        this._messageError = value;
        this.messageErrorEmit.next(value);
    }


    get messageSuccess(): successMsg {
        return this._messageSuccess;
    }

    setMessageSuccess(value: successMsg) {
        this._messageSuccess = value;
        this.messageSuccesEmit.next(value);
    }

}

export class errorMsg {
    error: any;
    titulo: string;
    mensaje: string;
    constructor() {
        this.titulo = '';
        this.mensaje = '';
    }
}
export class successMsg {
    titulo: string;
    mensaje: string;
    constructor() {
        this.titulo = '';
        this.mensaje = '';
    }
}

