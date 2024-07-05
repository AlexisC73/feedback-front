export interface Feedback {
  id: string
  title: string
  description: string
  category: FeedbackCategory
  status: FeedbackStatus
}

export enum FeedbackCategory {
  FEATURE = 'FEATURE',
  BUG = 'BUG',
  ENHANCEMENT = 'ENHANCEMENT',
  UI = 'UI',
  UX = 'UX',
}

export enum FeedbackStatus {
  SUGGESTION = 'SUGGESTION',
  PLANNED = 'PLANNED',
  IN_PROGRESS = 'IN_PROGRESS',
  LIVE = 'LIVE',
}

export interface DomainFeedback {
  id: string
  title: string
  description: string
  category: FeedbackCategory
  status: FeedbackStatus
}