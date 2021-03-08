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
      <!-- 2. 为ECharts准备一个具备大小（宽高）的Dom -->
      <div id="main" style="width: 750px;height:400px;"></div>
    </el-card>

    <!-- 立方体区域 -->
        <!-- 创建一个外部的容器 -->
    <div class="cube">
        <!-- 引入图片 -->
        <div class="box1">
            <img src="../../assets/img/1.jpg">
        </div>

        <div class="box2">
            <img src="../../assets/img/2.jpg">
        </div>

        <div class="box3">
            <img src="../../assets/img/3.jpg">
        </div>

        <div class="box4">
            <img src="../../assets/img/4.jpg">
        </div>

        <div class="box5">
            <img src="../../assets/img/5.jpg">
        </div>

        <div class="box6">
            <img src="../../assets/img/6.jpg">
        </div>
    </div>
    <!-- 立方体结束 -->
  </div>
</template>

<script>
// 1. 导入 echarts
import echarts from 'echarts'
import _ from 'lodash'

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
  },
  methods: {}
}
</script>

<style lang="less" scoped>
.outer {
  position: relative;
}
.el-card {
  height: 550px;
}
// 立方体样式
html {
            perspective: 800px
        }

        .cube {
            width: 200px;
            height: 200px;
            position: absolute;
            top: 10%;
            right: 8%;
            /* background-color: #bfa; */
            margin: 100px auto;
            /* 设置3d变形效果 */
            transform-style: preserve-3d;
            /* transform: rotateX(45deg) rotateZ(45deg); */
            animation: rotate 15s infinite linear;
            /* transform:rotateY(45deg) scaleZ(2); */
        }

        .cube>div {
            width: 200px;
            height: 200px;
            /* 为元素设置透明效果 */
            opacity: 0.7;
            position: absolute;
        }

        img {
            vertical-align: top;
        }

        .box1 {
            transform: rotateY(90deg) translateZ(100px);
        }

        .box2 {
            transform: rotateY(-90deg) translateZ(100px);
        }

        .box3 {
            transform: rotateX(90deg) translateZ(100px);
        }

        .box4 {
            transform: rotateX(-90deg) translateZ(100px);
        }

        .box5 {
            transform:rotateY(180deg) translateZ(100px);
        }

        .box6 {
            transform: rotateY(0deg) translateZ(100px);
        }

        @keyframes rotate {
            form{
                transform:rotateX(0) rotateZ(0)
            }

            to{
                transform:rotateX(1turn) rotateZ(1turn)
            }
        }
</style>
