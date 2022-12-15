import React, { useEffect } from 'react'
import * as echarts from 'echarts'
export default function Gauge() {
  const loadPic = () => {
    var chartDom = document.getElementById('main')
    var myChart = echarts.init(chartDom)
    var option

    option = {
      backgroundColor: {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 0,
            color: 'red' // 0% 处的颜色
          },
          {
            offset: 1,
            color: 'blue' // 100% 处的颜色
          }
        ],
        global: false // 缺省为 false
      },
      series: [
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 120,
          splitNumber: 12,
          itemStyle: {
            color: '#FFAB91'
          },
          progress: {
            show: true,
            width: 30
          },
          pointer: {
            show: false
          },
          axisLine: {
            lineStyle: {
              width: 30,
              color: [
                [0.5, 'green'], // 0~50% 绿色
                [0.6, 'blue'], // 50~60% 蓝色
                [1.2, 'red'] // 60~90% 红色
              ]
            }
          },
          axisTick: {
            distance: -45,
            splitNumber: 5,
            lineStyle: {
              width: 2,
              // color: '#999'
              color: 'white'
            }
          },
          splitLine: {
            distance: -52,
            length: 14,
            lineStyle: {
              width: 3,
              // color: '#999'
              color: 'red'
            }
          },
          axisLabel: {
            distance: -20,
            // color: '#999',
            color: 'white',
            fontSize: 20
          },
          anchor: {
            show: false
          },
          title: {
            show: false
          },
          detail: {
            valueAnimation: true,
            width: '60%',
            lineHeight: 40,
            borderRadius: 8,
            offsetCenter: [0, '-15%'],
            fontSize: 60,
            fontWeight: 'bolder',
            formatter: '{value} °C',
            color: 'inherit'
          },
          data: [
            {
              value: 80
            }
          ]
        },
        {
          type: 'gauge',
          center: ['50%', '60%'],
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 120,
          itemStyle: {
            color: '#FD7347'
          },
          progress: {
            show: true,
            width: 8
          },
          pointer: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: false
          },
          axisLabel: {
            show: false
          },
          detail: {
            show: false
          },
          data: [
            {
              value: 80
            }
          ]
        }
      ]
    }
    setInterval(function () {
      //   const random = +(Math.random() * 60).toFixed(2)
      let n = 55
      let m = 90
      const random = Math.ceil(Math.random() * (n - m + 1) + m - 1)
      myChart.setOption({
        series: [
          {
            data: [
              {
                value: random
              }
            ]
          },
          {
            data: [
              {
                value: random
              }
            ]
          }
        ]
      })
    }, 2000)

    option && myChart.setOption(option)
  }
  useEffect(() => {
    loadPic()
    return () => {}
  }, [])

  return <div id="main" style={{ width: '100%', height: 500 }}></div>
}
