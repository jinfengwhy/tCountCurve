// https://www.ucharts.cn/v2/#/demo/index
// https://www.ucharts.cn/v2/#/document/index
import React, { Component } from 'react';
import Taro from '@tarojs/taro';
import { View, Canvas } from '@tarojs/components';
// import uCharts from '../../js_sdk/u-charts/u-charts.js';
import uCharts from '@qiun/ucharts'
import './index.less';
var uChartsInstance = {};
export default class Index extends Component {
  constructor(){
    super(...arguments)
    this.state = {
      cWidth: 750,
      cHeight: 500,
      pixelRatio: 1,
    }
  }

  componentDidMount(){
    const sysInfo = Taro.getSystemInfoSync();
    const pixelRatio = sysInfo.pixelRatio;
    //这里的第一个 750 对应 css .charts 的 width
    const cWidth = 750 / 750 * sysInfo.windowWidth;
    //这里的 500 对应 css .charts 的 height
    const cHeight = 500 / 750 * sysInfo.windowWidth;
    this.setState({cWidth, cHeight, pixelRatio},()=>this.getServerData());
  }

  getServerData = ()=>{
    this.drawCharts('pluPkAdGMSOzBIdSzmcRqVwdhYQohSML', this.props.data || {});
  }

  drawCharts = (id, data)=>{
    const numbers = this.props.data?.series?.[0]?.data || [];
    const average = parseInt(numbers.reduce((acc, cur) => acc + cur, 0) / numbers.length);
    const { cWidth, cHeight, pixelRatio } = this.state;
    const query = Taro.createSelectorQuery();
    query.select('#' + id).fields({ node: true, size: true }).exec(res => {
      if (res[0]) {
        const canvas = res[0].node;
        const ctx = canvas.getContext('2d');
        canvas.width = res[0].width * pixelRatio;
        canvas.height = res[0].height * pixelRatio;
        uChartsInstance[id] = new uCharts({
          type: "line",
          context: ctx,
          width: cWidth * pixelRatio,
          height: cHeight * pixelRatio,
          categories: data.categories,
          series: data.series,
          pixelRatio: pixelRatio,
          animation: true,
          background: "#FFFFFF",
          color: ["#91CB74","#1890FF","#FAC858","#EE6666","#73C0DE","#3CA272","#FC8452","#9A60B4","#ea7ccc"],
          padding: [15,10,0,15],
          enableScroll: true,
          legend: {},
          xAxis: {
            disableGrid: true,
            scrollShow: true,
            itemCount: 4
          },
          yAxis: {
            gridType: "dash",
            dashLength: 2
          },
          extra: {
            line: {
              type: "curve",
              width: 2,
              activeType: "hollow"
            },
            markLine: numbers.length > 1 ?
              {
                type: "dash",
                dashLength: 2,
                data: [
                  {
                    value: average,
                    lineColor: "#DE4A42",
                    showLabel: true,
                    labelAlign: "right",
                    labelOffsetX: -227,
                    labelOffsetY: 0,
                    labelText: "均值：" + average,
                    // labelFontColor: "#666666",
                    // labelBgColor: "transparent",
                    // labelBgOpacity: 0.8
                  }
                ]
              } : null
          }
        });
      }else{
        console.error("[uCharts]: 未获取到 context");
      }
    });
  }

  touchstart = (e)=>{
    uChartsInstance[e.target.id].scrollStart(e);
  }

  touchmove = (e)=>{
    uChartsInstance[e.target.id].scroll(e);
  }

  touchend = (e)=>{
    uChartsInstance[e.target.id].scrollEnd(e);
    uChartsInstance[e.target.id].touchLegend(e);
    uChartsInstance[e.target.id].showToolTip(e);
  }

  render () {
    const { cWidth, cHeight } = this.state;
    const canvasProps = { style: { width: cWidth, height: cHeight } };
    return (
      <View>
        <Canvas
          {...canvasProps}
          canvas-id="pluPkAdGMSOzBIdSzmcRqVwdhYQohSML"
          id="pluPkAdGMSOzBIdSzmcRqVwdhYQohSML"
          type="2d"
          class="charts"
          onTouchStart={this.touchstart}
          onTouchMove={this.touchmove}
          onTouchEnd={this.touchend}/>
      </View>
    )
  }
}
