import {responsiveFontSizes} from '@mui/material'
import {grey, red} from '@mui/material/colors'
import {createTheme} from '@mui/material/styles'

const primaryColor = '#000'
const secondaryColor = '#fff'
const errorColor = red[700]

const headerFont = 'lexia-mono, sans-serif'

let theme = createTheme({
  spacing: 12,
  palette: {
    common: {
      primary: primaryColor,
    },
    primary: {
      main: primaryColor,
    },
    grey: {...grey, 0: '#fff'},
    error: {
      main: errorColor,
    },
    background: {
      paper: '#fff',
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
    },
    h2: {
      fontFamily: headerFont,
      fontWeight: 700,
    },
    h3: {
      fontFamily: headerFont,
      fontWeight: 700,
    },
    h4: {
      fontFamily: headerFont,
    },
    h5: {
      fontFamily: headerFont,
    },
    h6: {
      fontFamily: headerFont,
    },
    button: {
      fontFamily: headerFont,
    },
    body1: {
      fontWeight: 500,
    },
    body2: {
      fontWeight: 500,
    },
    overline: {
      fontWeight: 500,
    },
  },
})

theme.shape = {
  ...theme.shape,
  headerHeight: 70,
}
// Handle Component style overrides
theme.components = {
  MuiInputBase: {
    styleOverrides: {
      root: {
        backgroundColor: '#fff',
        borderRadius: 0,
      },
    },
  },

  //BUTTON THEMEING
  MuiButton: {
    styleOverrides: {
      root: {
        transition: 'all 0.2s',
        color: primaryColor,
        backgroundColor: secondaryColor,
        border: `2px solid ${primaryColor}`,

        whiteSpace: 'nowrap',
        borderRadius: 0,
        '&:hover': {
          color: secondaryColor,
          backgroundColor: primaryColor,
          transform: 'scale(1.015)',
        },
      },

      text: {
        color: primaryColor,
        backgroundColor: secondaryColor,
        border: `none`,
        boxShadow: `none`,
        '&:hover': {
          color: secondaryColor,
          backgroundColor: primaryColor,
        },
      },

      outlined: {
        '&:hover': {
          color: secondaryColor,
          border: `2px solid ${primaryColor}`,
          boxShadow: `none`,
        },
      },

      outlinedPrimary: {
        boxShadow: `5px 5px 0px 0px ${primaryColor}`,
      },
    },
  },
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
}

export default responsiveFontSizes(theme)
