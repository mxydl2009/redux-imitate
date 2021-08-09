/**
 * 创建唯一的数据源store
 * @param {*} reducer 根reducer
 * @param {*} preloadedState 预加载的state
 * @param {*} enhancer 增强器
 */
export default function createStore(reducer, preloadedState, enhancer) {
  // ---------------------------------------------
  // 创建存储状态的对象
  const currentState = preloadedState || {}

  // 存放监听器
  const listeners = []

  // 获取最新的state
  function getState() {
    return currentState
  }

  // 分发action
  function dispatch(action) {
    currentState = reducer(currentState, action)
    // 触发监听器
    for (let i = 0; i < listeners.length; i ++) {
      const listener = listeners[i]
      listener()
    }
  }

  // 订阅state的更新
  function subscribe(listener) {
    listeners.push(listener)
  }
  return {
    getState,
    dispatch,
    subscribe
  }
}