import {responsiveFontSizes} from '@mui/material'
import {grey, red} from '@mui/material/colors'
import {createTheme} from '@mui/material/styles'

const primaryColor = '#000'
const errorColor = red[700]

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
    fontFamily: 'lexia-mono, sans-serif',
    fontSize: 16,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
    fontWeightBold: 700,
    fontDisplay: 'swap',

    h1: {
      fontFamily: 'lexia-mono, sans-serif',
      fontWeight: 700,
    },
    h2: {
      fontFamily: 'lexia-mono, sans-serif',
      fontWeight: 700,
    },
    h3: {
      fontFamily: 'lexia-mono, sans-serif',
      fontWeight: 700,
    },
    h4: {
      fontFamily: 'lexia-mono, sans-serif',
    },
    h5: {
      fontFamily: 'lexia-mono, sans-serif',
    },
    h6: {
      fontFamily: 'lexia-mono, sans-serif',
    },
    subtitle1: {
      fontWeight: 700,
      fontFamily: 'lexia-mono, sans-serif',
    },
    subtitle2: {
      fontFamily: 'lexia-mono, sans-serif',
      fontWeight: 500,
    },
    button: {
      fontFamily: 'lexia-mono, sans-serif',
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
        borderRadius: 0,
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
