import { Role } from "@/store/account/models/account"

export function isAdmin({role, strict}: {role: Role, strict: boolean}) {
  return strict ? role === Role.ADMIN : role >= Role.ADMIN
}

export function isModerator({role, strict}: {role: Role, strict: boolean}) {
  return strict ? role >= Role.MODERATOR && role < Role.ADMIN : role >= Role.MODERATOR 
}

export function isUser({role, strict}: {role: Role, strict: boolean}) {
  return strict ? role >= Role.USER && role < Role.MODERATOR : role >= Role.USER
}