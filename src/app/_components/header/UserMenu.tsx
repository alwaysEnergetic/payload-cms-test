import { useAuth } from '@/app/_providers/AuthProvider'
import { useLocale } from '@/app/_providers/LocaleProvider'
import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from '@headlessui/react'
import Link from 'next/link'
import { BiBuildingHouse, BiCheck, BiChevronRight, BiLogOut, BiMoon } from 'react-icons/bi'
import { IoLanguage } from 'react-icons/io5'

export default function UserMenu() {
  const { user, logout } = useAuth()
  const { locales, localeCode, setLocaleCode } = useLocale()

  if (!user) return null

  const updateLocale = (code: string) => {
    console.log(code)
  }

  return (
    <Menu>
      <MenuButton className="w-12 h-12 rounded-full bg-white overflow-hidden flex items-center justify-center font-semibold text-lg">
        {(user.firstName[0] + user.lastName[0]).toUpperCase()}
      </MenuButton>
      <MenuItems
        anchor="bottom end"
        className="w-52 origin-top-right rounded-xl p-1 bg-white text-sm text-black [--anchor-gap:10px] focus:outline-none"
      >
        <div className="py-2.5 px-3 space-y-1">
          <p className="font-bold">
            {user.firstName} {user.lastName}
          </p>
          <p>{user.email}</p>
        </div>
        <hr />
        {user.locations && user.locations.length && (
          <Popover>
            <PopoverButton className="group flex w-full items-center justify-between rounded-lg py-2 px-3">
              <div className="flex items-center space-x-2">
                <BiBuildingHouse className="w-5 h-5" />
                Facility
              </div>
              <BiChevronRight className="w-5 h-5" />
            </PopoverButton>
            <PopoverPanel
              anchor="right start"
              className="flex flex-col bg-white border border-gray-100 rounded p-1 [--anchor-gap:3px]"
            >
              {user.locations.map((location) => {
                if (typeof location === 'string') return null

                return (
                  <Link href="#" className="px-2 py-1 min-w-32 text-sm" key={location.id}>
                    {location.name}
                  </Link>
                )
              })}
            </PopoverPanel>
          </Popover>
        )}
        <Popover>
          <PopoverButton className="group flex w-full items-center justify-between rounded-lg py-2 px-3">
            <div className="flex items-center space-x-2">
              <IoLanguage className="w-5 h-5" />
              Language
            </div>
            <BiChevronRight className="w-5 h-5" />
          </PopoverButton>
          <PopoverPanel
            anchor="right start"
            className="flex flex-col bg-white border border-gray-100 rounded p-1 [--anchor-gap:3px]"
          >
            {locales.map((locale) => {
              return (
                <div
                  className="px-2 py-1 min-w-32 text-sm flex justify-between items-center"
                  key={locale.code}
                  onClick={() => updateLocale(locale.code)}
                >
                  <p>
                    {typeof locale.label === 'string' ? locale.label : locale.label[localeCode]} (
                    {locale.code})
                  </p>
                  {locale.code === localeCode && <BiCheck className="w-4 h-4" />}
                </div>
              )
            })}
          </PopoverPanel>
        </Popover>
        <MenuItem>
          <button className="group flex w-full items-center gap-2 rounded-lg py-2 px-3">
            <BiMoon className="w-5 h-5" />
            Dark mode
          </button>
        </MenuItem>
        <hr />
        <MenuItem>
          <button
            className="group flex w-full items-center gap-2 rounded-lg py-2 px-3"
            onClick={(e) => {
              logout()
            }}
          >
            <BiLogOut className="w-5 h-5" />
            Log out
          </button>
        </MenuItem>
      </MenuItems>
    </Menu>
  )
}
