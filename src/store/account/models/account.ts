export interface Account {
  id: string
  email: string
  avatar: string | null
  role: Role
  displayName: string
  username: string
}

export enum Role {
  USER = 100,
  MODERATOR = 200,
  ADMIN = 300,
}

export type AccountWithPassword = Account & { password: string }
