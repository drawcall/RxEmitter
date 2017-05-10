![logo](https://github.com/a-jie/RxEmitter/blob/master/logo/logo.png?raw=true)

# RxEmitter

### RxEmitter = Rxjs + eventBus.  
RxEmitter combines the characteristics of Rxjs and eventBus.Emit a Stream of similar events, and you can accept it in any where.  
Use RxEmitter to make your project easy to decouple.
It can be used for angular,React,Vue and so on.


## Installation and Usage

### ES6 or TypeScript

##### Installation
```sh
npm install rxemitter
```

##### emit

```js
import { RxEmitter, toRxEmitter } from 'rxemitter';
...

/** emit */
Observable.form([1,2,3,4])
          .map(x => x*10)
          .toRxEmitter('ADD_AN_NUMBER')

or
 
Observable.of('hello world')
          .rxEmit('ADD_NEW_WORD')
          .subscribe(x=>x);
```

##### on

```js
import { RxEmitter } from 'rxemitter';
...

//on
RxEmitter.on('ADD_AN_NUMBER').subscribe(x=> console.log(`ADD A NEW NUMBER - ${x}`))
```

##### Rxemitter can be used for Angular2+、React、Vue and so on.

## API Methods

#### RxEmitter.emit\<T\>(eventName: string, ...rest: T[]): string
> emit a global event , passing a stream

```
RxEmitter.emit("HELLO_WORLD", myObj);
```

#### toRxEmitter\<T\>(this: Observable\<T\>, a: any, b?: any): Subscription
> RxEmitter.emit an Observable sequence.

```
Observable
.fromEvent(document, 'click')
.interval(1000)
.toRxEmitter({ eventName: 'MOUSE_CLICK', timeout: 10 })

or

Observable
.from([1,2,3,4])
.toRxEmitter({ eventName: 'VALUE', map: x=>x+10 })

or

Observable
.from([1,2,3,4])
.toRxEmitter('CHANGE_EVENT')
```

#### rxEmit\<T\>(this: Observable\<T\>, a: any, b?: any): Observable\<T\>
> rxEmit an Observable sequence.

```
Observable
.fromEvent(document, 'click')
.rxEmit({ eventName: 'MOUSE_CLICK', log:true })
.subscribe(x=>x)
```

#### RxOn(a: string | Object, b: boolean | string = false, c: any = null)
> To attaches an event handlers, we can use the @RxOn decorator.

```
@RxOn("HELLO_WORLD")
value:Observable<number>;
```

#### RxSubscribe(a: string | Object, b: boolean | string = false, c: any = null)
> To attaches an event handlers and registration a listener handler, we can use the @RxSubscribe decorator.

```
@RxSubscribe("HELLO_WORLD")
subscribe(value:number){
	console.log(value);
}
```

#### RxEmitter.on\<T\>(eventName: string, target?: any): Observable<T>
> attaches an event handlers

```
RxEmitter.on("HELLO_WORLD")
		.map(x=>x+1)
		.subscribe(x=>console.log(x));
```

#### unsubscribe(target: any, eventName?: string)
> disposal the resources , target is your registration id

```
RxEmitter.unsubscribe(this,"HELLO_WORLD");
```

## Used in the angular

```js
import { RxOn } from 'rxemitter';
//
@RxOn("DATA_LOADED")
items$: Observable<Item[]>;

//in html
<li *ngFor="let item of items $ | async"
```

![logo](https://github.com/a-jie/RxEmitter/blob/master/logo/emitter.png?raw=true)

## Used in the vue-rx
### [vue-rx library](https://github.com/vuejs/vue-rx)

```js
//a component
Vue.component('a', {
  subscriptions: function () {
    return {
      value$: this.$fromDOMEvent('input', 'keyup')
      .pluck('target', 'value')
      .rxEmit('INPUT_KEYUP')
    }
  }
})

//b component
Vue.component('b', {
  subscriptions: function () {
    return {
      value$: RxEmitter.on('INPUT_KEYUP')
    }
  }
})

//html
<div>{{ value$ }}</div>
```

## Building
```
//build es6
npm run es6

//build commonjs
npm run cjs

//clone package
npm run package

//run all
npm run all
```