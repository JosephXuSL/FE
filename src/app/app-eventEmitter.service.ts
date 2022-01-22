import { EventEmitter, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class AppEventEmitterService {
    public showWelcomeNameEmitter;
    constructor() {
        this.showWelcomeNameEmitter = new EventEmitter();
     }
}
