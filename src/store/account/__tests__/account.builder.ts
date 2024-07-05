import { Account, AccountWithPassword, Role } from "../models/account";

export const accountBuilder = ({email = "test@test.fr", id = new Date().toISOString(), role = Role.USER}: Partial<Account> = {}) => {
  const props: Account = {id, email, role}

  return {
    withEmail: (email: string) => accountBuilder({...props, email}),
    withId: (id: string) => accountBuilder({...props, id}),
    buildWithPassword: (password: string) => ({...props, password} as AccountWithPassword),
    withRole: (role: Role) => accountBuilder({...props, role}),
    build: () => props
  }
}