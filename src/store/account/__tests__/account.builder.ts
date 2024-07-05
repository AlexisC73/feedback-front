import { Account, AccountWithPassword } from "../models/account";

export const accountBuilder = ({email = "test@test.fr", id = new Date().toISOString()}: Partial<Account> = {}) => {
  const props: Account = {id, email}

  return {
    withEmail: (email: string) => accountBuilder({...props, email}),
    withId: (id: string) => accountBuilder({...props, id}),
    buildWithPassword: (password: string) => ({...props, password} as AccountWithPassword),
    build: () => props
  }
}