<template>
  <div class="outer">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据统计</el-breadcrumb-item>
      <el-breadcrumb-item>数据报表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>

      <el-row :gutter="20">
      <el-col :span="14"><div id="main" style="width: 750px;height:400px;"></div></el-col>
      <el-col :span="10"><div id="container" style="width: 500px;height:400px;"></div></el-col>
      </el-row>

      
    </el-card>

  </div>
</template>

<script>
// 1. 导入 echarts
import echarts from 'echarts'
import _ from 'lodash'
import { Graph } from "@antv/x6";

const data = {
  // 节点
  nodes: [
    {
      id: 'node1', // String，可选，节点的唯一标识
      x: 240,       // Number，必选，节点位置的 x 值
      y: 40,       // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: '订单来源', // String，节点标签
      attrs: {
        body: {
          fill: "#2963FF",
          stroke: "none",
          rx: 4,
          ry: 4,
        },
        label: {
          fill: "#B1E9CC",
        },
      },
    },
    {
      id: 'node2', // String，节点的唯一标识
      x: 40,      // Number，必选，节点位置的 x 值
      y: 180,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: '华东', // String，节点标签
      attrs: {
            body: {
              fill: "#18BE6B",
              stroke: "none",
              rx: 4,
              ry: 4,
            },
            label: {
              fill: "#B1E9CC",
            },
          },
    },
    {
      id: 'node3', // String，节点的唯一标识
      x: 140,      // Number，必选，节点位置的 x 值
      y: 180,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: '华南', // String，节点标签
      attrs: {
            body: {
              fill: "#18BE6B",
              stroke: "none",
              rx: 4,
              ry: 4,
            },
            label: {
              fill: "#B1E9CC",
            },
          },
    },
    {
      id: 'node4', // String，节点的唯一标识
      x: 240,      // Number，必选，节点位置的 x 值
      y: 180,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: '华北', // String，节点标签
      attrs: {
            body: {
              fill: "#18BE6B",
              stroke: "none",
              rx: 4,
              ry: 4,
            },
            label: {
              fill: "#B1E9CC",
            },
          },
    },
    {
      id: 'node5', // String，节点的唯一标识
      x: 340,      // Number，必选，节点位置的 x 值
      y: 180,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: '西部', // String，节点标签
      attrs: {
            body: {
              fill: "#18BE6B",
              stroke: "none",
              rx: 4,
              ry: 4,
            },
            label: {
              fill: "#B1E9CC",
            },
          },
    },
    {
      id: 'node6', // String，节点的唯一标识
      x: 440,      // Number，必选，节点位置的 x 值
      y: 180,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: '其他', // String，节点标签
      attrs: {
            body: {
              fill: "#18BE6B",
              stroke: "none",
              rx: 4,
              ry: 4,
            },
            label: {
              fill: "#B1E9CC",
            },
          },
    },
    {
      id: 'node7', // String，节点的唯一标识
      x: 0,      // Number，必选，节点位置的 x 值
      y: 280,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: '江苏', // String，节点标签
      attrs: {
            body: {
              fill: "#18BE6B",
              stroke: "none",
              rx: 4,
              ry: 4,
            },
            label: {
              fill: "#B1E9CC",
            },
          },
    },
    {
      id: 'node8', // String，节点的唯一标识
      x: 100,      // Number，必选，节点位置的 x 值
      y: 280,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: '浙江', // String，节点标签
      attrs: {
            body: {
              fill: "#18BE6B",
              stroke: "none",
              rx: 4,
              ry: 4,
            },
            label: {
              fill: "#B1E9CC",
            },
          },
    },
    {
      id: 'node9', // String，节点的唯一标识
      x: 200,      // Number，必选，节点位置的 x 值
      y: 280,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: '广东', // String，节点标签
      attrs: {
            body: {
              fill: "#18BE6B",
              stroke: "none",
              rx: 4,
              ry: 4,
            },
            label: {
              fill: "#B1E9CC",
            },
          },
    },
    {
      id: 'nodejs', // String，节点的唯一标识
      x: 300,      // Number，必选，节点位置的 x 值
      y: 280,      // Number，必选，节点位置的 y 值
      width: 80,   // Number，可选，节点大小的 width 值
      height: 40,  // Number，可选，节点大小的 height 值
      label: '其他', // String，节点标签
      attrs: {
            body: {
              fill: "#18BE6B",
              stroke: "none",
              rx: 4,
              ry: 4,
            },
            label: {
              fill: "#B1E9CC",
            },
          },
    },
  ],
  // 边
  edges: [
    {
      source: 'node2', // String，必须，起始节点 id
      target: 'node1', // String，必须，目标节点 id
    },
    {
      source: 'node3', // String，必须，起始节点 id
      target: 'node1', // String，必须，目标节点 id
    },
    {
      source: 'node4', // String，必须，起始节点 id
      target: 'node1', // String，必须，目标节点 id
    },
    {
      source: 'node5', // String，必须，起始节点 id
      target: 'node1', // String，必须，目标节点 id
    },
    {
      source: 'node6', // String，必须，起始节点 id
      target: 'node1', // String，必须，目标节点 id
    },
    {
      source: 'node7', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
    },
    {
      source: 'node8', // String，必须，起始节点 id
      target: 'node2', // String，必须，目标节点 id
    },
    {
      source: 'node9', // String，必须，起始节点 id
      target: 'node3', // String，必须，目标节点 id
    },
    {
      source: 'nodejs', // String，必须，起始节点 id
      target: 'node4', // String，必须，目标节点 id
    },
    {
      source: 'nodejs', // String，必须，起始节点 id
      target: 'node5', // String，必须，目标节点 id
    },
    {
      source: 'nodejs', // String，必须，起始节点 id
      target: 'node6', // String，必须，目标节点 id
    },
  ],
};

export default {
  data() {
    return {
      // 需要合并的数据
      options: {
        title: {
          text: '用户来源'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#E9EEF3'
            }
          }
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: [
          {
            boundaryGap: false
          }
        ],
        yAxis: [
          {
            type: 'value'
          }
        ]
      }
    }
  },
  created() {},
  // 此时，页面上的元素，已经被渲染完毕了！
  async mounted() {
    // 3. 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'))

    const { data: res } = await this.$http.get('reports/type/1')
    if (res.meta.status !== 200) {
      return this.$message.error('获取折线图数据失败！')
    }

    // 4. 准备数据和配置项
    const result = _.merge(res.data, this.options)
    
    // 5. 展示数据
    myChart.setOption(result)
    this.init();
  },
  methods: {
    init() {
      new Graph({
        container: document.getElementById("container"),
        width: 800,
        height: 600,
      }).fromJSON(data);
    },
  }
}
</script>

<style lang="less" scoped>
.el-card {
  height: 550px;
}

</style>
