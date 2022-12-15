import { legacy_createStore as createStore } from 'redux'
import { fromJS } from 'immutable'
const defaultState = fromJS({
  // 验证码校验的key
  key: '',
  obj: {
    num: 100
  }
})
// console.log(defaultState)
function reducer(state = defaultState, actions) {
  switch (actions.type) {
    case 'saveKey':
      // 浅拷贝
      // return { ...state, key: actions.payload }
      // 浅层修改
      return state.update(['key'], () => actions.payload)
    case 'add':
      return state.updateIn(['obj', 'num'], (val) => val + actions.payload)
    default:
      return state
  }
}

export default createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)
