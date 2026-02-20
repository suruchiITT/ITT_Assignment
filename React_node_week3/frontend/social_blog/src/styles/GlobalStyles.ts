import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`

*{
box-sizing:border-box;
margin:0;
padding:0;
}

body{
font-family:${props=>props.theme.font};
font-size:${props=>props.theme.fontSize};
background:${props=>props.theme.colors.background};
color:${props=>props.theme.colors.text};
}

input,button,textarea{
font-family:${props=>props.theme.font};
font-size:${props=>props.theme.fontSize};
}

`;
