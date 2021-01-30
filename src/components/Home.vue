<template>
  <el-container class="home-container">
    <!-- 头部区域 -->
    <el-header>
      <div class="tab-left">
        <img src="../assets/img/favicon.jpg" alt="" />
        <span>车载图书管理系统</span>
      </div>
      <div class="tab-right">
        <i class="iconfont">&#xe6a2;</i>
        <i class="iconfont">&#xe616;</i>
        <i class="iconfont">&#xe632;</i>
        <i id="message" class="iconfont">&#xe64b;
          <p></p>
        </i>

        <div class="display">
          <img src="../assets/img/touxiang.jpg">
        <!-- <span>admin</span> -->
        <i class="iconfont">&#xe607;</i>
        <div class="hid">
        <div><i class="iconfont">&#xe60f;</i>
        <span>个人主页</span>
        </div>
        <div><i class="iconfont">&#xe628;</i>
        <span>设置</span>
        </div>
        <div><i class="iconfont">&#xe657;</i>
        <span>帮助</span>
        </div>
        <div @click="logout"><i class="iconfont">&#xe603;</i>
        <span>退出</span>
        </div>
        </div>


        </div>
        <!-- <div @click="logout"><i class="iconfont">&#xe603;</i>
        <span>退出系统</span>
        </div> -->
        
      </div>
      <!-- <el-button type="info" @click="logout">退出</el-button> -->
    </el-header>
    <!-- 页面主体区域 -->
    <el-container>
      <!-- 侧边栏 -->
      <el-aside :width="isCollapse ? '64px' : '200px'">
        <div class="toggle-button" @click="toggleCollapse"><i id="iconf" class="iconfont">&#xe60d;</i></div>
        <!-- 侧边栏菜单区 -->
        <el-menu background-color="#313743"
          text-color="#fff"
          active-text-color="#359BFF" unique-opened :collapse="isCollapse"
          :collapse-transition="false" :router="true" :default-active="activePath">
          <!-- 一级菜单 -->
          <el-submenu :index="item.id + ''" v-for="item in menulist" :key="item.id">
            <!-- 一级菜单模板区域 -->
            <template slot="title">
              <!-- 图标 -->
              <i :class="iconsObj[item.id]"></i>
              <span>{{item.authName}}</span>
            </template>
            <!-- 二级菜单模板区域 -->
            <el-menu-item :index="'/' + subItem.path" v-for="subItem in item.children" 
            :key="subItem.id" @click="saveNavstate('/' + subItem.path)">
              <template slot="title">
                <!-- 图标 -->
              <i class="el-icon-menu"></i>
              <span>{{subItem.authName}}</span>
            </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 右侧主体区域 -->
      <el-main>
        <!-- 子路由welcome -->
        <router-view/>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
let i=0;
export default {
  data() {
    return {
      menulist: [],
      iconsObj: {
        '125':'iconfont icon-users',
        '103':'iconfont icon-tijikongjian',
        '101':'iconfont icon-shangpin',
        '102':'iconfont icon-danju',
        '145':'iconfont icon-baobiao'
      },
      isCollapse: false,
      activePath: '',
    }
  },
  created() {
      this.getMenuList()
      this.activePath = window.sessionStorage.getItem('activePath')
  },
  methods: {
    logout() {
      if(window.confirm('确认退出登录操作？')){
        window.sessionStorage.clear()
      this.$router.push('/login')
      this.$message.success('退出登录成功')
      }else{
        this.$message.info('操作已取消')
      }
    },
    async getMenuList() {
          const { data: res } = await this.$http.get('menus')
          if (res.meta.status !==200) return this.$message.error(res.meta.msg)
          this.menulist = res.data
    },
    toggleCollapse() {
        this.isCollapse = !this.isCollapse
        const  p = document.getElementById('iconf');
        i++
        if(i%2){
        p.innerHTML = '&#xe65b;';//&#xe7b0;
        }else{
            p.innerHTML = '&#xe60d;';
        }
        
    },
    saveNavstate(activePath) {
      window.sessionStorage.setItem('activePath', activePath)
      this.activePath = activePath
    }
  },
}
</script>

<style lang="less" scoped>
.home-container {
  height: 100%;
}
.el-header {
  background-color: #363c3f;
  display: flex;
  justify-content: space-between;
  padding-left: 0;
  align-items: center;
  color: #fff;
  font-size: 20px;
  .tab-left {
    display: flex;
    height: 78px;
    align-items: center;
    img {
      height: 77%;
      border-radius: 50%;
      margin-left: 10px;
    }
    span {
      margin-left: 15px;
    }
  }
  .tab-right {
    display: flex;
    line-height: 78px;
    align-items: center;
    i {
      cursor: pointer;
      margin-left: 10px;
    }
    //通知消息右上角红色圆圈
    #message {
      position: relative;
      p {
        position: absolute;
        top: 12px;
        right: -3px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background-color: #ED3F14;
        
      }
    }

    span {
      font-size: 13px; 
    }
    div {
      // background-color: #fff;
      margin-left: 30px;
      cursor: pointer;
      padding: 0;

      i {
      font-size: 1px;
      // margin-right: 2px;
      margin: 0;
      }
     
      img {
      height: 50px;
      vertical-align: middle;
      border-radius: 50%;
      margin-right: 3px;
      margin-left: 10px;
      }
    }
    .display {
      position: relative;
    &:hover .hid{
      height: 170px;
    }
      .hid {
        position: absolute;
        z-index: 2;
        width: 110px;
        height: 0px;
        overflow: hidden;
        border-radius: 10px;
        background-color: #363C3F;
        right: 4px;
        top: 70px;
        text-align: left;
        margin: 0;
        transition: all 1s;

        div{
          margin: 5px 0 0 0;
          padding: 0;
          height: 35px;
          line-height: 35px;
          &:hover {
            background-color: #40485D;
          }
          i {
            margin: 0 10px;
          }
        }
      }
    }
  }
}
.el-aside {
  background-color: #313743;
  .el-menu {
    border-right: none;
  }
}
.el-main {
  background-color: #e9edf1;
}
.iconfont {
  margin-right: 10px;
}
.toggle-button {
  background-color: #465166;
  color: #fff;
  text-align: center;
  // font-size: 1px;
  line-height: 24px;
  // letter-spacing: 0.2em;
  cursor: pointer;
}
// style="cursor: pointer" 让鼠标的I变成手形状
</style>