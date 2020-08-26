/**
 * Converts a file Blob to a base64 string and calls the callback with this base64 string.
 * @param img image
 * @param callback callback
 */
export function getBase64(img: any, callback: (url: any) => any): any {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(img)
}
