export interface SegmentationQuery {
  id?: number
  segmentationId?: number
  tree?: string | null
  query?: any | null
  conditions?: Array<any> | null
}
