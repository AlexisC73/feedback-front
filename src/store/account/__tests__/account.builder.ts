import { Account, AccountWithPassword, Role } from "../models/account";

export const accountBuilder = ({email = "test@test.fr", id = new Date().toISOString(), role = Role.USER, avatar = "https://example.com/avatar.png"}: Partial<Account> = {}) => {
  const props: Account = {id, email, role, avatar}

  return {
    withEmail: (email: string) => accountBuilder({...props, email}),
    withId: (id: string) => accountBuilder({...props, id}),
    buildWithPassword: (password: string) => ({...props, password} as AccountWithPassword),
    withRole: (role: Role) => accountBuilder({...props, role}),
    withAvatar: (avatar: string) => accountBuilder({...props, avatar}),
    build: () => props
  }
}