export interface Feedback {
  id: string
  title: string
  description: string
  category: FeedbackCategory
  status: FeedbackStatus
  owner: string
  upvotes: number,
  comments: number
}

export enum FeedbackCategory {
  FEATURE = 'feature',
  BUG = 'bug',
  ENHANCEMENT = 'enhancement',
  UI = 'ui',
  UX = 'ux',
}

export enum FeedbackStatus {
  SUGGESTION = 'SUGGESTION',
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  LIVE = 'LIVE',
}
