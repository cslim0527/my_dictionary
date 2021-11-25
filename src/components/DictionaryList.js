import styled from 'styled-components'
import { useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import AddIcon from '@material-ui/icons/Add'
import emptyImg from '../img/empty.png'
import SyncLoader from "react-spinners/SyncLoader"

import DictionaryCard from './DictionaryCard'
import Button from '@material-ui/core/Button'

const DictionaryList = ({ cardListData, loading, setPage }) => {
  const history = useHistory()
  const loadingRef = useRef(null)

  const handleClickAddBtn = () => {
    history.push('/add')
  }

  const handleObserver = new IntersectionObserver(([{ isIntersecting }]) => {
    if (isIntersecting) {
      setPage(currPage => currPage + 1)
    }
  })

  useEffect(() => {
    if (cardListData === null) {
      return
    }

    const loadingTarget = loadingRef.current
    loadingTarget && handleObserver.observe(loadingTarget)

    return () => {
      loadingTarget && handleObserver.unobserve(loadingTarget)
    }
  }, [cardListData])

  if (cardListData === null) {
    return (
      <ListWrap>
        <div ref={loadingRef} className='spinner show'><SyncLoader color="#D1DAFF" /></div>
      </ListWrap>
    )
  }

  return (
    <ListWrap>
      <div className="container">
        <div className="word-list">
        {
          cardListData.length
            ? cardListData.map((card, idx) => {
              return <DictionaryCard key={idx} data={card} index={idx} />
            })
            : <div className="empty-box">
                <img src={emptyImg} alt="" />
                <span className="emptry-txt">아직 등록한 단어가 없어요!</span>
                <Button onClick={handleClickAddBtn} variant="outlined">등록하기</Button>
              </div>
        }
        </div>

        <div ref={loadingRef} className={loading && cardListData.length ? 'spinner show' : 'spinner'}><SyncLoader color="#D1DAFF" /></div>

        <div className="add-btn">
          <button onClick={handleClickAddBtn}>
            <AddIcon />
          </button>
        </div>
      </div>


    </ListWrap>
  )
}

const ListWrap = styled.section`
  .container {
    max-width: 457px;
    padding: 0 16px;
  }

  .spinner {
    display: none;
    align-items: center;
    justify-content: center;
    padding: 40px 0 20px 0;

    &.show {
      display: flex;
    }
  }

  .empty-box {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;

    img {
      max-width: 180px;
      width: 50%;
    }

    .emptry-txt {
      margin-bottom: 20px;
    }
  }

  .add-btn {
    max-width: 425px;
    width: 100%;
    position: fixed;
    bottom: 16px;
    text-align: right;
    left: 50%;
    transform: translateX(-50%);
    padding: 0px 28px;
    
    button {
      color: #39358c;
      width: 49px;
      height: 49px;
      border-radius: 50%;
      line-height: 49px;
      background-color: #fff;
      border: 1px solid #39358c;

      /* background-color: #39358c; */

      &:hover {
        color: #fff;
        background-color: #27246b;
      }
    }
  }
`

export default DictionaryList