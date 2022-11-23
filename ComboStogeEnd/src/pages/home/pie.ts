import * as echarts from 'echarts';

const emptyOption = {
  title: {
    text: '暂无数据',
    x: 'center',
    y: 'center',
    textStyle: {
      color: '#06F',
      fontWeight: 'normal',
      fontSize: 24,
    },
  },
};
/** 图表 */
let barChart: any;
let pieChart: any;
// 柱状图
export const EchartsBar = (name: string, data: { name?: string, value: number }[]) => {
  const chartDom: any = document.getElementById(name);
  if (barChart != null && barChart != '' && barChart != undefined) {
    // lineChart.dispose();
  }
  const option = {
    grid: {
      top: '8%',
      bottom: '15%',
      left: '0%',
      right: '0%',
    },
    tooltip: {
      trigger: 'axis',
      backgroundColor: '#EEEEEE',
      borderWidth: 0,
      boxShow: 'none',
      className: 'echarts-tooltip',
    },
    xAxis: {
      type: 'category',
      boundaryGap: true,
      data: data.map(item => {
        return item.name
      }),
      axisLine: 'none',
      axisTick: 'none',
      axisLabel: {
        formatter: '{value} ',
        color: '#A2A2A2',
        fontSize: 12,
      },
    },
    yAxis: {
      type: 'value',
      min: 0,
      splitLine: 'none',
      axisLabel: 'none',
    },
    series: [
      {
        data: data.map(item => {
          return item.value === 0 ? 0.5 : item.value
        }),
        showBackground: true,
        type: 'bar',
        barWidth: 20,
        itemStyle: {
          color: '#3D5CFF',
          barBorderRadius: [10, 10, 10, 10],
        },
      },
    ],
  };
  barChart = echarts.init(chartDom);
  if (data && data.length > 0) { barChart.setOption(option); }
  else { barChart.setOption(emptyOption) }
  window.addEventListener('resize', () => {
    barChart.resize();
  });
};
// 饼图
export const EchartsPie = (name: string, Data: any[], role?: any) => {
  const chartDom: any = document.getElementById(name);
  if (pieChart != null && pieChart != '' && pieChart != undefined) {
    // lineChart.dispose();
  }
  const option = {
    color: ['#A3B3FF', '#7088FF'],
    // color: ['#3886FF', '#6BA3FA', '#8BB9FF', '#8DB0E3', '#B1CFFF'],
    tooltip: {},
    legend: {
      orient: 'vertical',
      left: 'right'
    },
    series: [
      {
        type: 'pie',
        // roseType: 'area',
        radius: 100,
        data: Data.map(item => {
          return { value: item.value, name: item.name }
        }),
        label: {
          position: 'inside',
          formatter: (b: { name: any; value: number; }) => {
            if (role === 'group-index') {
              return `{a|${b.name}}`
            } else if (b.value <= 0) {
              return ''
            } else {
              return `{a|${b.name}}\n{b|${b.value}}{c|个}`
            }
          },
          rich: {
            a: {
              fontSize: 12,
              fontFamily: 'PingFangSC-Regular, PingFang SC',
              fontWeight: 400,
              lineHeight: 20,
              color: '#FFF',
            },
            b: {
              fontSize: 16,
              fontFamily: 'PingFangSC-Medium, PingFang SC',
              fontWeight: 400,
              color: '#FFF',
            },
            c: {
              fontSize: 10,
              fontFamily: 'PingFangSC-Regular, PingFang SC',
              fontWeight: 400,
              color: '#FFF',
            },
          },
        },
        // ...opt,
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)',
          },
        },
      },
    ],
  };
  pieChart = echarts.init(chartDom);
  if (Data && Data.length > 0) { pieChart.setOption(option); } else { pieChart.setOption(emptyOption) }
  window.addEventListener('resize', () => {
    pieChart.resize();
  });
};