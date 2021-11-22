import GlobalStyles from './Global'
import styled from 'styled-components'
import { Route } from 'react-router-dom'
import { useLocation } from 'react-router'

import Header from './components/Header'
import AddWord from './components/AddWord'
import DictionaryList from './components/DictionaryList'

const location = {
  '/': '리스트',
  '/add': '단어추가'
}
function App() {
  const { pathname } = useLocation()


  return (
    <Wrap>
      <GlobalStyles />
      <Route path="/">
        <Header location={location[pathname]}/>
      </Route>
      <Route path="/" exact>
        <DictionaryList />
      </Route>
      <Route path="/add" exact>
        <AddWord />
      </Route>
    </Wrap>
  );
}

const Wrap = styled.div`
  position: relative;
`

export default App
