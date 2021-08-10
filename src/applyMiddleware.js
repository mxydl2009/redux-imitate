/**
 * 
 * @param  {...() => {}} midlleware 中间件数组
 * 每个中间件都是形如(store) => (next) => (action) => { // 具体代码} 的函数 
 * function middlewareExample(store) {
 *   return function(next) {
 *     return function(action) {
*         console.log()
*         next(action)
 *     }
 *   }
 * }
 */
export default function applyMiddleware(...midllewares) {
  // 返回一个函数作为enhancer
  return function(createStore) {
    return function(reducer, preloadedState) {
      // 创建store，用于给中间件函数传递
      const store = createStore(reducer, preloadedState)
      // 阉割版store，只需要有getState和dispatch两个方法即可
      const middlewareAPI = {
        getState: store.getState,
        dispatch: store.dispatch
      }
      // 调用中间件的第一层函数，传递middlewareAPI。chain中的元素是中间件的第二层函数
      const chain = middlewares.map(middleware => middleware(middlewareAPI))
      // 调用compose，获取到第一个中间件的最里层的函数
      const dispatch = compose(...chain)(middlewareAPI.dispatch)
      return {
        ...store,
        dispatch
      }
    }
  }
}

export function compose() {
  const funcs = [...arguments].reverse()
  return function(dispatch) {
    funcs.forEach(func => {
      // 使用dispatch来保存第二层函数调用后的结果（第三层函数了），传递给下一个函数
      dispatch = func(dispatch)
    })
  }
}