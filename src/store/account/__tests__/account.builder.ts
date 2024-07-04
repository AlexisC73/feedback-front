import { DomainAccount } from "../models/account";

export const domainAccountBuilder = ({email = "test@test.fr", password = "password-test", id = new Date().toISOString()}: Partial<DomainAccount> = {}) => {
  const props: DomainAccount = {id, email, password}

  return {
    withEmail: (email: string) => domainAccountBuilder({...props, email}),
    withPassword: (password: string) => domainAccountBuilder({...props, password}),
    withId: (id: string) => domainAccountBuilder({...props, id}),
    build: () => props
  }
}