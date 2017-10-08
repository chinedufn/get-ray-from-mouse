var test = require('tape')
var mat4 = require('gl-mat4')

var getRay = require('../')

test('Raycast', function (t) {
  // Create a view matrix that is looking straight down
  // from above
  var camera = mat4.create()
  mat4.rotateX(camera, camera, -Math.PI / 2)
  mat4.translate(camera, camera, [0, 0, -10])

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
  // Round to zero for our deep equal check
  if (ray[2] < 0.00000002) {
    ray[2] = 0
  }

  t.deepEqual(ray, [0, -1, 0], 'Project ray straight downwards')
  t.end()
})
