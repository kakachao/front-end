<template>
  <div class="s-canvas">
    <canvas id="s-canvas" :width="state.contentWidth" :height="state.contentHeight"></canvas>
  </div>
</template>
<script lang="ts" setup>
import { onMounted, reactive, watch } from 'vue';

const props = defineProps<{
  fresh: boolean
}>()
const emit = defineEmits(['makeCode'])
const state = reactive({
  identifyCode: "",
  // identifyCodes: "1234567890",
  fontSizeMin: 30,
  fontSizeMax: 30,
  backgroundColorMin: 180,
  backgroundColorMax: 240,
  colorMin: 50,
  colorMax: 160,
  lineColorMin: 40,
  lineColorMax: 180,
  dotColorMin: 0,
  dotColorMax: 255,
  contentWidth: 80,
  contentHeight: 40
})
// 生成一个随机数
const randomNum = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min) + min)
}
// 生成一个随机的颜色 
const randomColor = (min: number, max: number) => {
  let r = randomNum(min, max)
  let g = randomNum(min, max)
  let b = randomNum(min, max)
  return 'rgb(' + r + ',' + g + ',' + b + ')'
}
// 生成一个随机字母
const randomAlphabet = () => {
  const alphabet = String.fromCharCode(Math.floor(Math.random() * 25) + 97)
  return alphabet
}
const drawPic = () => {
  let canvas = document.getElementById('s-canvas')
  //@ts-ignore
  let ctx = canvas?.getContext('2d')
  // ctx.textBaseline = 'bottom'
  // 绘制背景
  ctx.fillStyle = randomColor(state.backgroundColorMin, state.backgroundColorMax) //图形填充颜色设置
  ctx.strokeStyle = randomColor(state.backgroundColorMin, state.backgroundColorMax) //图形轮廓的颜色设置
  ctx.fillRect(0, 0, state.contentWidth, state.contentHeight) //绘制一个填充的矩形 0 0 width height x起点 y起点  宽 高
  ctx.strokeRect(0, 0, state.contentWidth, state.contentHeight) // 绘制一个矩形边框 0 0 width height x起点 y起点  宽 高
  // ctx.clearRect(50,0,state.contentWidth,state.contentHeight)  //清除指定矩形区域，清除部分完全透明
  // 绘制文字
  for (let i = 0; i < state.identifyCode.length; i++) {
    drawText(ctx, state.identifyCode[i], i)
  }
  // state.drawLine(ctx)
  drawDot(ctx)
}
const drawText = (ctx, txt, i) => {
  ctx.fillStyle = randomColor(state.colorMin, state.colorMax)
  ctx.font = randomNum(state.fontSizeMin, state.fontSizeMax) + 'px SimHei' //字体大小
  ctx.textBaseline = 'alphabetic' //基线对齐
  let x = (i + 1) * (state.contentWidth / (state.identifyCode.length + 1))
  let y = randomNum(state.fontSizeMax, state.contentHeight - 5)
  var deg = randomNum(-15, 15)
  // 修改坐标原点和旋转角度
  ctx.translate(x, y)//移动不同位置  参数偏移量
  ctx.rotate(deg * Math.PI / 180) //旋转 参数角度
  ctx.fillText(txt, 0, 0)
  // 恢复坐标原点和旋转角度
  ctx.rotate(-deg * Math.PI / 180)
  ctx.translate(-x, -y)
}
const drawLine = (ctx) => {
  // 绘制干扰线
  for (let i = 0; i < 8; i++) {
    ctx.strokeStyle = randomColor(state.lineColorMin, state.lineColorMax)
    ctx.beginPath() //新建一条路径
    ctx.moveTo(randomNum(0, state.contentWidth), randomNum(0, state.contentHeight)) //设置起点x,y
    ctx.lineTo(randomNum(0, state.contentWidth), randomNum(0, state.contentHeight)) //绘制直线 x,y 一条当前位置到x,y点的直线
    ctx.stroke() // 通过线条绘制图形轮廓
    // ctx.closePath() //结束闭合路径
  }
}
const drawDot = (ctx) => {
  // 绘制干扰点
  for (let i = 0; i < 100; i++) {
    ctx.fillStyle = randomColor(0, 255)
    ctx.beginPath()
    // 绘制圆弧或圆，x,y,radius，startAngle,endAngle,anticlockwise // x,y 圆心点，radius 半径，从startAngle开始到endAngle结束
    ctx.arc(randomNum(0, state.contentWidth), randomNum(0, state.contentHeight), 1, 0, 2 * Math.PI)
    ctx.fill() //通过填充路径的内容区域生成实心的图形。
  }
}

const makeCode = (length: number) => {
  state.identifyCode = "";
  for (let i = 0; i < length; i++) {
    state.identifyCode += randomNum(0, 10);
    // state.identifyCode += state.randomAlphabet();

  }
  //绘制图片
  drawPic()
  //传值给父组件
  emit('makeCode', state.identifyCode);
}
watch(() => props.fresh, () => {
  makeCode(4);
})
onMounted(() => {
  makeCode(4);
})
</script>