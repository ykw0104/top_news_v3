<template>
  <div class="fans-container">
    <body>
      <!-- 为 ECharts 准备一个定义了宽高的 DOM -->
      <div ref="mainDiv" style="width: 600px;height:400px;"></div>

      <map-demo />
    </body>
  </div>
</template>

<script>
import { defineComponent, onMounted, ref } from "vue";

import MapDemo from "./components/map-demo.vue";

import * as echarts from "echarts";

export default defineComponent({
  name: "FansIndex",
  components: { MapDemo },
  setup() {
    const mainDiv = ref(null);

    onMounted(() => {
      var myChart = echarts.init(mainDiv.value);

      // 指定图表的配置项和数据
      var option = {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    });

    return {
      mainDiv,
    };
  },
});
</script>

<style lang="scss" scoped></style>
