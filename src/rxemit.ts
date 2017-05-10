/**
* RxJs + EventBus
*
*
* @langversion TypeScript 2.0
* @tiptext
*
*/

import { Observable } from 'rxjs/Observable';
import { ToRxEmitterOperator } from './torxemitteroperator';

export function rxEmit<T>(this: Observable<T>, a: any, b?: any): Observable<T> {
    let eventObj: any = typeof a == 'object' ? a : { eventName: a, map: b };
    if (eventObj.name) eventObj.eventName = eventObj.name;
    if (eventObj.event) eventObj.eventName = eventObj.event;

    return this.lift(new ToRxEmitterOperator(eventObj));
}

Observable.prototype.rxEmit = rxEmit;
declare module 'rxjs/Observable' {
    interface Observable<T> {
        rxEmit: typeof rxEmit;
    }
}
