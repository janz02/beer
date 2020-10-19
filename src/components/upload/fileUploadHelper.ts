// Common MIME types: https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types/Common_types

export enum MIMEType {
  JPG = 'image/jpeg',
  PNG = 'image/png',
  TXT = 'text/plain',
  PDF = 'application/pdf',
  CSV = 'application/vnd.ms-excel'
}

export enum FileExtension {
  JPG = '.jpg',
  PNG = '.png',
  TXT = '.txt',
  PDF = '.pdf',
  CSV = '.csv'
}

export const FILE_TYPES = [
  { mimeType: MIMEType.JPG, extension: FileExtension.JPG },
  { mimeType: MIMEType.PNG, extension: FileExtension.PNG },
  { mimeType: MIMEType.TXT, extension: FileExtension.TXT },
  { mimeType: MIMEType.PDF, extension: FileExtension.PDF },
  { mimeType: MIMEType.CSV, extension: FileExtension.CSV }
]

export const MAX_FILE_SIZE_IN_MB = 51

export interface PictureDimensions {
  width: number
  height: number
}

export interface FrontendFileValue {
  id: string
  extension?: string
  size?: number
  dimensions?: PictureDimensions
}
