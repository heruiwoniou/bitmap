import { slice } from './util'

export default class Bitmap {
  public R: Number
  public G: Number
  public B: Number
  public A: Number
  public cell: Number
  public row: Number

  constructor(rgba: Array<Number>, cell: Number, row: Number) {
    this.R = rgba[0]
    this.G = rgba[1]
    this.B = rgba[2]
    this.A = rgba[3]

    this.cell = cell
    this.row = row
  }


  public static load(src: string): Promise<Bitmap[]> {
    return new Promise((resolve: Function, reject: Function) => {
      let container = document.createElement('div')
      let image = new Image()
      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d'), height, width

      container.style.height = '0px'
      container.style.width = '0px'
      container.style.marginLeft = '-9999px'
      container.appendChild(canvas)
      document.body.appendChild(container)

      image.addEventListener('load', () => {
        width = canvas.width = image.naturalWidth || image.offsetWidth
        height = canvas.height = image.naturalHeight || image.offsetHeight

        ctx.drawImage(image, 0, 0, width, height)
        let data = ctx.getImageData(0, 0, width, height)

        let arr: Array<Bitmap> = new Array<Bitmap>()
        for (let row = 0; row < height; row++) {
          for (let cell = 0; cell < width; cell++) {
            arr.push(new Bitmap(slice(data, row * height + cell, 4), cell, row))
          }
        }
      })
      image.addEventListener('error', (err) => {
        reject(err)
      })

      image.src = src
    });
  }
}
