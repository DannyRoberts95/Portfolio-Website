import {responsiveFontSizes} from '@mui/material'
import {cyan, grey, red, teal} from '@mui/material/colors'
import {createTheme} from '@mui/material/styles'

const primaryColor = '#000'
// const secondaryColor = teal.A200 //#00bfa5
const secondaryColor = teal[400] //#00bfa5
const errorColor = red[700]

let theme = createTheme({
  spacing: 12,
  palette: {
    common: {
      primary: primaryColor, //#0097a7
      secondary: secondaryColor, //#00bfa5
    },
    primary: {
      main: `${primaryColor}`, //#0097a7
    },
    secondary: {
      main: secondaryColor, //#00bfa5
    },

    success: {
      main: secondaryColor,
    },
    grey: {...grey, 0: '#fff'},
    error: {
      main: errorColor,
    },
    background: {
      paper: '#fff',
      dark: grey[200], //#eeeeee
      default: '#fafafa',
      light: grey[50], //#fafafa
    },
  }, // END OF PALETTE
  shape: {
    borderRadius: 12,
  },
  typography: {
    fontFamily: 'Red Hat Text, sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontDisplay: 'swap',

    h1: {
      fontFamily: 'Red Hat Display, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'Red Hat Display, sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'Red Hat Display, sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: 'Red Hat Display, sans-serif',
    },
    h5: {
      fontFamily: 'Red Hat Display, sans-serif',
    },
    h6: {
      fontFamily: 'Red Hat Display, sans-serif',
    },
    subtitle1: {
      fontWeight: 700,
      fontFamily: 'Red Hat Display, sans-serif',
    },
    subtitle2: {
      fontFamily: 'Red Hat Display, sans-serif',
      fontWeight: 500,
    },
    button: {
      fontFamily: 'Red Hat Display, sans-serif',
      textTransform: 'none',
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
      },
    },
  },
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: 'capitalize',
        whiteSpace: 'nowrap',
        borderRadius: theme.shape.borderRadius * 2,
        '&:hover': {
          transition: 'all 0.2s',
          transform: 'scale(1.025)',
        },
      },
      containedPrimary: {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        background: `linear-gradient(45deg, ${theme.palette.primary.main} 40%, ${theme.palette.primary.light} 80%)`,
        '&:hover': {
          background: `linear-gradient(45deg, ${theme.palette.primary.light} 80%, ${theme.palette.primary.main} 100%)`,
        },
        '&:disabled': {
          opacity: 0.33,
        },
      },
      containedSecondary: {
        backgroundColor: theme.palette.secondary.main,
        color: theme.palette.primary.contrastText,
        background: `linear-gradient(45deg, ${theme.palette.secondary.main} 40%, ${theme.palette.secondary.light} 80%)`,
        '&:hover': {
          background: `linear-gradient(45deg, ${theme.palette.secondary.main} 80%, ${theme.palette.secondary.light} 100%)`,
        },
        '&:disabled': {
          opacity: 0.33,
        },
      },
    },
  },
}

export default responsiveFontSizes(theme)
