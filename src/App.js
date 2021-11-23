import GlobalStyles from './Global'
import styled from 'styled-components'
import { Route, Switch } from 'react-router-dom'
import { useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { loadCardFB } from './redux/modules/card'

import Header from './components/Header'
import AddWord from './components/AddWord'
import DictionaryList from './components/DictionaryList'

const getLocation = (location) => {
  let current = ''

  if (location === '/') {
    current = '리스트'
  } else if (location === '/add') {
    current = '단어추가'
  } else if (location.indexOf('modify') > -1) {
    current = '단어수정'
  }

  return current
}

function App() {
  const dispatch = useDispatch()
  const loading = useSelector(state => state.card.hasNext)

  useEffect(() => {
    dispatch(loadCardFB(1))
  }, [])

  const { pathname } = useLocation()
  const cardListData = useSelector(state => state.card.list)

  return (
    <Wrap>
      <GlobalStyles />
      <Header location={getLocation(pathname)}/>
      <Switch>
        <Route path="/" exact>
          <DictionaryList cardListData={cardListData} loading={loading} />
        </Route>
        <Route path="/modify/:index" exact>
          <AddWord />
        </Route>
        <Route path="/add" exact>
          <AddWord />
        </Route>
      </Switch>
    </Wrap>
  );
}

const Wrap = styled.div`
`

export default App
