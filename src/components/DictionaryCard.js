import styled from 'styled-components'

import MoreBtn from './MoreBtn'

const DictionaryCard = ({ data, index }) => {
  return (
    <CardItem className="word-item">
      <MoreBtn index={index} />
      <dt className="word-name">
        <b className="label">단어</b>
        <strong className="content">{ data.word }</strong>
      </dt>
      <dd className="word-explain">
        <b className="label">설명</b>
        <p className="content">{ data.explain }</p>
      </dd>
      <dd className="word-example">
        <b className="label">예시</b>
        <p className="content"><b>{ data.example }</b></p>
      </dd>
    </CardItem>
  )
}

const CardItem = styled.dl`
    padding: 16px;
    border-radius: 6px;
    margin-bottom: 10px;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 10px rgba(0, 0, 0, .2);
    position: relative;
    
    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      .more-btn {
        color: #333;
      }
    }

    .more-btn {
      position: absolute;
      top: 16px;
      right: 16px;
      color: #ccc;
      font-size: 22px;

      button {
        min-width: auto;
        width: 30px;
        height: 30px;
        border-radius: 50%;
        padding: 20px;
      }
    }

    dd {
      margin-top: 10px;
    }

    .label {
      padding: 1px 6px;
      font-size: 12px;
      border-bottom: 1px solid #333;
    }

    .content {
      display: block;
      margin-top: 5px;
    }

    .word-name {
      .label {
        color: #fff;
        border-radius: 4px;
        background-color: #39358c;
      }
    }

    .word-explain {
      font-size: 14px;
    }

    .word-example {
      font-size: 14px;
      
      .content {
        color: #03a9f4;
      }
    }

`

export default DictionaryCard