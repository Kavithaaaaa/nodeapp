import * as React from 'react'
import { useRouter } from 'next/router'
import Divider from '@mui/material/Divider'
import Typography from '@mui/material/Typography'
import {
  ListItemIcon,
  MenuItem,
  Stack,
  ThemeProvider,
  createTheme,
} from '@mui/material'
import { Logout, Settings } from '@mui/icons-material'
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined'
import TextSnippetOutlinedIcon from '@mui/icons-material/TextSnippetOutlined'

type userSettingProps = {
  onClick: () => void
  details: Array<string>
}

const MenuItemTheme = createTheme({
  components: {
    MuiMenuItem: {
      styleOverrides: {
        root: {
          fontSize: '14px',
        },
      },
    },
  },
})
const UserSetting = (props: userSettingProps) => {
  const router = useRouter()
  return (
    <ThemeProvider theme={MenuItemTheme}>
      <MenuItem onClick={props.onClick}>
        <Stack>
          <Typography
            variant="inherit"
            align="left"
            fontSize={12}
            fontWeight={700}
          >
            Udaya Kumara K
          </Typography>
          <Typography variant="caption" display="block" gutterBottom>
            udaya.k@happiestminds.com
          </Typography>
        </Stack>
      </MenuItem>
      <Divider />
      <MenuItem onClick={() => router.push('/landing')}>
        <ListItemIcon>
          <Logout fontSize="small" />
        </ListItemIcon>
        Logout
      </MenuItem>
    </ThemeProvider>
  )
}

export default UserSetting
