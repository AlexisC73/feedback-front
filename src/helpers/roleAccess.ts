import { Role } from "@/store/account/models/account"

function isAdmin({role = Role.USER, strict = false}: {role?: Role, strict?: boolean} = {}) {
  return strict ? role === Role.ADMIN : role >= Role.ADMIN
}

function isModerator({role = Role.USER, strict = false}: {role?: Role, strict?: boolean} = {}) {
  return strict ? role >= Role.MODERATOR && role < Role.ADMIN : role >= Role.MODERATOR 
}

function isUser({role = Role.USER, strict = false}: {role?: Role, strict?: boolean} = {}) {
  return strict ? role >= Role.USER && role < Role.MODERATOR : role >= Role.USER
}

export const roleAccess = {
  isAdmin,
  isUser,
  isModerator
}