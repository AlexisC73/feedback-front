import { useAppSelector } from "@/store/store-hooks";
import { Avatar } from "../avatar/Avatar";
import { selectAuth } from "@/store/auth/auth-reducer";
import { FormGroup } from "../form/form-group/FormGroup";
import { InputHeader } from "../form/input-header/InputHeader";
import { LanguageSelect } from "../ui/LanguageSelect/LanguageSelect";
import { LogoutButton } from "@/store/auth/app/logout/LogoutButton";

export function Profile () {
  const {account} = useAppSelector(selectAuth)
  if(!account) return null

  return (
    <ul id="filter" className="flex flex-col bg-white p-6 rounded-2.5 md:w-55.75 xl:w-63.75 gap-y-3.5 gap-x-2 justify-center gap-y-8">
      <div className="flex items-center gap-x-3">
        <Avatar size="md" imageUrl={account.avatar} username={account.username} />
        <div>
          <p className="flex-1 text-4">{account.displayName}</p>
          <p className="text-3.5 text-#647196">@{account.username}</p>
        </div>
      </div>
      <FormGroup>
        <InputHeader htmlFor="language" label="Changer de langue" />
        <div className="bg-#F7F8FD rounded-1.25">
            <LanguageSelect />
        </div>
      </FormGroup>
      <LogoutButton />
    </ul>
  )
}