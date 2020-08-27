/**
 * Converts a file Blob to a data url and calls the callback with this.
 * e.g. a data url will look like: data:image/png;base64, if the blob is a png
 * @param img image
 * @param callback callback
 */
export function getBase64(img: any, callback: (url: any) => any): any {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
