/*
Tim Rodenbroekers Tutorial:
https://timrodenbroeker.de/processing-tutorial-kinetic-typography-1/

Canvas-Tutorail, MDN
https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API/Tutorial 
 */

const cnvA = document.querySelector("#cnv-a")
const cnvB = document.querySelector("#cnv-b")
const ctx1 = cnvA.getContext("2d")
const ctx2 = cnvB.getContext("2d")
optimizeCanvas(cnvA)
optimizeCanvas(cnvB)

const getPreferredScheme = () =>
  window?.matchMedia?.("(prefers-color-scheme:dark)")?.matches
    ? "dark"
    : "light"

cnvA.style.background =
  getPreferredScheme() === "dark" ? "darkslateblue" : "lightyellow"
cnvB.style.background =
  getPreferredScheme() === "dark" ? "darkslategray" : "palegreen"

ctx1.fillStyle = getPreferredScheme() === "dark" ? "yellow" : "navy"
// ctx2.fillStyle = (getPreferredScheme === 'dark') ? 'pink' : 'black'

ctx1.font = "normal 260px cheee"
ctx1.fillText("a", 20, 185)

// tile and transfer
const stepW = 5
const stepH = 50
const cnvWidth = cnvA.width
const cnvHeight = cnvA.height

let a = 0 // (angle for sin/cos)

function loop() {

  // prevent artecacts
  ctx2.clearRect(0, 0, cnvB.width/2, cnvB.height/2)

  for (let y = 0; y < cnvHeight; y += stepW) {
    for (let x = 0; x < cnvWidth; x += stepW) {
      // outline tiles
      // ctx1.strokeRect(x, y, stepW, stepH)

      // source
      // everything is double sized, due to the optimisatzion (see helper.js)
      const sourceX = x * 2
      const sourceY = y * 2
      const sourceW = stepW * 2
      const sourceH = stepH * 2

      // destination
      // already optimized, hence no scale factor
      const destX = x
      const destY = y
      const destW = stepW + Math.cos(a + x * y) * 20
      const destH = stepH

      ctx2.fillStyle =
        getPreferredScheme === "dark" ? "darkslategray" : "palegreen"
      ctx2.fillRect(destX, destY, destW, destH)

      ctx2.drawImage(
        cnvA,
        sourceX,
        sourceY,
        sourceW,
        sourceH,
        destX,
        destY,
        destW,
        destH
      )

      // outline tiles
      // ctx2.strokeRect(destX, destY, destW, destH)
    }
  }

  a += Math.PI / 60
  window.requestAnimationFrame(loop)
}

loop()
