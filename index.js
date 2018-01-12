const throttle = require('lodash/throttle');

function isArray(arrayLike) {
  return typeof arrayLike === 'object' &&
    arrayLike instanceof Array;
}

function isFunction(funcLike) {
  return typeof funcLike === 'function';
}

function compile(frame) {
  return typeof frame === 'function' ?
    frame() : frame;
}

module.exports = function animate(frames, delay = 0, onFinish) {
  if (!(frames && (isArray(frames) || isFunction(frames)))) {
    throw new TypeError('Frames must be an array or a function');
  }
  if (isFunction(frames)) {
    return throttle(() => {
      return frames();
    }, delay)
  }

  let i = -1;
  let initTime;
  return delay
    ? () => {
      const currentTime = new Date().getTime();
      if (initTime === undefined) {
        initTime = currentTime;
      }
      const diff = currentTime - initTime;
      i = Math.round(diff / delay);

      if (i >= frames.length) {
        initTime = currentTime;
        i = 0;
        if (onFinish) {
          onFinish(diff);
        }
      }
      return compile(frames, i);
    } : () => {
      i++;
      if (i >= frames.length) {
        i = 0;
      }
      return compile(frames[i]);
    }
};
