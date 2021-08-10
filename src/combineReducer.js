/**
 * 
 * @param {*} reducers 值为reducer函数的对象，key会作为根reducer返回的state对象的key
 */
export default function combineReducer(reducers) {
  // 检查reducer的类型是否是函数
  const reducerKeys = Object.keys(reducers)
  for(let i = 0; i < reducerKeys.length; i ++) {
    let key = reducerKeys[i]
    if (typeof reducers[key] !== 'function') {
      throw new Error('reducer must be function')
    }
  }
  // 调用一个个小的reducer，将每个reducer返回的小state对象合并成一个大的state
  return function(state, action) {
    const nextState = {}
    for(let i = 0; i < reducerKeys.length; i ++) {
      let key = reducerKeys[i]
      let reducer = reducers[key]
      nextState[key] = reducer(state[key], action)
      
    }
    return nextState
  }
}