import styled from 'styled-components'
import { useRef, useState } from 'react'
import { useHistory, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux'
import { addCard, modifyCard } from '../redux/modules/card'

import Button from '@material-ui/core/Button';
const AddWord = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const inputsRef = useRef([])
  const params = useParams()
  const cardList = useSelector(state => state.card.list)
  const carData = cardList.filter((card, index) => {
      if (Number(params.index) === index) {
        return card
      }
    })[0]


  const inputsObj = {
    word: false,
    explain: false,
    example: false
  }

  const [inputAlert, setInputAlert] = useState(inputsObj)

  const handleClickAdd = () => {
    console.log('add')

    const inputs = inputsRef.current
    let newState = {}
    inputs.forEach(input => {
      if ( input.value.trim() === '' ) {
        newState = {
          ...newState,
          [input.name]: true
        }
      } else {
        newState = {
          ...newState,
          [input.name]: false
        }
      }
    })

    setInputAlert(newState)

    const isEmpty = Object.values(newState).some(state => state === true)

    if (isEmpty) { // 모든 항목을 작성하지 않았다면 단어를 추가 할 수 없음
      return
    }

    const newCardData = inputs.reduce((obj, data) => {
       obj[data.name] = data.value.trim()
       return obj
    }, {})

    dispatch(addCard(newCardData))

    history.push('/')
  }

  const handleClickModify = () => {
    const inputs = inputsRef.current
    let newState = {}
    inputs.forEach(input => {
      if ( input.value.trim() === '' ) {
        newState = {
          ...newState,
          [input.name]: true
        }
      } else {
        newState = {
          ...newState,
          [input.name]: false
        }
      }
    })

    setInputAlert(newState)

    const isEmpty = Object.values(newState).some(state => state === true)

    if (isEmpty) { // 모든 항목을 작성하지 않았다면 단어를 추가 할 수 없음
      return
    }

    const newCardData = inputs.reduce((obj, data) => {
       obj[data.name] = data.value.trim()
       return obj
    }, {})

    const modifyObj = {
      card: newCardData, 
      index: params.index
    }

    dispatch(modifyCard(modifyObj))

    history.push('/')
  }

  //  TODO  직전 state를 참조할 수 있는 prevValue 매개변수의 개념에 대해서 좀 더 알아보고 정리하자.
  const handleInputData = (e) => {
    const { value, name } = e.target
    setInputAlert(prevValue => {
        return {
          ...prevValue,
          [name]: value.trim().length ? false : true
        }
      })
  }

  const handleClickBack = () => {
    history.push('/')
  }

  return (
    <AddWrap>
      <div className="container">
        <div className={ inputAlert.word ? 'add-controls show-alert' : 'add-controls' }>
          <label htmlFor="word">단어</label>
          <input name="word" defaultValue={carData ? carData.word : ''} onKeyUp={handleInputData} ref={ ref => inputsRef.current[0] = ref } placeholder="추가할 단어를 입력하세요." type="text" id="word" autoComplete="off" />
          <div className="alert-msg"><b>단어를 입력해주세요.</b></div>
        </div>

        <div className={ inputAlert.explain ? 'add-controls show-alert' : 'add-controls' }>
          <label htmlFor="explain">설명</label>
          <textarea name="explain" defaultValue={carData ? carData.explain : ''} onKeyUp={handleInputData} ref={ ref => inputsRef.current[1] = ref } placeholder="어떤 의미 인지 설명해주세요." id="explain"></textarea>
          <div className="alert-msg"><b>설명을 입력해주세요.</b></div>
        </div>

        <div className={ inputAlert.example ? 'add-controls show-alert' : 'add-controls' }>
          <label htmlFor="example">예시</label>
          <textarea name="example" defaultValue={carData ? carData.example : ''} onKeyUp={handleInputData} ref={ ref => inputsRef.current[2] = ref } placeholder="어떤 상황에 사용하는지 예를 들어주세요." id="example"></textarea>
          <div className="alert-msg"><b>예시를 입력해주세요.</b></div>
        </div>

        <div className="btn-group">
          <Button onClick={handleClickBack} className="back-btn" variant="contained">뒤로가기</Button>
          {
            carData 
              ? <Button onClick={handleClickModify} className="add-btn" variant="contained" color="primary">변경하기</Button>
              : <Button onClick={handleClickAdd} className="add-btn" variant="contained" color="primary">추가하기</Button>
          }
          
       
          
        </div>
      </div>
    </AddWrap>
  )
}

const AddWrap = styled.section`
  .add-controls {
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;

    label {
      margin-bottom: 10px;
    }

    input {
    }

    textarea {
      resize: none;
      min-height: 120px;
    }

    input,
    textarea {
      padding: 12px 10px;
      font-size: 14px;
    }

    .alert-msg {
      display: none;
      font-size: 12px;
      padding: 4px;
      color: #ff5722;
    }

    &.show-alert {
      .alert-msg {
        display: block;
      }
    }
  }

  .btn-group {
    display: flex;

    button {
      flex: 1;

      &:first-child {
        margin-right: 10px;
      }
    }

    .add-btn {
      background-color: #39358c;
    }
  }

`

export default AddWord