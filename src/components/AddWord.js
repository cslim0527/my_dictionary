import styled from 'styled-components'
import { useRef, useState } from 'react'
import { useHistory } from 'react-router';

import Button from '@material-ui/core/Button';
const AddWord = () => {
  const history = useHistory()
  const inputsRef = useRef([])

  const inputsObj = {
    word: false,
    explain: false,
    example: false
  }

  const [inputAlert, setInputAlert] = useState(inputsObj)

  const handleClickSubmit = () => {
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

    const isPass = Object.values(newState).some(state => !state)

    if (!isPass) { // 모든 항목을 작성하지 않았다면 단어를 추가 할 수 없음
      return
    }

    console.log('[추가하기 기능 넣을것]', isPass)
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
          <input name="word" onKeyUp={handleInputData} ref={ ref => inputsRef.current[0] = ref } placeholder="추가할 단어를 입력하세요." type="text" id="word" autoComplete="off" />
          <div className="alert-msg"><b>단어를 입력해주세요.</b></div>
        </div>
        <div className={ inputAlert.explain ? 'add-controls show-alert' : 'add-controls' }>
          <label htmlFor="explain">설명</label>
          <textarea name="explain" onKeyUp={handleInputData} ref={ ref => inputsRef.current[1] = ref } placeholder="어떤 의미 인지 설명해주세요." id="explain"></textarea>
          <div className="alert-msg"><b>설명을 입력해주세요.</b></div>
        </div>
        <div className={ inputAlert.example ? 'add-controls show-alert' : 'add-controls' }>
          <label htmlFor="example">예시</label>
          <textarea name="example" onKeyUp={handleInputData} ref={ ref => inputsRef.current[2] = ref } placeholder="어떤 상황에 사용하는지 예를 들어주세요." id="example"></textarea>
          <div className="alert-msg"><b>예시를 입력해주세요.</b></div>
        </div>

        <div className="btn-group">
          <Button onClick={handleClickBack} className="back-btn" variant="contained">뒤로가기</Button>
          <Button onClick={handleClickSubmit} className="add-btn" variant="contained" color="primary">추가하기</Button>
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