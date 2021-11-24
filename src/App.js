import GlobalStyles from './Global'
import styled from 'styled-components'
import { useEffect, useState } from 'react'
import { Route, Switch } from 'react-router-dom'
import { useLocation } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { loadCardFB } from './redux/modules/card'

import Header from './components/Header'
import EditWord from './components/EditWord'
import DictionaryList from './components/DictionaryList'
import NotFound from './components/NotFound'

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
  const { pathname } = useLocation()
  const cardListData = useSelector(state => state.card.list)
  const loading = useSelector(state => state.card.hasNext)
  const page = useSelector(state => state.card.page) // 현재 로드된 페이지 값
  const [currPage, setPage] = useState(page)

  useEffect(() => {
    dispatch(loadCardFB(currPage))
  }, [currPage])

  return (
    <Wrap>
      <GlobalStyles />
      <Header location={getLocation(pathname)}/>
      <Switch>
        <Route path="/" exact>
          <DictionaryList cardListData={cardListData} loading={loading} setPage={setPage} />
        </Route>
        <Route path="/modify/:index" exact>
          <EditWord />
        </Route>
        <Route path="/add" exact>
          <EditWord />
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
    </Wrap>
  );
}

const Wrap = styled.div`
`

export default App
