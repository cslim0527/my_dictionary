import styled from 'styled-components'
import { useRef } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { loadCardFB } from '../redux/modules/card'

import AddIcon from '@material-ui/icons/Add'
import emptyImg from '../img/empty.png'
import SyncLoader from "react-spinners/SyncLoader";

import DictionaryItem from './DictionaryCard'

const DictionaryList = ({ cardListData, loading }) => {

  const dispatch = useDispatch()
  const heightRef = useRef()
  const history = useHistory()
  const page = useSelector(state => state.card.page) // 현재 로드된 페이지 값
  const hasNext = useSelector(state => state.card.hasNext) // 다음 로드될 내용의 유무 상태값

  const handleClickAddBtn = () => {
    history.push('/add')
  }

  // 디바운스 제어 변수
  let isScroll = false

  const handleScrollCardList = (e) => {
    if (!hasNext) { // 다음 로드 할 내용이 없다면 스크롤 이벤트를 실행하지 않음
      return
    }

    const currentScroll = Math.floor(e.target.scrollTop + e.target.clientHeight -83.8)
    const maxScroll = Math.floor(heightRef.current.scrollHeight)
    let percent = currentScroll / maxScroll * 100

    if (percent < 98 || isScroll) {
      return
    }

    isScroll = setTimeout(() => {
      dispatch(loadCardFB(page + 1))

      /*
         FIXME  
         스크롤 마구잡이로 했을때 렌더링이 끝나지 않았는데 
         isScroll 값이 false로 유효성을 통과하게 되어.. 
         렌더링 시간을 벌어줄수 있도록 setTimeout 안에서 setTimeout을 썻는데.. 너무 괴랄해보인다.
         당장에 버그는 해결되었지만 다른 해결방법이 있는지 더 알아보고 픽스하자.
      */
      setTimeout(() => {
        isScroll = false
      }, 1000)

    }, 250)
  }

  return (
    <ListWrap>
      <div onScroll={handleScrollCardList} className="container">
        <div ref={heightRef} className="word-list">
        {
          cardListData.length 
            ? cardListData.map((card, idx) => {
                return <DictionaryItem key={idx} data={card} index={idx} />
              })
            : <div className="empty-word">
                <img src={emptyImg} alt="" />
                아직 등록한 단어가 없어요!
              </div>
        }
        </div>

      { loading ? <div className="spinner"><SyncLoader color="#D1DAFF" /></div> : '' }

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
    position: relative;
    height: calc(100vh - 81px);
    overflow-y: auto;
    max-width: 457px;
    padding: 0 16px;
  }

  .spinner {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 40px 0 20px 0;
  }

  .empty-word {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 50vh;

    img {
      max-width: 180px;
      width: 50%;
    }
  }

  .add-btn {
    max-width: 425px;
    width: 100%;
    position: fixed;
    bottom: 16px;
    text-align: right;

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