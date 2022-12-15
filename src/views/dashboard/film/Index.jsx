import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
export default function Index() {
  // 使用immutable之后比之前调用数据 需要调用方法toJS()先从map对象转为js对象
  const num = useSelector((state) => state.toJS().obj.num)
  const dispatch = useDispatch()
  // console.log(state)
  return (
    <div>
      <div>
        <button
          style={{ padding: 8 }}
          onClick={() => dispatch({ type: 'add', payload: 100 })}
        >
          {num}
        </button>
      </div>
    </div>
  )
}
