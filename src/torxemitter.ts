/**
* RxJs + EventBus
*
*
* @langversion TypeScript 2.0
* @tiptext
*
*/

import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Operator } from 'rxjs/Operator';

import { RxEmitter } from './rxemitter';

export function toRxEmitter<T>(this: Observable<T>, eventName: string): Observable<T> {
    return this.lift(new ToRxEmitterOperator(eventName));;
}

class ToRxEmitterOperator<T, R> implements Operator<T, R> {

    constructor(private eventName: string) {
    }

    call(subscriber: Subscriber<R>, source: any): any {
        return source.subscribe(new ToRxEmitterSubscriber(subscriber, this.eventName));
    }
}

class ToRxEmitterSubscriber<T, R> extends Subscriber<T> {

    constructor(destination: Subscriber<R>, private eventName: string) {
        super(destination);
    }

    protected _next(x: T) {
        RxEmitter.emit(this.eventName, x);
        this.destination.next(x);
    }

}


Observable.prototype.toRxEmitter = toRxEmitter;
declare module 'rxjs/Observable' {
    interface Observable<T> {
        toRxEmitter: typeof toRxEmitter;
    }
}
