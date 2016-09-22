import {
  Platform,
} from 'react-native'

export const HIGHLIGHT_COLOR = 'rgb(151, 214, 245)'
export const DARK_COLOR = 'rgb(33, 33, 33)'
export const TEXT_WHITE = 'rgb(223, 223, 223)'
export const NAV_BAR_COLOR = 'rgb(55, 55, 55)'
export const NAV_BAR_HEIGHT = 60
export const TAB_BAR_HEIGHT = 49
export const MISSING_IMAGE_COLOR = 'rgba(77, 77, 77, 0.85)'
export const getTabBarMargin = () => (
  Platform.OS === 'ios' ? TAB_BAR_HEIGHT : 0
)
