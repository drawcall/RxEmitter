![Alt text](https://github.com/a-jie/RxEmitter/blob/master/logo/logo.png?raw=true)

# RxEmitter

Reactive Extensions Library for JavaScript. This is a rewrite of [Reactive-Extensions/RxJS](https://github.com/Reactive-Extensions/RxJS) and is the latest production-ready version of RxJS. This rewrite is meant to have better performance, better modularity, better debuggable call stacks, while staying mostly backwards compatible, with some breaking changes that reduce the API surface.


## Installation and Usage

### ES6 or TypeScript

```sh
npm install rxemitter
```

import and emit a observable:

```js
import { RxEmitter, toRxEmitter } from 'rxemitter';
...
//emit 
Observable.form([1,2,3,4])
          .map(x => x*10)
          .toRxEmitter('ADD_AN_NUMBER')
          .subscribe(x => x);
```

RxOn:

```js
import { RxEmitter } from 'rxemitter';
...
//on
RxEmitter.on('ADD_AN_NUMBER')
		  .subscribe(x=> console.log(`ADD A NEW NUMBER - ${x}`))
```

#### Rxemitter can be used for Angular2+、React、Vue and so on.


## Used in the angular2+

```js
import { RxOn } from 'rxemitter';
//
@RxOn("DATA_LOADED")
items$: Observable<Item[]>;

//in html
<li *ngFor="let item of items $ | async"
```