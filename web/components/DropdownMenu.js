import {Box, Menu} from '@mui/material'
import PropTypes from 'prop-types'

function DropdownMenu(props) {
  const {open = false, anchorElement, handleClose, children, ...others} = props
  return (
    <Menu
      // keepMounted
      anchorEl={anchorElement ? anchorElement.current : null}
      anchorOrigin={{vertical: 'bottom', horizontal: 'left'}}
      transformOrigin={{vertical: 'top', horizontal: 'left'}}
      open={open}
      onClose={handleClose}
      PaperProps={{onMouseLeave: handleClose}}
      {...others}
    >
      <Box>{children}</Box>
    </Menu>
  )
}

DropdownMenu.propTypes = {
  open: PropTypes.bool,
  handleClose: PropTypes.func,
  anchorElement: PropTypes.object,
}

export default DropdownMenu
