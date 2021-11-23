// card.js
import { collection, getDocs, getDoc, addDoc, doc, deleteDoc, updateDoc } from '@firebase/firestore'
import { db } from '../../firebase'

// Actions
const LOAD = 'card/LOAD'
const ADD = 'card/ADD'
const MODIFY = 'card/MODIFY'
const DELETE = 'card/DELETE'

const initialState = {
  page: 1,
  list: [],
  hasNext: false
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

export function deleteCard(cardId) {
  return { type: DELETE, cardId };
}

// middlewares
export function loadCardFB(page) {
  return async (dispatch) => {
    const cardListData = await getDocs(collection(db, 'card'))
    let dbArr = []
    cardListData.forEach(card => {
      const cardObj = {
        id: card.id,
        ...card.data()
      }
      dbArr.push(cardObj)
    })

    const start = page === 1 ? 0 : (page - 1) * 5
    const end = start + 5
    dbArr = dbArr.sort((a, b) => b.datetime - a.datetime).slice(start, end)

    const loadOjb = {
      page: page,
      list: dbArr,
      hasNext: dbArr.length < 5 ? false : true
    }

    dispatch(loadCard(loadOjb))
  }
}

export function addCardFB(newCard) {
  return async (dispatch) => {
    const docRef = await addDoc(collection(db, 'card'), newCard)
    const _doc = await getDoc(docRef)

    const card = {
      id: _doc.id,
      ..._doc.data()
    }

    dispatch(addCard(card))
  }
}

export function modifyCardFB(modifiedCard) {
  return async (dispatch, getState) => {
    const docRef = doc(db, 'card', modifiedCard.id)
    await updateDoc(docRef, modifiedCard.card) 

    const _cardList = getState().card.list
    const index = _cardList.findIndex(card => card.id === modifiedCard.id)
    const modifiedData = {
      index,
      ...modifiedCard
    }
    dispatch(modifyCard(modifiedData))
  }
}

export function deleteCardFB(cardId) {
  return async (dispatch) => {
    const docRef = doc(db, 'card', cardId)

    await deleteDoc(docRef)
    dispatch(deleteCard(cardId))
  }
}

// Reducer
export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case 'card/LOAD':
      return {
        page: action.card.page,
        list: [
          ...state.list,
          ...action.card.list
        ],
        hasNext: action.card.hasNext
      }

    case 'card/ADD':
      let sortedData = [ ...state.list, action.card ]
      sortedData.sort((a, b) => b.datetime - a.datetime)
      return {
        list: sortedData
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
      const filterdArr = state.list.filter((card) => {
        return card.id !== action.cardId
      })

      return {
        list: filterdArr
      }

    default: return state;
  }
}
