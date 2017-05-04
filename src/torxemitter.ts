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

export function toRxEmitter<T>(this: Observable<T>, a: any, b?: any): Observable<T> {
    let eventObj: any = typeof a == 'object' ? a : { eventName: a, map: b };
    if (eventObj.name) eventObj.eventName = eventObj.name;
    if (eventObj.event) eventObj.eventName = eventObj.event;

    return this.lift(new ToRxEmitterOperator(eventObj));;
}

class ToRxEmitterOperator<T, R> implements Operator<T, R> {

    constructor(private eventObj: any) { }

    call(subscriber: Subscriber<R>, source: any): any {
        return source.subscribe(new ToRxEmitterSubscriber(subscriber, this.eventObj));
    }
}

class ToRxEmitterSubscriber<T, R> extends Subscriber<T> {
    count: number = 0;

    constructor(destination: Subscriber<R>, private eventObj: any) {
        super(destination);
    }

    protected _next(x: T) {
        let result: any;

        if (this.eventObj.map)
            result = this.eventObj.map.call(null, x, this.count++);
        else
            result = x;

        if (this.eventObj.timeout)
            setTimeout(() => RxEmitter.emit(this.eventObj.eventName, result), this.eventObj.timeout);
        else
            RxEmitter.emit(this.eventObj.eventName, result);

        this.destination.next(x);
    }

}


Observable.prototype.toRxEmitter = toRxEmitter;
declare module 'rxjs/Observable' {
    interface Observable<T> {
        toRxEmitter: typeof toRxEmitter;
    }
}
