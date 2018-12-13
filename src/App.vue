<template>
  <div id="app">
    <canvas id="world" :width=screenSize.width :height=screenSize.height></canvas>
    <p>hello</p>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'

export default {
  name: 'App',
  data () {
    return {
      posY: 0
    }
  },
  computed: {
    screenSize: function () {
      return window.screen
    }
  },
  components: {
    HelloWorld
  },
  mounted () {
    this.posY = 0
    this.drawVerticalText()
  },
  methods: {
    drawVerticalText: function () {
      const width = this.screenSize.width
      const height = this.screenSize.height
      var canvas = document.getElementById('world')
      var context = canvas.getContext('2d')
      context.clearRect(0, 0, width, height)

      const lineSpace = 5
      const column = 12
      const fontSize = Math.floor((width - column * lineSpace) / column)
      context.font = `${fontSize}px メイリオ`
      context.fillStyle = 'rgb(255, 255, 255)'
      var text = 'この作品の評価ですが、'
      var x = 150
      var y = this.posY
      var textList = text.split('\n')
      var lineHeight = context.measureText('あ').width
      textList.forEach(function (elm, i) {
        Array.prototype.forEach.call(elm, function (ch, j) {
          context.fillText(ch, x - lineHeight * i, y + lineHeight * j)
        })
      })

      this.posY -= 2

      if (this.posY + lineHeight * text.length < 0) {
        this.posY = height
      }
      requestAnimationFrame(this.drawVerticalText)
    }
  }
}
</script>

<style>
canvas {
    position: absolute;
    margin: auto;
    left: 0px;
    right: 0px;
    top: 0px;
    bottom: 0px;
    box-shadow: 0px 0px 4px 0px #aaa;
    background: rgb(0, 0, 0);
}
</style>
