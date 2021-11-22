import { useHistory } from 'react-router-dom'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add'
import emptyImg from '../img/empty.png'

import DictionaryItem from './DictionaryCard'


const DictionaryList = ({ cardListData }) => {
  const history = useHistory()

  const handleClickAddBtn = () => {
    history.push('/add')
  }

  return (
    <ListWrap>
      <div className="container">
        <div className="word-list">
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