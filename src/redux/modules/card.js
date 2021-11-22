// card.js

// Actions
const LOAD = 'card/LOAD';
const ADD = 'card/ADD';
const MODIFY = 'card/MODIFY';
const DELETE = 'card/DELETE';

const initialState = {
  list: [
    {
      word: 'ㅎ1ㅎ1',
      explain: 'ㅎ1ㅎ1의 설명글 입니다.',
      example: 'ㅎ1ㅎ1 예시글 입니다.'
    },
    {
      word: 'ㅎ2ㅎ1',
      explain: 'ㅎ1ㅎ1의 설명글 입니다.',
      example: 'ㅎ1ㅎ1 예시글 입니다.'
    },
    {
      word: 'ㅎ3ㅎ1',
      explain: 'ㅎ1ㅎ1의 설명글 입니다.',
      example: 'ㅎ1ㅎ1 예시글 입니다.'
    },
    {
      word: 'ㅎ4ㅎ1',
      explain: 'ㅎ1ㅎ1의 설명글 입니다.',
      example: 'ㅎ1ㅎ1 예시글 입니다.'
    },
    {
      word: 'ㅎ5ㅎ1',
      explain: 'ㅎ1ㅎ1의 설명글 입니다.',
      example: 'ㅎ1ㅎ1 예시글 입니다.'
    }
  ]
}

// Action Creators
export function loadCard(card) {
  return { type: LOAD, card };
}

export function addCard(card) {
  return { type: ADD, card };
}

export function modifyCard(modifyData) {
  return { type: MODIFY, modifyData };
}

export function deleteCard(index) {
  return { type: DELETE, index };
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'card/LOAD':
      return {
        list: state.list
      }

    case 'card/ADD':
      return {
        list: [
          ...state.list,
          action.card
        ]
      }

    case 'card/MODIFY':
      const { modifyData } = action

      state.list[modifyData.index].word = modifyData.card.word
      state.list[modifyData.index].explain = modifyData.card.explain
      state.list[modifyData.index].example = modifyData.card.example

      return {
        list: [
          ...state.list
        ]
      }

    case 'card/DELETE':
      const filterdArr = state.list.filter((_, idx) => {
        return idx !== action.index
      })

      return {
        list: filterdArr
      }

    default: return state;
  }
}
