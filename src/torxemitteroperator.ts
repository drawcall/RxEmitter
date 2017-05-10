import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { Operator } from 'rxjs/Operator';

import { RxEmitter } from './rxemitter';

export class ToRxEmitterOperator<T, R> implements Operator<T, R> {

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
