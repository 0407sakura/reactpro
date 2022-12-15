import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import * as echarts from 'echarts'
export default function Pie(props) {
  useEffect(() => {
    // 调用渲染图
    loadPie()
    return () => {}
  })

  const loadPie = () => {
    var chartDom = document.getElementById(props.id)
    var myChart = echarts.init(chartDom)
    var option

    option = {
      // backgroundColor: '#2c343c',
      backgroundColor: '#1677ff',
      title: {
        text: props.title,
        left: 'center',
        top: 20,
        textStyle: {
          // color: '#ccc'
          color: 'white'
        }
      },
      tooltip: {
        trigger: 'item'
      },
      visualMap: {
        show: false,
        min: 80,
        max: 600,
        inRange: {
          colorLightness: [0, 1]
        }
      },
      series: [
        {
          name: '',
          type: 'pie',
          radius: '55%',
          center: ['50%', '50%'],
          // 调用传入的数据
          data: props.data,
          roseType: 'radius',
          label: {
            // color: 'rgba(255, 255, 255, 0.3)'
            color: 'white'
          },
          labelLine: {
            lineStyle: {
              color: 'rgba(255, 255, 255, 0.3)'
            },
            smooth: 0.2,
            length: 10,
            length2: 20
          },
          itemStyle: {
            color: '#c23531',
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          },
          animationType: 'scale',
          animationEasing: 'elasticOut',
          animationDelay: function (idx) {
            return Math.random() * 200
          }
        }
      ]
    }

    option && myChart.setOption(option)
  }
  return <div id={props.id} style={{ width: 380, height: 300 }}></div>
}
// props类型约束
Pie.propTypes = {
  id: PropTypes.string,
  data: PropTypes.array.isRequired,
  title: PropTypes.string
}
// props默认值
Pie.defaultTypes = {
  id: 'main',
  title: '饼图数据统计'
}
