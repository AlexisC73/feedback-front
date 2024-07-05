export interface Account {
  id: string
  email: string
}

export type AccountWithPassword = Account & { password: string }
