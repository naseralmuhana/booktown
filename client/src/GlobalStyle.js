import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
body{
    background-color:#303030;
    color:#f9f9f9;
}
main{
    width:80%;
    margin:0 auto;
}
a{
    text-decoration: none;
    color: #f9f9f9;
}
ul{
    list-style: none;
}
  
`
export default GlobalStyle
