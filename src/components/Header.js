import styled from 'styled-components'
import logo from '../img/logo.png'

const Header = ({ location }) => {
  console.log(location)
  return (
    <HeaderWrap>
      <div className="container">
        <h1 className="logo">
          <img src={logo} alt="나만의 사전" />
          <span>_Dictionary</span>
        </h1>

        <div className="location">
          <b>{ location }</b>
        </div>
      </div>
    </HeaderWrap>
  )
}

const HeaderWrap = styled.header`
  margin-bottom: 20px;

  .container {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  .logo {
    display: flex;
    font-size: 20px;
    align-items: center;

    img {
      width: 28px;
      margin-right: 4px;
    }
  }
`

export default Header