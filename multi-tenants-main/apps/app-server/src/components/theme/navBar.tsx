import * as React from 'react'
import Link from 'next/link'

import {
  Box,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Button,
  Tooltip,
  Badge,
  Divider,
} from '@mui/material'
import AdsClickIcon from '@mui/icons-material/AdsClick'
import MenuIcon from '@mui/icons-material/Menu'

import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined'
import UserSetting from './userSetting'

import { StyledAppBar, Branding, StyledToolBar, StyledBox } from '@/styles'

const settings = ['Profile', 'Account', 'Dashboard', 'Logout']

type subMenu = {
  id: number
  name: string
  url: string
}
type MenuList = {
  id: number
  name: string
  url: string
  subMenu?: Array<subMenu>
}
type globals = {
  logo?: string
  brandName: string
  copyRight?: string
}
type NavProps = {
  menus: Array<MenuList>
  globals: globals
}

function SubMenuButton(menu: MenuList) {
  const [anchorElSubMenu, setAnchorElSubMenu] =
    React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElSubMenu(event.currentTarget)
  }

  const handleCloseSubMenu = () => {
    setAnchorElSubMenu(null)
  }
  return (
    <>
      <Button
        onClick={handleOpenNavMenu}
        sx={{ fontSize: 16, color: 'secondary.main' }}
      >
        {menu.name}
      </Button>
      <Menu
        sx={{ minWidth: 100, mt: 6 }}
        id="menu-appbar"
        anchorEl={anchorElSubMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorElSubMenu)}
        onClose={handleCloseSubMenu}
      >
        {menu?.subMenu?.map((m, i) => (
          <React.Fragment key={m.id}>
            <MenuItem>
              <Link href={m.url} style={{ textDecoration: 'none' }}>
                <Typography textAlign="center">{m.name}</Typography>
              </Link>
            </MenuItem>
            {i + 1 != menu?.subMenu?.length && <Divider />}
          </React.Fragment>
        ))}
      </Menu>
    </>
  )
}

function MainNavBar(props: NavProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null,
  )

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <StyledAppBar>
      <Container maxWidth={false}>
        <StyledToolBar disableGutters>
          <AdsClickIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Branding
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
          >
            {props.globals.brandName}
          </Branding>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {props.menus.map((menu) => (
                <MenuItem key={menu.id} onClick={handleCloseNavMenu}>
                  <Link href={menu.url} style={{ textDecoration: 'none' }}>
                    <Typography textAlign="center">{menu.name}</Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          <Box
            sx={{
              flexGrow: 1,
              display: { xs: 'none', md: 'flex' },
              justifyContent: 'flex-end',
            }}
          >
            {props.menus.map((menu) =>
              typeof menu.subMenu !== 'undefined' ? (
                <SubMenuButton key={menu.id} {...menu} />
              ) : (
                <Link
                  href={menu.url}
                  style={{ textDecoration: 'none' }}
                  key={menu.id}
                >
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ fontSize: 16, color: 'secondary.main' }}
                  >
                    {menu.name}
                  </Button>
                </Link>
              ),
            )}
          </Box>
          {/* <Box
            sx={{
              flexGrow: 0,
              paddingLeft: 2,
              display: { xs: 'none', md: 'inline' },
            }}
          >
            <Badge
              color="error"
              overlap="circular"
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
              variant="dot"
            >
              <NotificationsNoneOutlinedIcon />
            </Badge>
          </Box> */}
          {/* <Box
            sx={{
              flexGrow: 0,
              paddingLeft: 2,
              display: { xs: 'none', md: 'inline' },
            }}
            mt={1}
          >
            <Tooltip title="Help">
              <HelpOutlineOutlinedIcon />
            </Tooltip>
          </Box> */}
          <StyledBox flexGrow="0" sx={{ paddingLeft: 2 }}>
            <Tooltip title="My Profile">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt="Remy Sharp"
                  src="/static/images/avatar/me_avatar.PNG"
                />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <UserSetting onClick={handleCloseUserMenu} details={settings} />
            </Menu>
          </StyledBox>
        </StyledToolBar>
      </Container>
    </StyledAppBar>
  )
}
export default MainNavBar
