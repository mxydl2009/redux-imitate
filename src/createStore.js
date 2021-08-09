/**
 * 创建唯一的数据源store
 * @param {*} reducer 根reducer
 * @param {*} preloadedState 预加载的state
 * @param {*} enhancer 增强器
 */
export default function createStore(reducer, preloadedState, enhancer) {
  // ---------------------------------------------
  // 参数类型约束
  if (typeof reducer !== 'function') {
    throw new Error('reducer must be function')
  }
  // 判断enhancer是否传递，是否是函数
  if (typeof enhancer !== 'undefined') {
    // 传递了enhancer
    if (typeof enhancer !== 'function') {
      throw new Error('enhancer must be function')
    }
    // enhancer要创建具有更强功能的store
    return enhancer(createStore)(reducer, preloadedState)
  }
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
    // action约束: 包含type字段的对象
    if (!isPlainObject(action)) { 
      throw new Error('action must be an object')
    }

    if (typeof action.type === 'undefined') {
      throw new Error('action must have type attribute')
    }

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

function isPlainObject(obj) {
  if (typeof obj !== 'object' || obj === null) return false
  let proto = obj
  while(Object.getPrototypeOf(proto) !== null) {
    // 实际上相当于让proto = Object.prototype了
    proto = Object.getPrototypeOf(proto)
  }
  // 相当于判断obj.__proto__ === Object.prototype
  return proto === Object.getPrototypeOf(obj)
}