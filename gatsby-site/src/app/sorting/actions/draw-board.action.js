import { getSorting } from '../reducers'

import { algo, generate } from '../../workers'

import { generateSortList } from '../../utils/index'
const sortList = data => async (dispatch, getState) => {
  let i = 0
  const {
    draw: { list },
  } = getSorting(getState())
  for (let item of data) {
    const {
      tool: { step, interval },
      draw: { sorting },
    } = getSorting(getState())
    if (!sorting) return
    switch (item.type) {
      case 'LIST_STORE':
        list[item.payload.i] = item.payload.val
        break
      case 'LIST_SWAP':
        const temp = list[item.payload.pos[0]]
        list[item.payload.pos[0]] = list[item.payload.pos[1]]
        list[item.payload.pos[1]] = temp
        break
      default:
        break
    }
    if (i % step === 0 || !step) {
      await new Promise(resolve =>
        setTimeout(() => {
          const {
            draw: { sorting },
          } = getSorting(getState())
          if (!sorting) return
          dispatch({
            type: 'LIST_ACTION',
            pivot: item.payload.pivot,
            boundary: item.payload.boundary || [],
            swap: item.payload.pos || [],
          })
          resolve()
        }, interval)
      )
      i = 0
    }

    i++
  }
  dispatch({ type: 'FINISHED', payload: [...list] })
}

export const generateList = () => (dispatch, getState) => {
  const {
    draw: { worker },
    tool: { size, mode },
  } = getSorting(getState())
  dispatch({
    type: 'LIST_GENERATED',
    payload: generateSortList(size, mode),
  })
}

export const processList = algorithm => (dispatch, getState) => {
  dispatch({ type: 'LIST_PROCESS', payload: algo })
  const {
    draw: { worker, list },
  } = getSorting(getState())
  worker.onmessage = e => {
    dispatch({ type: 'LIST_PROCESSED' })
    dispatch(sortList(e.data))
  }
  worker.postMessage([algorithm, list])
}

export const cancel = () => ({ type: 'CANCELLED' })
