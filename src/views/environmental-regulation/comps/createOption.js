import * as echarts from 'echarts';

// export function panel(value, max) { 
// var value = 2.5;
// var max = 5;
// const option = {
//     backgroundColor: 'transparent',
// title: {
//     show: true,
//     text: [
//         '{a|' + (value / max * 100).toFixed(0) + '}',
//         '{b|%}'
//     ].join(''),
//     left: 'center',  // 使用 center 代替固定数值
//     top: '110px',   // 使用 middle 代替固定数值
//     textStyle: {
//         color: '#FFFFFF',
//         fontSize: 36,
//         align: 'center',
//         fontFamily: '"Microsoft Yahei","微软雅黑"',
//         rich: {
//             a: {
//                 fontSize: 36,
//                 color: '#FFFFFF',
//                 fontFamily: '"Microsoft Yahei","微软雅黑"',
//             },
//             b: {
//                 fontSize: 16,
//                 color: '#FFFFFF',
//                 fontFamily: '"Microsoft Yahei","微软雅黑"',
//                 verticalAlign: 'bottom',
//                 baseline: 'bottom',
//             },
//         },
//     },
// },
//     angleAxis: {
//         axisLine: {
//             show: false,
//         },
//         axisLabel: {
//             show: false,
//         },
//         splitLine: {
//             show: false,
//         },
//         axisTick: {
//             show: false,
//         },
//         min: 0,
//         max: 6.666,
//         // boundaryGap: ['0', '10'],
//         startAngle: 225,
//     },
//     radiusAxis: {
//         type: 'category',
//         axisLine: {
//             show: false,
//         },
//         axisTick: {
//             show: false,
//         },
//         axisLabel: {
//             show: false,
//         },
//         data: ['a', 'b', 'c'],
//         z: 10,
//     },
//     polar: {
//         radius: '100%',
//     },
//     series: [
//         {
//             type: 'bar',
//             data: [, , value],
//             z: 1,
//             coordinateSystem: 'polar',
//             barMaxWidth: 15.2,
//             name: '警告事件',
//             roundCap: true,
//             color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
//                 {
//                     offset: 0,
//                     color: '#3165E1',
//                 },
//                 {
//                     offset: 1,
//                     color: '#DAF4FF',
//                 },
//             ]),
//             barGap: '-100%',
//         },
//         //   {
//         //       type: 'bar',
//         //       data: [, , ],
//         //       z: 2,
//         //       coordinateSystem: 'polar',
//         //       barMaxWidth: 24.2,
//         //       name: '警告事件',
//         //       roundCap: true,
//         //       color: '#f00',
//         //       barGap: '-100%',
//         //   },
//         {
//             type: 'bar',
//             data: [, , max],
//             z: 0,
//             silent: true,
//             coordinateSystem: 'polar',
//             barMaxWidth: 15.2,
//             name: 'C',
//             roundCap: true,
//             color: '#839299',
//             barGap: '-100%',
//         },
//         {
//             type: 'pie',
//             labelLine: {
//                 show: false,
//             },
//             z: 21,
//             radius: 5,
//             data: [
//                 {
//                     value: 5,
//                     itemStyle: {
//                         color: new echarts.graphic.LinearGradient(1, 1, 1, 0, [
//                 {
//                     offset: 0,
//                     color: '#3165E1',
//                 },
//                 {
//                     offset: 1,
//                     color: '#DAF4FF',
//                 },
//             ]),
//                     },
//                 },
//             ],
//         },
//         {
//             type: 'pie',
//             labelLine: {
//                 show: false,
//             },
//             z: 10,
//             radius: 8,
//             data: [
//                 {
//                     value: 100,
//                     itemStyle: {
//                         color: '#fff',
//                     },
//                 },
//             ],
//         },
//         {
//             type: 'gauge',
//             radius: '95%',
//             splitNumber: 0,
//             max: 10,
//             detail: {
//                 show: false,
//             },
//             axisLine: {
//                 // 坐标轴线
//                 lineStyle: {
//                     // 属性lineStyle控制线条样式
//                     color: [
//                         [0, 'transparent'],
//                         [1, 'transparent'],
//                     ],
//                     width: 10,
//                     opacity: 0, //刻度背景宽度
//                 },
//             },
//             data: [
//                 {
//                     name: '',
//                     value: value / max*10 ,
//                 },
//             ],
//             axisTick: {
//                 show: false,
//                 lineStyle: {
//                     color: '#c4c6cc',
//                     width: 2,
//                 },
//                 length: 5,
//                 splitNumber: 6,
//             },
//             axisLabel: {
//                 show: false,
//                 color: '#333',
//                 fontSize: 18,
//             },
//             pointer: {
//                 show: true,
//                 length: '70%',
//                 itemStyle: {
//                     color: '#ffffff',
//                 },
//             },
//         },
//         {
//             type: 'pie',
//             radius: ['88%', '82%'],
//             hoverAnimation: false,
//             startAngle: 225,
//             endAngle: 0,
//             data: [
//                 {
//                     name: '',
//                     value: value / 5,
//                     label: {
//                         show: false,
//                     },
//                     labelLine: {
//                         show: false,
//                     },
//                     itemStyle: {
//                         color: 'rgba(0,0,0,0)',
//                     },
//                 },
//                 {
//                     //画中间的图标
//                     name: '',
//                     value: 0,
//                     label: {
//                         position: 'inside',
//                         backgroundColor: '#fff',
//                         borderRadius: 7,
//                         padding: 3,
//                         borderWidth: 0,
//                         borderColor: '#fff',
//                     },
//                 },
//                 {
//                     name: '',
//                     value: 1.33 - value / 5,
//                     label: {
//                         show: false,
//                     },
//                     labelLine: {
//                         show: false,
//                     },
//                     itemStyle: {
//                         color: 'rgba(255,255,255,0)',
//                     },
//                 },
//             ],
//         },
//     ],
//     tooltip: {
//         show: false,
//     },
// };
// return option;

// }

// export function pie(types = []) {
//   var scale = 1;
//   // ships: [{name:..., value:...}]
//   const shipMap = {};
//   types.forEach(item => {
//     shipMap[item.name] = Number(item.value) || 0;
//   });
//   var echartData = [  
//     {
//       value: shipMap["坠落"] || 0,
//       name: "坠落",
//       itemStyle: {
//         color: '#939393'
//       },
//     },
//     {
//       value: shipMap["冒顶"] || 0,
//       name: "冒顶",
//       itemStyle: {
//         color: '#FFFFFF'
//       },
//     },
//     {
//       value: shipMap["触电"] || 0,
//       name: "触电",
//       itemStyle: {
//         color:'#62EFD3'
//       },
//     },
//     {
//       value: shipMap["机械伤害"] || 0,
//       name: "机械伤害",
//       itemStyle: {
//         color:'#62C9EF'
//       },
//     },
//     {
//       value: shipMap["中毒窒息"] || 0,
//       name: "中毒窒息",
//       itemStyle: {
//         color:'#3370EB',
//       },
//     },
//   ];
//   // var total_datas = 0;
//   // for (var i = 0; i < echartData.length; i++) {
//   //   total_datas += echartData[i].value;
//   // }

//   var rich = {
//       yellow: {
//         color: "#ffc72b",
//         fontSize: 15 * scale,
//         // padding: [21, 0],
//         align: "center",
//       },
//       total: {
//         color: "#ffc72b",
//         fontSize: 40 * scale,
//         align: "center",
//       },

//       blue: {
//         color: "#49dff0",
//         fontSize: 16 * scale,
//         align: "center",
//       },
//       hr: {
//         borderColor: "#0b5263",
//         width: "100%",
//         borderWidth: 1,
//         height: 0,
//       },
//     },
//     option = {
//       backgroundColor: "transparent",
//       title: {
//         // text: '{a|合计数量}\n{b|' + total_datas + '}',  // 使用富文本格式
//     textStyle: {
//       rich: {
//         a: {  // 主标题样式
//           color: "#FFFFFF",
//           fontSize: 16,
//           align: 'center',
//           lineHeight: 30
//         },
//         b: {  // 副标题样式
//           fontSize: 32,
//           color: "#C5EDFF",
//           fontWeight: "bold",
//           align: 'center',
//           lineHeight: 40
//         }
//       }
//     },
//     left: '18%',   // 整体水平位置
//     top: '25%',    // 整体垂直位置

//     // 单独调整主标题位置（相对于整体）
//     textVerticalAlign: 'top', // 主标题对齐方式
//     textAlign: 'center',
//       },
//       legend: [
//         // 主图例（第一列）
//         {
//           orient: "vertical",
//           width: 80,
//           height: 150,
//           x: "240px",
//           y: "0px",
//           itemWidth: 15,
//           itemHeight: 15,
//           itemGap: 20,
//           data: echartData
//             .filter(
//               (item) =>
//                 item.name !== "机械伤害" && item.name !== "中毒窒息" 
//             )
//             .map((item) => item.name),
//           formatter: function (name) {
//             const item = echartData.find((d) => d.name === name);
//             return `{name|${name}} {value|${item.value}}`;
//           },
//           textStyle: {
//             rich: {
//             name: {
//                 fontSize: 24,  // 名称放大到18px
//                 color: "#FFFFFF",
//                 padding: [0, 35, 0, 0],  // 增大右侧间距
//                 fontWeight: "normal"
//             },
//             value: {
//                 fontSize: 28,  // 数值放大到22px
//                 color: "#FFFFFF",
//                 fontWeight: "bold",
//                 padding: [0, 0, 0, 10]  // 左侧间距
//             }
//         }
//           },

//         },
//         //(第二列)
//                 {
//           orient: "vertical",
//           width: 80,
//           height: 150,
//           x: "490px",
//           y: "0px",
//           itemWidth: 15,
//           itemHeight: 15,
//           itemGap: 20,
//           data: echartData
//                     .filter(
//                       (item) =>
//                         item.name === "机械伤害" || item.name === "中毒窒息" 
//                     )
//                     .map((item) => item.name),
//           formatter: function (name) {
//             const item = echartData.find((d) => d.name === name);
//             return `{name|${name}} {value|${item.value}}`;
//           },
//           textStyle: {
//             rich: {
//             name: {
//                 fontSize: 24,  // 名称放大到18px
//                 color: "#FFFFFF",
//                 padding: [0, 17, 0, 0],  // 增大右侧间距
//                 fontWeight: "normal"
//             },
//             value: {
//                 fontSize: 28,  // 数值放大到22px
//                 color: "#FFFFFF",
//                 fontWeight: "bold",
//                 padding: [0, 0, 0, 10]  // 左侧间距
//             }
//         }
//           },

//         },
//       ],
//       series: [

//         {
//           clockwise: false,
//           name: "船数量",
//           type: "pie",
//           padAngle:3,
//           itemStyle: {
//             borderWidth: 0,
//             borderColor: "transparent",
//           },
//           emphasis: { scale: false },
//           radius: ["60%", "73%"],
//           center: ["18.5%", "40.5%"], // 调整饼图位置
//           label: false,
//           labelLine: false,
//           data: echartData,
//         },
//       ],
//     };
//   return option
// }

export const createOption1 = (rawData) => {
  const data = rawData || [
    {
      date: "0",
      value: "75",
      value2: "25",
    },
    {
      date: "4",
      value: "125",
      value2: "57",
    },
    {
      date: "8",
      value: "75",
      value2: "32",
    },
    {
      date: "12",
      value: "60",
      value2: "80",
    },
    {
      date: "16",
      value: "175",
      value2: "156",
    },
    {
      date: "20",
      value: "265",
      value2: "134",
    },
  ];
  const dataset = {
    source: data,
    dimensions: ["date", "value", "value2"],
  };

  const color = "#E4F3FF";
  const option = {
    grid: {
      left: "4%",
      top: "16%",
      right: "0",
      bottom: "0",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "#fff",
          width: 1,
        },
      },
      formatter: function (params) {
        // 自定义tooltip内容，不显示x轴信息
        let result = '';
        params.forEach(param => {
          // 根据系列名称设置不同颜色的小圆点
          let dotColor = '#ffffff'; // 默认颜色
          if (param.seriesName === '一氧化碳') {
            dotColor = '#33AEEB';
          } else if (param.seriesName === '二氧化碳') {
            dotColor = '#1BCEBF';
          }

          // 正确获取数值
          let value = '';
          if (param.seriesName === '一氧化碳') {
            value = param.data.value || param.data[1];
          } else if (param.seriesName === '二氧化碳') {
            value = param.data.value2 || param.data[2];
          }

          result += `
            <div style="display: flex; align-items: center; margin: 5px 0;">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${dotColor}; margin-right: 10px;"></span>
              <span style="color: #ffffff; font-size: 20px;">
                ${param.seriesName}    ${value}
              </span>
            </div>
          `;
        });
        return result;
      },
      textStyle: {
        color: "#ffffff",
        fontSize: 20,
      },
      extraCssText: `
        background: #0D1332;
        border-radius: 2px;
        opacity: 0.6;
        padding: 10px;
      `,
    },
    legend: {
      show: true,
      right: 0,
      icon: 'circle', // 小圆点样式
      textStyle: {
        color,
        fontSize: 16,
      },
      itemWidth: 14,      // 圆点大小
      itemHeight: 14,
      x: "450px",
      y: "0px",
      itemGap: 28,
    },

    xAxis: {
      type: "category",
      axisLabel: {
        color,
        fontSize: 18,
      },
    },
    yAxis: {
      show: true, // 显示Y轴
      max(val) {
        return Math.ceil((val.max * 1.25) / 10) * 10;
      },
      axisLabel: {
        show: false, // 👈 不显示Y轴的数值文字
      },
      axisLine: {
        show: false, // 👈 不显示Y轴那条竖线（可选）
      },
      axisTick: {
        show: false, // 👈 不显示刻度线（可选）
      },
      splitLine: {
        show: true, // ✅ 显示横向网格线
        lineStyle: {
          color: "#ffffff", // 横线颜色
          type: [4, 4], // 虚线
          width: 1,
        },
      },
    },
    dataset,
    series: [
      {
        name: "一氧化碳",
        type: "line",
        fontSize: 50,
        smooth: true,
        symbol: "circle",
        symbolSize: 10,
        itemStyle: {
          color: "#33AEEB",
          opacity: 1,
          borderColor: "#ffffff",  // 外圈颜色（白色）
          borderWidth: 1,          // 外圈宽度（建议 2~4）
        },
        emphasis: {
          itemStyle: {
            color: '#ffffff',
            opacity: 1,
          },
        },
        lineStyle: {
          color: "#83DAFF",
          width: 3,
        },
      },
      {
        name: "二氧化碳",
        type: "line",
        smooth: true,
        symbol: "circle",
        symbolSize: 10,
        itemStyle: {
          color: "#1BCEBF",
          opacity: 1,
          borderColor: "#ffffff",  // 外圈颜色（白色）
          borderWidth: 1,          // 外圈宽度（建议 2~4）
        },
        emphasis: {
          itemStyle: {
            color: '#ffffff',
            opacity: 1,
          },
        },
        lineStyle: {
          color: "#62EFD3",
          width: 3,
        },

      },
    ],
  };
  return markRaw(option);
};

export const createOption2 = (rawData) => {
  const data = (rawData || [
    {
      date: "9.1",
      value: "75",

    },
    {
      date: "9.2",
      value: "125",
    },
    {
      date: "9.3",
      value: "75",

    },
    {
      date: "9.4",
      value: "60",

    },
    {
      date: "9.5",
      value: "175",

    },
    {
      date: "9.6",
      value: "265",

    },
    {
      date: "9.7",
      value: "205",

    },
  ]).map((item) => ({
    date: item.date,
    value: Number(item.value),
  }));
  const dataset = {
    source: data,
    dimensions: ["date", "value"],
  };

  const color = "#E4F3FF";
  const option = {
    grid: {
      left: "4%",
      top: "16%",
      right: "0",
      bottom: "0",
      containLabel: true,
    },
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "line",
        lineStyle: {
          color: "#fff",
          width: 1,
        },
      },
      formatter: function (params) {
        // 自定义tooltip内容，不显示x轴信息
        let result = '';
        params.forEach(param => {
          // 根据系列名称设置不同颜色的小圆点
          let dotColor = '#ffffff'; // 默认颜色
          if (param.seriesName === '用电量') {
            dotColor = '#33AEEB';
          }

          // 正确获取数值
          let value = '';
          if (param.seriesName === '用电量') {
            const vFromDataObject = param?.data?.value;
            const vFromDataArray = Array.isArray(param?.data) ? param.data[1] : undefined;
            const vFromValueArray = Array.isArray(param?.value) ? param.value[1] : undefined;
            const vFromValue = !Array.isArray(param?.value) ? param?.value : undefined;
            value = vFromDataObject ?? vFromDataArray ?? vFromValueArray ?? vFromValue ?? '';
          }
          const displayValue = value === '' || value === undefined || value === null || Number.isNaN(value) ? 0 : value;

          result += `
            <div style="display: flex; align-items: center; margin: 5px 0;">
              <span style="display: inline-block; width: 10px; height: 10px; border-radius: 50%; background: ${dotColor}; margin-right: 10px;"></span>
              <span style="color: #ffffff; font-size: 20px;">
                ${param.seriesName}    ${displayValue}${'kWh'}
              </span>
            </div>
          `;
        });
        return result;
      },
      textStyle: {
        color: "#ffffff",
        fontSize: 20,
      },
      extraCssText: `
        background: #0D1332;
        border-radius: 2px;
        opacity: 0.6;
        padding: 10px;
      `,
    },

    xAxis: {
      type: "category",
      axisLabel: {
        color,
        fontSize: 18,
      },
    },
    yAxis: {
      show: false, // 显示Y轴
      max(val) {
        return Math.ceil((val.max * 1.25) / 10) * 10;
      },
      axisLabel: {
        show: false, // 👈 不显示Y轴的数值文字
      },
      axisLine: {
        show: false, // 👈 不显示Y轴那条竖线（可选）
      },
      axisTick: {
        show: false, // 👈 不显示刻度线（可选）
      },
      splitLine: {
        show: true, // ✅ 显示横向网格线
        lineStyle: {
          color: "#ffffff", // 横线颜色
          type: [4, 4], // 虚线
          width: 1,
        },
      },
    },
    dataset,
    series: [
      {
        name: "用电量",
        type: "line",
        encode: { x: "date", y: "value" },
        fontSize: 50,
        smooth: true,
        symbol: "circle",
        symbolSize: 10,
        itemStyle: {
          color: "#3370EB",
          opacity: 1,
          borderColor: "#ffffff",  // 外圈颜色（白色）
          borderWidth: 1,          // 外圈宽度（建议 2~4）
        },
        emphasis: {
          itemStyle: {
            color: '#ffffff',
            opacity: 1,
          },
        },
        lineStyle: {
          color: "#2D61E0",
          width: 3,
        },
      },
    ],
  };
  return markRaw(option);
};
