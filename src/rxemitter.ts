import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/observer';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/first';

/**
* RxJs + EventBus
*
*
* @langversion TypeScript 2.0
* @tiptext
*
*/
export class RxEmitter {

    static cache: any = {};

    static on<T>(eventName: string, target?: any): Observable<T> {
        this.createChache<T>(eventName);
        if (target !== undefined) {
            this.cache[eventName].id = target;
        }

        return this.cache[eventName].subject;
    }

    static one<T>(eventName: string, target?: any): Observable<T> {
        return this.on(eventName, target).first();
    }

    static emit<T>(eventName: string, ...rest: any[]): string {
        this.createChache<T>(eventName);

        if (rest.length == 1)
            this.cache[eventName].subject.next(rest[0]);
        else
            this.cache[eventName].subject.next(rest);

        return this.cache[eventName].id;
    }

    static has(eventName: string): boolean {
        return !!this.cache[eventName];
    }

    static get(eventName: string): any {
        return this.cache[eventName];
    }

    static getByTarget(target: any, eventName?: string): ICacheObj<any>[] {
        let cache: ICacheObj<any>[] = [];

        for (let key in this.cache) {
            let obj: ICacheObj<any> = this.cache[key];
            if (obj.id == target) {
                if (eventName)
                    (eventName == obj.eventName) && cache.push(obj);
                else
                    cache.push(obj);
            }
        }

        return cache;
    }

    static off(eventName: string): any {
        if (this.cache[eventName]) {
            for (let key in this.cache[eventName]) delete this.cache[eventName][key];
        }

        delete this.cache[eventName];
    }

    static unsubscribe(target: any, eventName?: string) {
        let cache: ICacheObj<any>[] = this.getByTarget(target, eventName);

        for (let i: number = 0; i < cache.length; i++) {
            cache[i].subscription && cache[i].subscription.unsubscribe();
        }
    }

    static offByTarget(target: string) {
        for (let key in this.cache) {
            let obj: ICacheObj<any> = this.cache[key];
            if (obj.id == target) delete this.cache[key];
        }
    }

    static offAll(eventName?: string): void {
        if (!eventName) {
            for (let key in this.cache) delete this.cache[key];
        } else {
            delete (this.cache[eventName]);
        }
    }

    //create cache at emit time
    private static createChache<T>(eventName: string): ICacheObj<T> {
        if (!this.cache[eventName]) {
            this.cache[eventName] = <ICacheObj<T>>{};
            this.cache[eventName].id = guid();
            this.cache[eventName].eventName = eventName;
        }

        if (!this.cache[eventName].subject) {
            this.cache[eventName].subject = new Subject();
        }

        return this.cache[eventName];
    }
}

export interface ICacheObj<T> {
    subject?: Subject<T>;
    eventName?: string;
    id?: any;
    callback?: (...rest: any[]) => any;
    subscription?: Subscription;
}

function guid(): string {
    return 'xxxxxx-xxxx-4xxx-yxxx-xxxxxx'.
        replace(/[xy]/g, c => { var r = Math.random() * 16 | 0, v = c == 'x' ? r : r & 0x3 | 0x8; return v.toString(16); });
}