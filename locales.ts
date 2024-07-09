import {FlagComponent, GB, NL} from 'country-flag-icons/react/3x2'

export type Locale = {
  id: string,
  title: string
}

export type LocaleFlag = {
  id: string,
  flag: FlagComponent
}


export const locales: Locale[] = [
  {id: 'en', title: 'English'},
  {id: 'nl', title: 'Dutch'}
]

export const localeFlagIcons = [
  {id: 'en', flag: GB},
  {id: 'nl', flag: NL}
]