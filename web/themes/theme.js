import {responsiveFontSizes} from '@mui/material'
import {grey, red} from '@mui/material/colors'
import {createTheme} from '@mui/material/styles'

const primaryColor = '#000'
const backgroundColor = '#fff'
const errorColor = red[700]

const headerFont = 'lexia-mono, sans-serif'

let theme = createTheme({
  spacing: 24,
  palette: {
    common: {
      primary: primaryColor,
    },
    secondary: {
      main: backgroundColor,
    },
    primary: {
      main: primaryColor,
    },
    grey: {...grey, 0: '#fff'},
    error: {
      main: errorColor,
    },
    background: {
      paper: backgroundColor,
      default: '#fafafa',
    },
  }, // END OF PALETTE
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: headerFont,
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
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
      fontFamily: headerFont,
      fontSize: '1.25rem',
    },
    button: {
      fontFamily: headerFont,
      fontSize: '1rem',
    },
    body1: {
      fontWeight: 500,
    },
    body2: {
      fontSize: '0.875rem',
      fontWeight: 500,
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 500,
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
          backgroundColor: backgroundColor,
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
          backgroundColor: backgroundColor,
          border: `2px solid ${primaryColor}`,

          whiteSpace: 'nowrap',
          borderRadius: 0,
          '&:hover': {
            color: backgroundColor,
            backgroundColor: primaryColor,
            transform: 'scale(1.015)',
          },
        },

        text: {
          border: `none`,
          boxShadow: `none`,
          border: `2px solid ${backgroundColor}`,
          '&:hover': {
            color: primaryColor,
            backgroundColor: backgroundColor,
            border: `2px solid ${primaryColor}`,
          },
        },

        outlined: {
          '&:hover': {
            color: backgroundColor,
            border: `2px solid ${primaryColor}`,
            boxShadow: `none`,
          },
        },

        outlinedSecondary: {
          boxShadow: `5px 5px 0px 0px ${primaryColor}`,
          '&:hover': {
            border: `2px solid ${backgroundColor}`,
            boxShadow: `0px 0px 0px 5px ${primaryColor}`,
          },
        },
      },
      defaultProps: {
        variant: 'outlined',
        color: 'primary',
        disableRipple: true,
      },
    },
  },
})

theme.shape = {
  ...theme.shape,
  headerHeight: 70,
}

export default responsiveFontSizes(theme)
