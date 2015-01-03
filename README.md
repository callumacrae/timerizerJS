# TimerizerJS

A neat little utility for working with relative times in JavaScript.

```js
(2).days.ago(); // Sat Jan 03 2015 18:00:00 GMT+0000 (GMT)
```

Neat.

I stole the name from [Timerizer], which is written in Ruby and based on Ruby
on Rails' [ActiveSupport], which is also what this was based on.


## Installation

Either download the repo and just include `timerizr.js` or
`build/timerizer.min.js` into your project (using AMD, CommonJS or just good
old globals), or install through npm using `npm install timerizer`.


## Usage

There are two main ways to call Timerizer; you can either use the `Timerizer`
constructor function, or you can call one of the time methods directly on
number objects.

```js
Timerizer(4).weeks.ago();

// Or you can call it directly on numbers
(4).weeks.ago();
```

This does involve adding a load of properties to `Number.prototype`—if this
concerns you, there will be a way to disable that behaviour soon.


### Time methods

Time methods are the ones you call on the number, and are specifying the type
of interval of time.

The available time methods are `seconds`, `minutes`, `hours`, `days`, `weeks`,
and `fortnights`. There are also singular versions of all those methods.

```js
(4).seconds.ago();
(10).hours.ago();
(1).fortnight.ago();
```


### Calculation methods

(I don't like this name. Feel free to suggest better.)

The calculation methods are four methods used to get the actual Date object.


#### In the past

We've met one of these already, the `.ago()` method. The following will return
a Date object for four hours ago:

```js
(4).hours.ago();
```

Pretty simple. You can also give it an argument containing a time to generate
the Date from: e.g., you can specify that you want the time two hours before a
given time. That doesn't make much sense as the `ago` method, so there is an
`until` method aliased to `ago`:

```js
(4).hours.until(myTime);
```


#### In the future

The two methods for getting times in the future are called `fromNow` and
`since`, and they behave in pretty much the same way that the methods for
getting times in the past do.

```js
(4).hours.fromNow();
(4).hours.since(myTime);
```


## Developing

If you want to contribute (thank you!), you'll need to clone the repository
and install the dependencies using `npm install`. Run the tests before sending
a pull request (`npm test`), and try to avoid sending a pull request from the
master branch.


## License

This library is released under an MIT license.


[Timerizer]: https://github.com/kylewlacy/timerizer
[ActiveSupport]: http://api.rubyonrails.org/v2.3.8/classes/ActiveSupport/CoreExtensions/Numeric/Time.html

