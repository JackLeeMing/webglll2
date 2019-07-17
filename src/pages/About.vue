<template>
  <div class="about" ref="pfg" style="background:#666">
    <canvas ref="my-canvas" width="400" height="400" style="background:#f00">
      please
    </canvas>
  </div>
</template>

<script>
const VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
  'attribute float a_y;\n' +
  'void main() {\n' +
  '  gl_Position = a_Position;\n' + // vec4(-0.50, 0.0, -1.0, 10.0) Set the vertex coordinates of the point
  '  gl_PointSize = 10.0;\n' + // Set the point size
  '}\n'

// Fragment shader program
const FSHADER_SOURCE =
  'precision mediump float;\n' +
  'uniform vec4 u_FragColor ;\n' +
  'void main() {\n' +
  '  gl_FragColor = u_FragColor;\n' + // Set the point color
  '}\n'

import { getWebGLContext, initShaders } from '../assets/js/cuon-utils'
export default {
  data() {
    return {
      g_points: [],
      g_colors: []
    }
  },
  methods: {
    click(e, gl, canvas, a_Position, u_Position) {
      let x = e.clientX
      let y = e.clientY
      let rect = e.target.getBoundingClientRect() // 获取canvas 的左边距 上边距
      // x, y 并不是 从canvas 的左上角开始的
      x = (x - rect.left - canvas.width / 2) / (canvas.width / 2)
      y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2)
      // Store the coordinates to g_points array
      this.g_points.push([x, y])
      if (x >= 0.0 && y >= 0.0) {
        this.g_colors.push([1.0, 0.0, 0.0, 1.0])
      } else if (x < 0.0 && y < 0.0) {
        this.g_colors.push([0.0, 1.0, 0.0, 1.0])
      } else {
        this.g_colors.push([1.0, 1.0, 1.0, 1.0])
      }
      // Clear <canvas>
      gl.clear(gl.COLOR_BUFFER_BIT)
      //
      const len = this.g_points.length
      for (let i = 0; i < len; i += 1) {
        // Pass the position of a point to a_Position variable
        gl.vertexAttrib3f(
          a_Position,
          this.g_points[i][0],
          this.g_points[i][1],
          0.0
        )
        gl.uniform4fv(u_Position, new Float32Array(this.g_colors[i]))
        // Draw
        gl.drawArrays(gl.POINTS, 0, 1)
      }
    }
  },
  mounted() {
    const canvas = this.$refs['my-canvas']
    if (canvas) {
      const gl = getWebGLContext(canvas)
      // canvas.getContext("2d");
      // ctx.fillStyle = "rgba(0,0,255,1.0)"; // 设置填充颜色
      // ctx.fillRect(120, 120, 100, 150); // 使用填充颜色填充矩形 x, y width height
      if (gl) {
        if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
          console.log('Failed to intialize shaders.')
          return
        }
        // 获取attribute 变量的存储位置
        let a_Position = gl.getAttribLocation(gl.program, 'a_Position')
        let u_Position = gl.getUniformLocation(gl.program, 'u_FragColor')
        // let a_y = gl.getAttribLocation(gl.program, 'a_y')
        if (a_Position < 0) {
          console.log('a_y error.')
          return
        }
        // 将顶顶位置传输给 attribute(存储限定符) 变量
        //gl.vertexAttrib3f(a_Position, 0.0, -0.5, 0.0) // 普通传值
        // let position = new Float32Array([0.0, 0.5, 0.0, 1.0]) // 矢量方式传值
        // gl.vertexAttrib4fv(a_Position, position)
        // let position = new Float32Array([0.0, -0.5, 0.0]) // 矢量方式传值
        // gl.vertexAttrib3fv(a_Position, position)
        // gl.vertexAttrib1f(a_y, 0.0)
        canvas.onmousedown = e => {
          this.click(e, gl, canvas, a_Position, u_Position)
        }
        // Specify the color for clearing <canvas>
        gl.clearColor(0.0, 0.0, 0.0, 1.0)
        // Clear <canvas>
        gl.clear(gl.COLOR_BUFFER_BIT)
        // Draw a point
        // gl.drawArrays(gl.POINTS, 0, 4);
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
