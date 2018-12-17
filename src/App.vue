<template>
  <div id="app">
    <canvas id="world" :width=screenSize.width :height=screenSize.height></canvas>
    <p>hello</p>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld'
import Lane from '@/js/Lane'

export default {
  name: 'App',
  data () {
    return {
      posY: 0,
      laneList: [],
      column: 12
    }
  },
  computed: {
    screenSize: function () {
      return window.screen
    },
    context: function () {
      const canvas = document.getElementById('world')
      const context = canvas.getContext('2d')
      return context
    }
  },
  components: {
    HelloWorld
  },
  mounted () {
    this.posY = 0
    const lineSpace = 5
    const fontSize = Math.floor((this.screenSize.width - this.column * lineSpace) / this.column)

    // NOTE: 各レーン情報を作成する
    for (let i = 0; i < this.column; i++) {
      const x = (fontSize + lineSpace) * i
      const lane = new Lane()
      lane.position.x = x
      lane.position.y = 0
      lane.speed = Math.random() * 1 + 0.1
      lane.text = 'OpenProcessing' + i
      this.laneList.push(lane)
    }

    this.loopAnimation()
  },
  methods: {
    loopAnimation: function () {
      this.clearCanvas()

      for (let i = 0; i < this.column; i++) {
        const lane = this.laneList[i]
        this.drawLane(lane)
        lane.position.y -= lane.speed
        const lineHeight = this.context.measureText('あ').width

        if (lane.position.y + lineHeight * lane.text.length < 0) {
          lane.position.y = this.screenSize.height
        }
      }

      requestAnimationFrame(this.loopAnimation)
    },
    clearCanvas: function () {
      const width = this.screenSize.width
      const height = this.screenSize.height
      this.context.clearRect(0, 0, width, height)
    },
    drawLane: function (lane) {
      const width = this.screenSize.width
      const lineSpace = 5
      const fontSize = Math.floor((width - this.column * lineSpace) / this.column)
      this.context.font = `${fontSize}px メイリオ`
      this.context.fillStyle = 'rgb(255, 255, 255)'
      const text = lane.text
      const x = lane.position.x
      const y = lane.position.y
      const textList = text.split('\n')
      const lineHeight = this.context.measureText('あ').width
      const self = this
      textList.forEach(function (elm, i) {
        Array.prototype.forEach.call(elm, function (ch, j) {
          self.context.fillText(ch, x - lineHeight * i, y + lineHeight * j)
        })
      })
    },
    drawClickableWord: function () {

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
