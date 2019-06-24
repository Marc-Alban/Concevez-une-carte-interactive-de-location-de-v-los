class Canvas {
  constructor() {
    this.canvas = document.querySelector('#my-canvas')
    this.ctx = this.canvas.getContext('2d')
    this.btnClear = document.querySelector('.btnReset')
    this.btnValidation = document.querySelector('.btnValider')
    this.formCanvas = document.querySelector('.formCanvas')
    this.information = document.querySelector('#information')
    this.draw = false
    this.canvas.toDataURL()
    this.signature()
    this.count = 0
    this.countStorage

  }

  getMousePosition(e) {
    let rectangle = this.canvas.getBoundingClientRect(e)
    return {
      x: e.offsetX - rectangle.left,
      y: e.offsetY - rectangle.top
    }
  }

  getTouchPosition(e) {
    let rect = this.canvas.getBoundingClientRect(e)

    return {
      x: (e.touches['0'].clientX - rect.left) * (this.canvas.width / rect.width),
      y: (e.touches['0'].clientY - rect.top) * (this.canvas.height / rect.height)
    }
  }

  signature() {

    this.canvas.addEventListener('mousedown', (e) => {
      let mousePosition = this.getMousePosition(e)
      this.draw = true
      this.ctx.lineWidth = 2.5
      this.ctx.moveTo(mousePosition.x, mousePosition.y)
      this.ctx.beginPath()
    })

    this.canvas.addEventListener('mousemove', (e) => {
      if (this.draw === true) {
        this.ctx.lineTo(e.offsetX, e.offsetY)
        this.ctx.stroke()
        this.count++
      }
      
    })

    this.canvas.addEventListener('mouseleave', (e) => {
      this.draw = false
    })

    this.canvas.addEventListener('mouseup', (e) => {
      this.draw = false
      let dataCanvas = this.canvas.toDataURL()
      let dataCanvasStorage = sessionStorage.setItem('dataCanvas', dataCanvas)
      this.countStorage = sessionStorage.setItem('countStorrage', this.count)
    })

    this.canvas.addEventListener(`touchstart`, (e) => {
      let touchesPosition = this.getTouchPosition(e)
      this.draw = true
      this.ctx.lineWidth = 2.5
      this.ctx.moveTo(touchesPosition.x, touchesPosition.y)
      this.ctx.beginPath()
      e.preventDefault()
    })

    // Tracé
    this.canvas.addEventListener(`touchmove`, (e) => {
      let touch = e.changedTouches[0]
      let touchesPosition = this.getTouchPosition(e)
      this.ctx.lineTo(touchesPosition.x, touchesPosition.y)
      this.ctx.stroke()
      this.count++
      e.preventDefault()
    })

    this.canvas.addEventListener('touchleave', (e) => {
      this.draw = false
    })


    this.canvas.addEventListener(`touchend`, (e) => {
      this.draw = false; // Stop le tracé
      e.preventDefault()
      this.countStorage = sessionStorage.setItem('countStorrage', this.count)
      let dataCanvas = this.canvas.toDataURL()
      let dataCanvasStorage = sessionStorage.setItem('dataCanvas', dataCanvas)
      if (this.count < 10) {
        this.btnValidation.style.display = 'none'
      }

    })

    this.btnClear.addEventListener('click', (e) => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
      this.count = 0
      this.countStorage = sessionStorage.setItem('countStorrage', this.count)
      e.preventDefault()
    })

    this.btnValidation.addEventListener('click', (e) => {
      if (this.count > 10) {

        this.interval = setInterval(() => {
          this.count = 0
          this.countStorage = sessionStorage.setItem('countStorrage', this.count)
          this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
          clearInterval(this.interval)
        }, 5000)

        this.information.style.display = 'block'
        this.formCanvas.style.display = 'none'
      } else {
        alert('Signer s\'il vous plait')
      }
      e.preventDefault()
    })
  }
}
const signature = new Canvas()