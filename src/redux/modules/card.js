// card.js

// Actions
const LOAD = 'card/LOAD';

const initialState = {
  list: [
    {
      word: 'ㅎ1ㅎ1',
      explain: 'ㅎ1ㅎ1의 설명글 입니다.',
      example: 'ㅎ1ㅎ1 예시글 입니다.'
    },
    {
      word: 'ㅎ1ㅎ1',
      explain: 'ㅎ1ㅎ1의 설명글 입니다.',
      example: 'ㅎ1ㅎ1 예시글 입니다.'
    },
    {
      word: 'ㅎ1ㅎ1',
      explain: 'ㅎ1ㅎ1의 설명글 입니다.',
      example: 'ㅎ1ㅎ1 예시글 입니다.'
    },
    {
      word: 'ㅎ1ㅎ1',
      explain: 'ㅎ1ㅎ1의 설명글 입니다.',
      example: 'ㅎ1ㅎ1 예시글 입니다.'
    },
    {
      word: 'ㅎ1ㅎ1',
      explain: 'ㅎ1ㅎ1의 설명글 입니다.',
      example: 'ㅎ1ㅎ1 예시글 입니다.'
    }
  ]
}

// Action Creators
export function loadCard(card) {
  return { type: LOAD, card };
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'card/LOAD':
      return {
        list: state.list
      }

    default: return state;
  }
}
