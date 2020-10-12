export interface CampaignSegmentation {
  id?: number
  name?: string | null
  segmentationCategoryId?: number | null
  categoryName?: string | null
  segmentSize?: number | null
  cumulativeIntersection?: number | null
  referenceSegmentationId?: number | null
  createdDate?: moment.Moment
}
