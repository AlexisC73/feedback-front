import { Account, Role } from "../models/account"

export const authAccountBuilder = ({
  id = "1",
  avatar = null,
  displayName = 'test',
  email = "test@test.fr",
  role = Role.USER,
  username = "test-username"
}: Partial<Account> = {}) => {
  const props: Account = {id, avatar, displayName, email, role, username}

  return {
    withId: (id: string) => authAccountBuilder({...props, id}),
    withAvatar: (avatar: string) => authAccountBuilder({...props, avatar}),
    withDisplayName: (displayName: string) => authAccountBuilder({...props, displayName}),
    withEmail: (email: string) => authAccountBuilder({...props, email}),
    withRole: (role: Role) => authAccountBuilder({...props, role}),
    withUsername: (username: string) => authAccountBuilder({...props, username}),
    build: (): Account => props
  }
}