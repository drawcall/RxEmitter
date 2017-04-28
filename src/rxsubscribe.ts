/**
* RxJs + EventBus
*
*
* @langversion TypeScript 2.0
* @tiptext
*
*/


import { Subscription } from 'rxjs/Subscription';
import { RxEmitter } from './rxemitter';

export function RxSubscribe(a: string | Object, b: boolean | string = false, c: any = null) {

    let eventObj: IEventObj = typeof a == 'object' ? a : { eventName: a, unsubscribe: b, target: c };

    return (target: any, name: string, descriptor: PropertyDescriptor) => {

        let oldFun = descriptor.value;
        let eventName: string = eventObj.name || eventObj.event || eventObj.eventName;
        let subscription: Subscription = RxEmitter.on(eventName, eventObj.target).subscribe(oldFun);

        if (eventObj.target) {
            let cache = RxEmitter.get(eventName);
            cache.subscription = subscription;
        }

        if (eventObj.unsubscribe === true ||
            eventObj.unsubscribe == "unsubscribe" ||
            eventObj.unsubscribe == "destroy" ||
            eventObj.unsubscribe == "off" ||
            eventObj.unsubscribe == "remove") {

            let oldNgOnDestroy = target.ngOnDestroy;

            target.ngOnDestroy = function () {
                oldNgOnDestroy && oldNgOnDestroy.call(this);
                subscription.unsubscribe();
            }
        }

    }

}


interface IEventObj {
    eventName?: string;
    name?: string;
    event?: string;
    unsubscribe?: boolean | string;
    target?: any;
}
