<template>
  <div class="content">
    <div>
      <el-menu
              :default-active="activeIndex"
              class="el-menu-demo el-menu"
              mode="horizontal"
              @select="handleSelect"
              text-color="#fff"
              active-text-color="#ffd04b">
        <el-menu-item index="0" @click="changeTable('networkManager')">Center关系网</el-menu-item>
        <el-menu-item index="1" @click="changeTable('userManager')">人员管理</el-menu-item>
        <el-menu-item index="2" @click="changeTable('relationManager')">关系管理</el-menu-item>
        <el-menu-item index="3" @click="changeTable('hobbyManager')">爱好管理</el-menu-item>
        <el-menu-item index="4" @click="changeTable('userRelationManager')">维护用户关系</el-menu-item>
      </el-menu>
    </div>
    <div>
      <xiongguoliang :is="type"></xiongguoliang>
    </div>
  </div>
</template>

<script>
  import networkManager from './network/networkManager.vue';
  import userManager from '../views/user/userManager.vue';
  import relationManager from '../views/relation/relationManager.vue';
  import hobbyManager from '../views/hobby/hobbyManager.vue';
  import userRelationManager from '../views/userrelation/userRelationManager.vue'
  export default {
    name: "home",
    components: {
      networkManager,
      userManager,
      relationManager,
      hobbyManager,
      userRelationManager
    },
    data() {
      return {
        activeIndex: '0',
        type: 'networkManager'
      };
    },
    methods: {
      handleSelect() {
      },
      changeTable(type) {
        this.type = type;
      }
    },
    mounted() {
      if (this.$route.params.type && this.$route.params.activeIndex) {
        this.type = this.$route.params.type;
        this.activeIndex = this.$route.params.activeIndex;
      }
    }
  }
</script>
