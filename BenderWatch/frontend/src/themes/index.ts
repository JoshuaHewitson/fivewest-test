const base = 8
const radius = 5

export const Metrics = {
  version: '1.0',
  base,
  radius,
  headerHeight: base * 14,
  tabBarHeight: base * 7
}

export const baseColors = {
  primary: '#FF423F',
  secondary: '#FF7A1A',
  spot1: '#ffc600',
  background: '#182232',
  textPrimary: '#FFFFFF',
  textSecondary: '#A2ACBD',
  subsectionBackground: '#242D3C',
  selectHighlight: '#182F4A',
  divider: '#3E6078',
  disabled: '#485362',
  link: '#547796',
  success: '#16a34a',
  error: '#dc2626'
}

export const gradient = `linear-gradient(to right,  ${baseColors.primary},${baseColors.secondary})`

export const fontVariables = {
  fontFamilyOpenSans: 'Open Sans, sans-serif',
  fontFamilyRoboto: `Helvetica Neue, Helvetica, Roboto, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, sans-serif`,
  fontFamilyLato: `Lato, -apple-system, BlinkMacSystemFont, Segoe UI, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif`,
  fontFamilyIbmPlexSans: 'IBM Plex Sans, sans-serif',
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 600,
  //
  displaySize: 45,
  headingSize: 30,
  subheadingSize: 19,
  titleSize: 16,
  bodySize: 14,
  captionSize: 11,
  statusSize: 10,
  buttonSize: 13,
  //
  tinySize: 9,
  smallSize: 11,
  paragraphSize: 12,
  medium: 14,
  menuSize: 16
}
