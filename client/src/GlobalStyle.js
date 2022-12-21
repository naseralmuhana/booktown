import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body{
    background-color:#303030;
}
main{
    width:80%;
    margin:0 auto;
}
a{
    text-decoration: none;
}
ul{
    list-style: none;
}
body, a, button, input{
    color:#f9f9f9;
}
  
`
export default GlobalStyle
