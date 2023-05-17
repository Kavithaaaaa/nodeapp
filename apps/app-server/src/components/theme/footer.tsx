import { Box, Container, Divider, List, ListItem, Stack } from '@mui/material'
import { Branding, FooterBox, StyledDiv } from '@/styles'
import AdsClickIcon from '@mui/icons-material/AdsClick'
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';
import styled from '@emotion/styled'
import Link from 'next/link'

const Item = styled('div')`
  text-align: center;
  color: #222222;
`

type MenuList = {
  id: number
  name: string
  url: string
}
type globals = {
  logo?: string
  brandName: string
  copyRight?: string
}
type footerProps = {
  menus: Array<MenuList>
  infoMenus: Array<MenuList>
  globals: globals
}

function Footer(props: footerProps) {
  const { globals, menus, infoMenus } = props

  return (
    <FooterBox component="footer" sx={{ display: { xs: 'none', md: 'flex' } 
    // ,backgroundColor:'#FFFFFF', color :'red'
   , borderTop:'1px solid #00000029'
    }}>
      <Container maxWidth={false}
      //  sx={{backgroundColor:'#FFFFFe'}}
      > <Box sx={{ padding: '0px 0px' }}>
      <p>
         Powered by
         {/* <strong>{globals.brandName}</strong> */}
      </p>
    </Box>
    
        <Stack
          direction={{ md: 'column', lg: 'row' }}
          justifyContent="space-between"
          alignItems={{ md: 'stretch', lg: 'flex-start' }}
          spacing={0}
        >
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            <StyledDiv display="flex">
              {/* <AdsClickIcon
                sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }}
              /> */}
              <Branding variant="h6" noWrap component="a" href="/">
                {globals.brandName}
              </Branding>
            </StyledDiv>
            <div>
              {/* <p>Copyright 2023 - {globals.copyRight}</p> */}
            </div>
          </Stack>
        
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-end"
            spacing={0}
          >
            <Box sx={{display:'flex',flexDirection:'colum'}}>
              <List
                component="nav"
                sx={{ width: '100%', display: 'flex' }}
                aria-label="footer-menu"
              >
                {/* {menus.map((menu, i) => (
                  <ListItem
                    alignItems="center"
                    sx={{ width: 'auto' }}
                    key={menu.id}
                  >
                    <Link href={menu.url} style={{ textDecoration: 'none' }}>
                      <Item>{menu.name}</Item>
                    </Link>
                    {i  != menus.length && (
                      <Divider
                        orientation="vertical"
                        sx={{
                          backgroundColor: '#ffffff',
                          height: '20px',
                          marginTop: '5px',
                          marginLeft: '25px',
                        }}
                        flexItem
                      />
                    )}
                    
                  </ListItem>
                ))} */}
              <ListItem
                    alignItems="center"
                    sx={{ width: 'auto',  }}
                  
                  >
                        <Link href={""} style={{ textDecoration: 'none'}}>
                    <div style={{color:'black'}}>  Call:1-800-BEST-JOB</div> 
                    </Link>
                      <Divider
                        orientation="vertical"
                        sx={{
                          backgroundColor: '#ffffff',
                          height: '20px',
                          marginTop: '5px',
                          marginLeft: '25px',
                          marginRight:'25px',
                        }}
                        flexItem
                      />
                    <Link href={""} style={{ textDecoration: 'none'}}>
                    <div style={{color:'black',}}>  Email:<a style={{color:'#422D87'}}>info@careerteam.com</a></div> 
                    </Link>
                      <Divider
                        orientation="vertical"
                        sx={{
                          backgroundColor: '#ffffff',
                          height: '20px',
                          marginTop: '5px',
                          marginLeft: '25px',
                          
                        }}
                        flexItem
                      />
                    <Link href={""} style={{ textDecoration: 'none',
                  marginRight:'10px', marginLeft:'10px'}}>
                      <Item>

                      <YouTubeIcon sx={{color:'#422D87'}}/> 
                      </Item>
                    </Link>
                    <br/>
                    <Link href={""} style={{ textDecoration: 'none', marginRight:'10px' }}>
                      <Item><LinkedInIcon sx={{color:'#422D87'}}/> 
                      </Item>
                    </Link>
                    <br/>
                    <Link href={""} style={{ textDecoration: 'none', marginRight:'10px' }}>
                      <Item><FacebookIcon sx={{color:'#422D87'}}/></Item>
                    </Link>
                    <Link href={""} style={{ textDecoration: 'none', marginRight:'10px' }}>
                      <Item><TwitterIcon sx={{color:'#422D87'}}/></Item>
                    </Link>
                  </ListItem>
              </List>
            
            </Box>

          </Stack>
        </Stack>
        <Divider />
        <Stack
          direction={{ md: 'column', lg: 'row' }}
          justifyContent="space-between"
          alignItems={{ md: 'stretch', lg: 'flex-start' }}
          spacing={0}
        >
          <Stack
            direction="column"
            justifyContent="flex-start"
            alignItems="flex-start"
            spacing={1}
          >
            <StyledDiv display="flex">
              <p>  ©️ 2023 Career Team LLC All rights reserved     </p>
            </StyledDiv>
         
          </Stack>
        
          <Stack
            direction="column"
            justifyContent="center"
            alignItems="flex-end"
            spacing={0}
          >
            <Box>
              <List
                component="nav"
                sx={{ width: '100%', display: 'flex',height:'53px' }}
                aria-label="footer-menu"
              >
                {infoMenus.map((menu, i) => (
                  <ListItem
                    alignItems="center"
                    sx={{ width: 'auto',color:'#422D87'
                  }}
                    key={menu.id}
                  >
                    <Link href={menu.url} style={{ textDecoration: 'none'  }}>
                      {/* <Item > */}
                      <p >{menu.name}</p>
                      {/* </Item> */}
                    </Link>
                    {i != menus.length && (
                      <Divider
                        orientation="vertical"
                        sx={{
                          backgroundColor: '#ffffff',
                          height: '20px',
                          marginTop: '5px',
                          marginLeft: '25px',
                        }}
                        flexItem
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            </Box>
          </Stack>
        </Stack>
      </Container>
    </FooterBox>
  )
}
export default Footer
