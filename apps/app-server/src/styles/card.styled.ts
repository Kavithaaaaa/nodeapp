import { styled } from '@mui/material';
import { Box, Card, CardMedia, Typography } from "@mui/material";
import ResponsiveSize from '@/utils/responsiveSizes'

export const Styledtenentcard = styled(Card)({
         //   maxWidth: "428px",
         //   minWidth:'427px',
         width:'auto',
        maxHeight: "232px",
        background: "#FFFFFF 0% 0% no-repeat padding-box",
   })

   export const StyledCardMedia= styled(CardMedia)({
    width:"428px",
    height:"152px"
   })

   export const StyledTypograpghname=styled(Typography)({
    height: "18px",
    textAlign: "left",
     fontSize: ResponsiveSize(18),
    color: "#222222",
    opacity: "1",
    marginBottom: "8px",
   })

   export const StyledBoxtype =styled(Box)({
    width: "fit-content",
    height: "20x",
    background: "#FFFFFF00 0% 0% no-repeat padding-box",
    border: "1px solid #E78F24",
    // display:'contents',
    borderRadius: "3px",
    opacity: "1",
   })

   export const StyledTypograpghtype=styled(Typography)({
     height: "auto",
     fontWeight: 'medium',
     fontSize: ResponsiveSize(11),
     letterSpacing: "0px",
     textTransform: 'capitalize',
     color: "#222222",
     opacity: "1",
     margin: "0px 6px 0px 6px",
   })
