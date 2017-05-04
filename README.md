![logo](https://github.com/a-jie/RxEmitter/blob/master/logo/logo.png?raw=true)

# RxEmitter

### RxEmitter = Rxjs + eventBus.  
RxEmitter combines the characteristics of Rxjs and eventBus.Emit a Stream of similar events, and you can accept it in any place.  
Use RxEmitter to make your project easy to decouple.
It can be used for angular,React,Vue and so on.


## Installation and Usage

### ES6 or TypeScript

##### install
```sh
npm install rxemitter
```

##### import and emit a observable:

```js
import { RxEmitter, toRxEmitter } from 'rxemitter';
...
//emit 
Observable.form([1,2,3,4])
          .map(x => x*10)
          .toRxEmitter('ADD_AN_NUMBER')
          .subscribe(x => x);
```

##### RxOn:

```js
import { RxEmitter } from 'rxemitter';
...
//on
RxEmitter.on('ADD_AN_NUMBER').subscribe(x=> console.log(`ADD A NEW NUMBER - ${x}`))
```

##### Rxemitter can be used for Angular2+、React、Vue and so on.


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
      .toRxEmitter('INPUT_KEYUP')
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