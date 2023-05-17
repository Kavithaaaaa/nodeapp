import React from 'react'
import { Montserrat } from 'next/font/google'

import {
  ThemeProvider,
  createTheme,
  CssBaseline,
  Container,
  Stack,
  useMediaQuery,
} from '@mui/material'
import { MainContainerStyled } from '@/styles'
import { CacheProvider } from '@emotion/react'
import createEmotionCache from '@/utils/createEmotionCache'
import footerMenu1 from '@/temp-json/footerMenu1.json'
import footerMenu2 from '@/temp-json/footerMenu2.json'
import { useAppSelector } from '@/redux/store'
import { selectMenus } from '@/redux/menuSlice'
import { globalDetails } from '@/redux/globalSlice'
import Footer from './footer'
import MainNavBar from './navBar'

const montserrat = Montserrat({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
})

const clientSideEmotionCache = createEmotionCache()

function Layout(props: any) {
  const storeMenus = useAppSelector(selectMenus)
  const navDetails = useAppSelector(globalDetails)

  const preferedMode = useMediaQuery('(prefers-color-scheme: dark)')

  const CareerTheme = React.useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: montserrat.style.fontFamily,
          button: {
            textTransform: 'none',
          },
        },
        breakpoints: {
          values: {
            xs: 320,
            sm: 600,
            md: 900,
            lg: 1440,
            xl: 1800,
          },
        },
        palette: {
          mode: preferedMode ? 'dark' : 'light',
          primary: {
            main: navDetails.themeColor,
          },
          secondary: {
            main: '#fff',
          },
        },
      }),
    [preferedMode, navDetails, montserrat],
  )

  return (
    <CacheProvider value={clientSideEmotionCache}>
      <ThemeProvider theme={CareerTheme}>
        <CssBaseline />
        <Container style={{ padding: 0 }} maxWidth={false}>
          <MainNavBar menus={storeMenus.menus} globals={navDetails} />
          <main>
            <MainContainerStyled style={{ padding: 0 }} maxWidth={false}>
              <Stack
                direction="column"
                justifyContent="center"
                alignItems="center"
                spacing={6}
                sx={{ backgroundColor: navDetails.backgroundColor }}
              >
                {props.children}
              </Stack>
            </MainContainerStyled>
          </main>
          <Footer
            menus={footerMenu1.menus}
            infoMenus={footerMenu2.menus}
            globals={navDetails}
          />
        </Container>
      </ThemeProvider>
    </CacheProvider>
  )
}

export default Layout
