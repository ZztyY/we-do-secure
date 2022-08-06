<template>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b" @open="handleOpen" @close="handleClose" :collapse="isCollapse">
    <h3>{{ isCollapse ? 'WDS' : 'We Do Secure'}}</h3>
    <el-menu-item @click="clickMenu(item)" v-for="item in noChildren" :index="item.path" :key="item.path">
        <i :class="'el-icon-' + item.icon"></i>
        <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu v-for="(item) in hasChildren" :index="item.label" :key="item.label">
        <template slot="title">
          <i :class="'el-icon-' + item.icon"></i>
          <span slot="title">{{ item.label }}</span>
        </template>
        <el-menu-item-group v-for="(subItem) in item.children" :key="subItem.path">
          <el-menu-item @click="clickMenu(subItem)" :index="subItem.label">
            <i :class="'el-icon-' + subItem.icon"></i>
            {{ subItem.label }}
          </el-menu-item>
        </el-menu-item-group>
    </el-submenu>
    </el-menu>
</template>

<style lang="less" scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-menu {
    height: 100%;
    border: none;
    h3 {
      color: #fff;
      text-align: center;
      line-height: 48px;
    }
  }
</style>

<script>
  export default {
    data() {
      return {
        menu: [
          {
            path: '/overview',
            name: 'overview',
            label: 'overview',
            icon: 'discover',
            url: '/overview'
          },
          {
            label: 'my policies',
            icon: 'document',
            children: [
              {
                path: '/home-policies',
                name: 'home-policies',
                label: 'home policies',
                icon: 'document',
                url: '/home-policies'
              },
              {
                path: '/auto-policies',
                name: 'auto-policies',
                label: 'auto policies',
                icon: 'document',
                url: '/auto-policies'
              }
            ]
          },
          {
            path: '/pay',
            name: 'pay',
            label: 'payments & billing',
            icon: 'wallet',
            url: '/pay'
          },
          {
            label: 'assets',
            icon: 'coin',
            children: [
              {
                path: '/home',
                name: 'home',
                label: 'home',
                icon: 's-home',
                url: '/home'
              },
              {
                path: '/vehicle',
                name: 'vehicle',
                label: 'vehicle',
                icon: 'bicycle',
                url: '/vehicle'
              }
            ]
          }
        ]
      };
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      },
      clickMenu(item) {
        this.$store.commit('changeTitle', item.label)
        this.$router.push({
          name: item.name
        })
      }
    },
    computed: {
      noChildren(){
        return this.menu.filter(item => !item.children)
      },
      hasChildren() {
        return this.menu.filter(item => item.children)
      },
      isCollapse() {
        return this.$store.state.tab.isCollapse
      }
    }
  }
</script>