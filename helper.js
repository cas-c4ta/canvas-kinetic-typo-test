
function optimizeCanvas(cnv) {
  const dpr = window.devicePixelRatio
  cnv.width = cnv.offsetWidth
  cnv.height = cnv.offsetHeight
  let rect = cnv.getBoundingClientRect()
  cnv.width = rect.width * dpr
  cnv.height = rect.height * dpr
  cnv.getContext('2d').scale(dpr, dpr)
  cnv.style.width = `${rect.width}px`;
  cnv.style.height = `${rect.height}px`;
}