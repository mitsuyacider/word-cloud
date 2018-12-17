<template>
  <div id="app">
    <canvas id="world" :width=screenSize.width :height=screenSize.height></canvas>
    <p>hello</p>
  </div>
</template>

<script>
import NativeCommunicator from '@/js/NativeCommunicator'
import Lane from '@/js/Lane'

export default {
  name: 'App',
  data () {
    return {
      posY: 0,
      sentenceList: [],
      wordList: [],
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
  mounted () {
    this.posY = 0
    const lineSpace = 5
    const fontSize = Math.floor((this.screenSize.width - this.column * lineSpace) / this.column)

    // NOTE: 各レーン情報を作成する
    for (let i = 0; i < this.column; i++) {
      const x = (fontSize + lineSpace) * i
      const sentence = new Lane()
      sentence.position.x = x
      sentence.position.y = 0
      sentence.fontSize = fontSize
      sentence.speed = Math.random() * 1 + 0.1
      sentence.text = 'この作品の評価は高く、多くの鑑賞者から絶賛されています。' + i
      sentence.fillStyle = 'rgb(100, 100, 100)'
      this.sentenceList.push(sentence)
    }

    // NOTE: 選択可能なワード情報を作成する
    for (let i = 0; i < 5; i++) {
      const x = (fontSize + lineSpace) * i
      const word = new Lane()
      word.position.x = x
      word.position.y = 0
      word.fontSize = Math.random() * 20 + 20
      word.speed = Math.random() * 1 + 0.2
      word.text = '右手' + i
      word.fillStyle = 'rgb(255, 255, 255)'
      this.wordList.push(word)
    }

    this.loopAnimation()

    const canvas = document.getElementById('world')
    // クリックイベントの登録
    canvas.onclick = this.onClickOnCanvas
  },
  methods: {
    onClickOnCanvas: function (e) {
      // NOTE: Check if the clicked position is inside bounding box of word.
      const x = e.clientX
      const y = e.clientY
      const clickedWord = this.wordList.find(word => word.position.x < x && word.position.x + word.fontSize > x && word.position.y < y && word.position.y + word.fontSize * word.text.length > y)

      if (clickedWord !== undefined) {
        console.log(clickedWord)
        // NOTE: Notify the clicked word data to native
        const data = {
          word: clickedWord.text,
          article: 'AXIS Web'
        }
        NativeCommunicator.postWordData(data)
      }
    },
    loopAnimation: function () {
      this.clearCanvas()

      this.injectLanes(this.sentenceList)
      this.injectLanes(this.wordList)

      requestAnimationFrame(this.loopAnimation)
    },
    clearCanvas: function () {
      const width = this.screenSize.width
      const height = this.screenSize.height
      this.context.clearRect(0, 0, width, height)
    },
    // ワードリストを流し込む
    injectLanes (lanes) {
      for (let i = 0; i < lanes.length; i++) {
        const lane = lanes[i]
        this.drawLane(lane)
        lane.position.y -= lane.speed
        const wordWidth = this.context.measureText('あ').width

        if (lane.position.y + wordWidth * lane.text.length < 0) {
          lane.position.y = this.screenSize.height
        }
      }
    },
    drawLane: function (lane) {
      const fontSize = lane.fontSize
      this.context.font = `${fontSize}px メイリオ`
      this.context.fillStyle = 'rgb(255, 255, 255)'
      const text = lane.text
      const x = lane.position.x
      const y = lane.position.y

      // NOTE: Draw background
      const wordWidth = this.context.measureText('あ').width
      this.context.fillStyle = 'rgb(0, 0, 0)'
      this.context.fillRect(x, y, wordWidth, wordWidth * text.length)

      // NOTE: Set anchor point
      this.context.textBaseline = 'top'

      // NOTE: Draw word(sentence)
      this.context.fillStyle = lane.fillStyle
      const textList = text.split('\n')
      const self = this
      textList.forEach(function (elm, i) {
        Array.prototype.forEach.call(elm, function (ch, j) {
          self.context.fillText(ch, x - wordWidth * i, y + wordWidth * j)
        })
      })
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
