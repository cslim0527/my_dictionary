import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'GowunBatang-Bold';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunBatang-Bold.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  @font-face {
    font-family: 'GowunBatang-Regular';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2108@1.1/GowunBatang-Regular.woff') format('woff');
    font-weight: normal;
    font-style: normal;
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    padding: 16px;
    color: #2f2f2f;
    font-family: 'GowunBatang-Regular';
  }

  ol, ul, li {
    list-style-type: none;
  }

  input[type="text"] {
    height: 42px;
    padding: 6px;
  }

  button {
    font-family: 'GowunBatang-Regular';
    border: 0;
    padding: 6px;
    height: 42px;
    cursor: pointer;
    background-color: transparent;
  }

  b {
    font-family: 'GowunBatang-Bold';
  }

  textarea {
    font-family: 'GowunBatang-Regular';
  }

  .container {
    margin: 0 auto;
    max-width: 425px;
  }
  
`
export default GlobalStyles

