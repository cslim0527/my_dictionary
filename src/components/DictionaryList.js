import { useHistory } from 'react-router-dom'
import { useSelector } from 'react-redux'
import styled from 'styled-components'
import AddIcon from '@material-ui/icons/Add';

import DictionaryItem from './DictionaryCard'

const DictionaryList = () => {
  const history = useHistory()
  const cardListData = useSelector(state => state.card.list)

  const handleClickAddBtn = () => {
    history.push('/add')
  }

  return (
    <ListWrap>
      <div className="container">
        <div className="word-list">
        {
          cardListData.map((card, idx) => {
            return <DictionaryItem key={idx} data={card} />
          })
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