/**
 * Converts a file Blob to a data url and calls the callback with this.
 * e.g. a data url will look like: data:image/png;base64, if the blob is a png
 * @param blob image
 * @param callback callback
 */
export function getBase64(blob: any, callback: (url: any) => any): any {
  const reader = new FileReader()
  reader.addEventListener('load', () => callback(reader.result))
  reader.readAsDataURL(blob)
}

/**
 * Downloads the blob as a file
 * @param blob file content
 * @param fileName name of the file with the extension
 */
function downloadBlob(blob: Blob, fileName: string): void {
  // Convert your blob into a Blob URL (a special url that points to an object in the browser's memory)
  const blobUrl = URL.createObjectURL(blob)

  // Create a link element
  const link = document.createElement('a')

  // Set link's href to point to the Blob URL
  link.href = blobUrl
  link.download = fileName

  // Append link to the body
  document.body.appendChild(link)

  // Dispatch click event on the link
  // This is necessary as link.click() does not work on the latest firefox
  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })
  )

  // Remove link from body
  document.body.removeChild(link)
}

/**
 * Downloads the blob as a csv
 * @param blob csv content
 * @param fileName csv file name
 */
export function downloadBlobAsCsv(blob: Blob, fileName = new Date().toISOString()): void {
  downloadBlob(blob, `${fileName}.csv`)
}
