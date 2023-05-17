import styled from '@emotion/styled'
import {
  Box,
  AppBar,
  Container,
  TableCell,
  Toolbar,
  Typography,
  Icon,
  Stack,
} from '@mui/material'
import { boxProps, divProps } from '@/types/theme'
import ResponsiveSize from '@/utils/responsiveSizes'

export const Branding = styled(Typography)`
    mr: 2;
    display: { xs: none, md: flex };
    font-weight: 700;
    letter-spacing: .1rem;
    color: inherit;
    text-decoration: none;

` as typeof Typography

export const FooterBox = styled(Box)`
  height: auto;
  background-color: #fffff ;
  padding-top: 1rem;
  padding-bottom: 1rem;
  position: relative;
  color: #42423d;
` as typeof Box

export const MainContainerStyled = styled(Container)`
  min-height: 500px;
  margin-top: 80px;
`

export const StyledAppBar = styled(AppBar)`
  height: 80px;
  width: 100%;
` as typeof AppBar

export const StyledBox = styled(Box)((props: boxProps) => ({
  flexGrow: props.flexGrow ?? props.flexGrow,
  paddingLeft: props.paddingLeft ?? props.paddingLeft,
})) as typeof Box

export const StyledToolBar = styled(Toolbar)`
  min-height: 40px;
  height: 80px;
` as typeof Toolbar

export const StyledDiv = styled('div')((props: divProps) => ({
  display: props.display ? props.display : 'flex',
}))


export const CapitalTypography = styled(Typography)`
  text-transform: uppercase;
` as typeof Typography

export const PageBox = styled(Box)`
  padding: ${ResponsiveSize(32)} ${ResponsiveSize(40)};
  margin: 0;
  width: 100%;
`