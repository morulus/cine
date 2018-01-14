cine
==

![Cine](media/cine.jpg)

Prepare function, which gives back spcified frames, considering frame duration.

```js
const counters = cine(['1', '2', '3', '4'], 250)
setInterval(() => console.log(counters()), 250);
```

It doesn't perform any output or events, but just gives a frame on request. Probably you should use something like setInterval to create animation.

Keep delay empty to disable internally timer.

Animated CLI
--

Usefull with [cli-update](https://github.com/sindresorhus/log-update) and [cli-spinners](https://github.com/sindresorhus/cli-spinners) for creating animated text in terminal output.

```js
const update = require('log-update');
const spinners = require('cli-spinners')
const cine = require('cine')
const animation = cine(
  spinners.dots.frames,
  spinners.dots.interval
)

setInterval(() => update(`Loading ${animation()}`))
```

API
--

`cine(frames : array<any | function>, interval: number, onFinish : function)`

- `frames` Array of any values, but if frame is a function, it will be called, so you can pass another animation as one frame.

- `interval` Ms between frames. If you do not specify value, then frame will change only on request.

- `onFinisj` Frequency end handler. Will be invoked at last frame.

License
--

MIT, 2018, Vladimir Morulus <vladimirmorulus@gmail.com>
