/**
 * 将传入的action creators函数使用dispatch包装（直接调用包装后的action creator就相当于dispatch了action），并返回具有这些action creators的对象
 * @param {*} actionCreators : action creator函数或者是值为action creator函数的对象（可以有多个action creators）
 * 如 { add: function() {}, delete: function() {} }
 * @param {*} dispatch ： store 的 dispatch函数
 */
export default function bindActionCreators(actionCreators, dispatch) {
  const boundActionCreators = {}
  for(let key in actionCreators) {
    (function(key) {
      boundActionCreators[key] = function() {
        dispatch(actionCreators[key]())
      }
    })(key)
    
  }
  return boundActionCreators
}