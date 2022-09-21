import {responsiveFontSizes} from '@mui/material'
import {grey, red, blue, orange} from '@mui/material/colors'
import {createTheme} from '@mui/material/styles'

// const primaryColor = '#000'
const primaryColor = grey[900]
const secondaryColor = '#fff'
const bgColor = '#fff'

const errorColor = red[900]

const headerHeight = 75

const headerFont = 'lexia mono, monospace, sans-serif'
const bodyFont = 'lexia mono, monospace, sans-serif'

let theme = createTheme({
  spacing: 12,
  palette: {
    common: {
      primary: primaryColor,
    },
    secondary: {
      main: secondaryColor,
    },
    primary: {
      main: primaryColor,
    },
    grey: {...grey, 0: '#fff'},
    error: {
      main: errorColor,
    },
    background: {
      paper: bgColor,
      default: '#fafafa',
    },
  }, // END OF PALETTE

  typography: {
    fontFamily: headerFont,
    fontSize: 16,
    fontWeightRegular: 300,
    fontWeightMedium: 400,
    fontWeightBold: 700,
    fontDisplay: 'swap',

    h1: {
      fontFamily: headerFont,
      fontWeight: 700,
      fontSize: '6rem',
    },
    h2: {
      fontFamily: headerFont,
      fontWeight: 700,
      fontSize: '4rem',
    },
    h3: {
      fontFamily: headerFont,
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h4: {
      fontFamily: headerFont,
      fontSize: '2rem',
    },
    h5: {
      fontFamily: headerFont,
      fontSize: '2rem',
    },
    h6: {
      fontWeight: 700,
      fontFamily: headerFont,
      fontSize: '1.25rem',
    },
    button: {
      fontFamily: headerFont,
      fontSize: '1rem',
    },
    body1: {fontFamily: bodyFont},
    body2: {
      fontFamily: bodyFont,
      fontSize: '0.875rem',
    },
    overline: {
      fontSize: '0.75rem',
    },
  },

  // Handle Component style overrides
  components: {
    MuiDivider: {
      styleOverrides: {
        root: {
          border: '2px solid white',
        },
      },
    },

    // Input
    MuiInputBase: {
      styleOverrides: {
        root: {
          backgroundColor: secondaryColor,
          borderRadius: 0,
        },
      },
    },

    //Button
    MuiButton: {
      defaultProps: {
        root: {
          variant: 'outlined',
          disableRipple: true,
        },
      },
    },
    //Avatar
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    //Chip
    MuiChip: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          borderRadius: 0,
        },
      },
    },
  },
  components: {
    MuiAvatar: {
      styleOverrides: {
        root: {
          borderRadius: 0,
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          borderRadius: 0,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          transition: 'all 0.2s',
          color: primaryColor,
          backgroundColor: secondaryColor,

          whiteSpace: 'nowrap',
          borderRadius: 0,
          '&:hover': {
            color: secondaryColor,
            backgroundColor: primaryColor,
            transform: 'scale(1.075)',
          },
        },

        //Text
        text: {
          boxShadow: `none`,
          border: `2px solid rgba(0,0,0,0)`,
          '&:hover': {
            color: primaryColor,
            backgroundColor: secondaryColor,
          },
        },
        textPrimary: {
          '&:hover': {
            backgroundColor: secondaryColor,
            border: `2px solid  ${primaryColor}`,
            color: primaryColor,
          },
        },
        textSecondary: {
          backgroundColor: primaryColor,
          color: secondaryColor,
          '&:hover': {
            border: `2px solid  ${secondaryColor}`,
            color: secondaryColor,
            backgroundColor: 'transparent',
          },
        },
        //Outlined
        outlined: {
          border: `2px solid ${primaryColor}`,
          '&:hover': {
            color: secondaryColor,
            border: `2px solid ${primaryColor}`,
            boxShadow: `none`,
            '&:hover': {
              border: `2px solid ${secondaryColor}`,
            },
          },
        },
        outlinedPrimary: {
          border: `2px solid ${primaryColor}`,
          '&:hover': {
            border: `2px solid ${primaryColor}`,
            backgroundColor: primaryColor,
            '&:hover': {
              border: `2px solid ${primaryColor}`,
            },
          },
        },
        outlinedSecondary: {
          border: `2px solid ${secondaryColor}`,
          color: secondaryColor,
          backgroundColor: 'transparent',
          '&:hover': {
            '&:hover': {
              backgroundColor: secondaryColor,
              color: primaryColor,
              border: `2px solid ${secondaryColor}`,
            },
          },
        },
        //Contained
        contained: {
          border: `2px solid ${primaryColor}`,
          '&:hover': {
            color: secondaryColor,
            border: `2px solid ${primaryColor}`,
            // boxShadow: `none`,
          },
        },

        containedPrimary: {
          boxShadow: `5px 5px 0px 0px ${primaryColor}`,
          '&:hover': {
            border: `2px solid ${secondaryColor}`,
            boxShadow: `0px 0px 0px 5px ${primaryColor}`,
          },
        },

        containedSecondary: {
          backgroundColor: primaryColor,
          color: secondaryColor,
          border: `2px solid ${secondaryColor}`,
          boxShadow: `5px 5px 0px 0px ${secondaryColor}`,
          '&:hover': {
            color: primaryColor,
            backgroundColor: secondaryColor,
            border: `2px solid ${primaryColor}`,
            boxShadow: `0px 0px 0px 5px ${secondaryColor}`,
          },
        },
      },

      defaultProps: {
        variant: 'outlined',
        color: 'primary',
        sixe: 'large',
        disableRipple: true,
      },
    },
  },
})

theme.shape = {
  ...theme.shape,
  borderRadius: 0,
  headerHeight,
}

export default responsiveFontSizes(theme)
