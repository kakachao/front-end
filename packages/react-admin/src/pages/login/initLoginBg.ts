

let cvs: HTMLCanvasElement
let ctx: CanvasRenderingContext2D

const points: InstanceType<typeof Vector3>[] = []
const fov = 100;
const dist = 100;
const opacity = 0.4;
const particleSize = 2;
const maxAmplitude = 1500; // Best results with values > 500
const sideLength = 50; // How many particles per side
const spacing = 200; // Particle distance from each other
let rotXCounter = 0;
let rotYCounter = 0;
let rotZCounter = 0;
let counter = 0;

class Vector3 {
  x: number;
  y: number;
  z: number;
  color: string;
  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.color = "#0D0";
  }
  rotateX(angle: number): Vector3 {
    const z = this.z * Math.cos(angle) - this.x * Math.sin(angle);
    const x = this.z * Math.sin(angle) + this.x * Math.cos(angle);
    return new Vector3(x, this.y, z);
  }
  rotateY(angle: number): Vector3 {
    const y = this.y * Math.cos(angle) - this.z * Math.sin(angle);
    const z = this.y * Math.sin(angle) + this.z * Math.cos(angle);
    return new Vector3(this.x, y, z);
  }
  rotateZ(angle: number): Vector3 {
    const x = this.x * Math.cos(angle) - this.y * Math.sin(angle);
    const y = this.x * Math.sin(angle) + this.y * Math.cos(angle);
    return new Vector3(x, y, this.z);
  }
  perspectiveProjection(fov: number, viewDistance: number): Vector3 {
    const factor = fov / (viewDistance + this.z);
    const x = this.x * factor + cvs.width / 2;
    const y = this.y * factor + cvs.height / 2;
    return new Vector3(x, y, this.z);
  }
  draw() {
    const frac = this.y / maxAmplitude;
    const r = Math.floor(frac * 100);
    const g = 20;
    const b = Math.floor(255 - frac * 100);
    const vec = this.rotateX(rotXCounter).rotateY(rotYCounter).rotateZ(rotZCounter).perspectiveProjection(fov, dist);
    this.color = `rgb(${r}, ${g}, ${b})`;
    ctx.fillStyle = this.color;
    ctx.fillRect(vec.x, vec.y, particleSize, particleSize);
  }
}
for (let z = 0; z < sideLength; z++) {
  for (let x = 0; x < sideLength; x++) {
    const xStart = -(sideLength * spacing) / 2;
    points.push(new Vector3(xStart + x * spacing, 0, xStart + z * spacing));
  }
}
function init() {
  cvs = document.getElementById('canvas') as HTMLCanvasElement;
  ctx = cvs.getContext('2d') as CanvasRenderingContext2D;
  cvs.width = window.innerWidth * window.devicePixelRatio;
  cvs.height = window.innerHeight * window.devicePixelRatio;
  drawPoint()
}
// Init
function drawPoint() {
  requestAnimationFrame(drawPoint);
  ctx.fillStyle = `rgba(0, 0, 0, ${opacity})`;
  ctx.fillRect(0, 0, cvs.width, cvs.height);
  for (let i = 0; i < points.length; i++) {
    const x = i % sideLength;
    const z = Math.floor(i / sideLength);
    const xFinal = Math.sin(x / sideLength * 4 * Math.PI + counter);
    const zFinal = Math.cos(z / sideLength * 4 * Math.PI + counter);
    const gap = maxAmplitude * 0.3;
    const amp = maxAmplitude - gap;
    points[z * sideLength + x].y = maxAmplitude + xFinal * zFinal * amp;
    points[i].draw();
  }
  counter += 0.03;
  rotXCounter += 0.005;
  rotYCounter += 0.005;
}

export default function initLoginBg() {
  init();
}