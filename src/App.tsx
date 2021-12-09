import Router from "./Router";
import styled, { createGlobalStyle, css } from "styled-components";
import { ReactQueryDevtools } from "react-query/devtools";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./theme";
import { useState } from "react";
import React from "react";

const ToggleButton = styled.input<{ active: boolean }>`
  z-index: 3;
  width: 60px;
  height: 30px;
  -webkit-appearance: none;
  position: absolute;
  outline: none;
  border: none;
  cursor: pointer;
  right: 20px;
  top: 2vw;
  border-radius: 50px;
  background: white;
  &:before {
    content: "";
    position: absolute;
    width: 25px;
    height: 25px;
    border-radius: 50px;
    background: black;
    left: 5px;
    top: 50%;
    margin-top: -12.5px;
    transition: 0.5s;
  }
  ${(props) =>
    !props.active &&
    css`
      box-shadow: inset 0 0 100px rgba(0, 0, 0, 1);
      &:before {
        left: auto;
        right: 5px;
        background: white;
      }
    `}
`;

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@300;400&display=swap');
html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, menu, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed,
figure, figcaption, footer, header, hgroup,
main, menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure,
footer, header, hgroup, main, menu, nav, section {
  display: block;
}
/* HTML5 hidden-attribute fix for newer browsers */
*[hidden] {
    display: none;
}
body {
  line-height: 1.2;
  font-weight: 300;
  font-family: "source sans prop", sans-serif;
  color: black;
}
menu, ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
* {
  box-sizing: border-box;
}
body {
  font-family: 'Source Sans Pro', sans-serif;
  background-color:${(props) => props.theme.bgColor};
}
a {
  text-decoration:none;
  color: inherit;
}`;
function App() {
  const [isDark, setDark] = useState(true);
  const toggleClick = () => {
    setDark(!isDark);
  };
  return (
    <>
      <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
        <GlobalStyle />
        <Router />
        <ReactQueryDevtools />
        <ToggleButton
          onClick={toggleClick}
          active={isDark}
          type="checkbox"
          id="btn"
        />
      </ThemeProvider>
    </>
  );
}

export default App;
