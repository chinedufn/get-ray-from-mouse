var mat4Invert = require('gl-mat4/invert')
var vec4TransformMat4 = require('gl-vec4/transformMat4')
var vec3Normalize = require('gl-vec3/normalize')

module.exports = getRayFromMouse

var x
var y
var z
var clipCoords = []
var eyeCoords = []
var worldCoords = []
var inverseProj = []
var inverseView = []
var normalizedMouseClickRayVec3 = []

/**
 * Go from 2D mouse coordinates to a normalized 3d world space ray
 *
 * @see http://antongerdelan.net/opengl/raycasting.html
 *
 * TODO: Benchnark
 */
function getRayFromMouse (opts) {
  x = (2.0 * opts.x / opts.width) - 1.0
  y = 1.0 - (2.0 * opts.y / opts.height)

  clipCoords[0] = x
  clipCoords[1] = y
  clipCoords[2] = -1.0
  clipCoords[3] = 1.0

  mat4Invert(inverseProj, opts.perspective)
  vec4TransformMat4(eyeCoords, clipCoords, inverseProj)
  eyeCoords[2] = -1.0
  eyeCoords[3] = 0.0

  mat4Invert(inverseView, opts.view)
  vec4TransformMat4(worldCoords, eyeCoords, inverseView)

  x = worldCoords[0]
  y = worldCoords[1]
  z = worldCoords[2]

  normalizedMouseClickRayVec3[0] = x
  normalizedMouseClickRayVec3[1] = y
  normalizedMouseClickRayVec3[2] = z

  vec3Normalize(normalizedMouseClickRayVec3, normalizedMouseClickRayVec3)

  return normalizedMouseClickRayVec3
}
