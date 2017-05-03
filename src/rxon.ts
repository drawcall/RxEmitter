import { RxEmitter } from './rxemitter';
import { Subscription } from 'rxjs/Subscription';

export function RxOn(a: string | Object, b: boolean | string = false, c: any = null) {

    let eventObj: IEventObj = typeof a == 'object' ? a : { eventName: a, unsubscribe: b, target: c };

    return (target: any, name: string) => {
        let eventName: string = eventObj.name || eventObj.event || eventObj.eventName;
        
        Object.defineProperty(target, name, {
            enumerable: true,
            configurable: true,
            writable: true,
            value: RxEmitter.on(eventName, eventObj.target)
        });
    }
}

interface IEventObj {
    eventName?: string;
    name?: string;
    event?: string;
    unsubscribe?: boolean | string;
    target?: any;
}