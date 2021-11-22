import GlobalStyles from './Global'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import { useLocation } from 'react-router'

import Header from './components/Header'
import AddWord from './components/AddWord'

function App() {
  const { pathname } = useLocation()
  const location = {
    '/': '리스트',
    '/add': '단어추가'
  }

  return (
    <Wrap>
      <GlobalStyles />
      <Route path="/">
        <Header location={location[pathname]}/>
      </Route>
      <Route path="/add" exact>
        <AddWord />
      </Route>
    </Wrap>
  );
}

const Wrap = styled.div`

` 

export default App
