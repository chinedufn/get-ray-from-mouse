get-ray-from-mouse [![npm version](https://badge.fury.io/js/get-ray-from-mouse.svg)](http://badge.fury.io/js/get-ray-from-mouse) [![Build Status](https://travis-ci.org/chinedufn/get-ray-from-mouse.svg?branch=master)](https://travis-ci.org/chinedufn/get-ray-from-mouse)
===============

> Get the normalized ray that your mouse is projecting into your scene

## Background / Initial Motivation

I've had this code sitting in a project for over a year but wanted to use it in a tutorial that I'm working on so pulled it out.

## To Install

```
$ npm install --save get-ray-from-mouse
```

## Usage

```js
// Create a view matrix that is looking straight down
// from above
var camera = mat4.create()
mat4.translate(camera, camera, [0, 0, -10])
mat4.rotateX(camera, camera, -Math.PI / 2)

var viewMatrix = []
mat4.invert(viewMatrix, camera)

var opts = {
  view: viewMatrix,
  perspective: mat4.perspective([], Math.PI / 3, 1, 0.1, 100),
  width: 100,
  height: 100,
  x: 50,
  y: 50
}

var ray = []
getRay(ray, opts)
console.log(ray)
// [0, -1, 0]
```

## API

### `getRay(normalizedWorldSpaceRay, options)` -> `normalizedWorldSpaceRay`

#### normalizedWorldSpaceRay

Type: `Array[3]

You provide an array and `get-ray-from-mouse` will set the `[0], [1], [2]` elements of your array to your
normalized world space ray that your mouse casts.

#### options

```js
var options = {
  view: viewMatrix,
  perspective: mat4.perspective([], Math.PI / 3, 1, 0.1, 100),
  width: 100,
  height: 100,
  x: 50,
  y: 50
}
```

##### options.view

Type: `Array[16]`

Your view matrix

##### options.perspective

Type: `Array[16]`

Your perspective matrix

##### options.width

Type: `Number`

The width of your canvas

##### options.height

Type: `Number`

The height of your canvas

##### options.x

Type: `Number`

The x position of your mouse in your canvas. Available through `offsetX` of your mouse events

##### options.y

Type: `Array[16]`

The y position of your mouse in your canvas. Available through `offsetY` of your mouse events

The top of your canvas is `y = 0`, the bottom is `y = height`

## TODO:

- [ ] benchmark

## References

- [Mouse Picking with Ray Casting](http://antongerdelan.net/opengl/raycasting.html)

## License

MIT
