<template>
  <div class="search-bar base-width">
    <div class="search-box">
      <el-input placeholder="搜索需要注册的商标" v-model="string" class="input-with-select" @keydown.enter.native="searchAction">
        <el-select slot="prepend" placeholder="商标" v-model="type" disabled>
          <el-option label="餐厅名" value="1"></el-option>
          <el-option label="订单号" value="2"></el-option>
          <el-option label="用户电话" value="3"></el-option>
        </el-select>
        <el-button slot="append" icon="el-icon-search" @click="searchAction">查询能否注册</el-button>
      </el-input>
    </div>
  </div>
</template>
<script>
export default {
  name: 'search',
  data: () => ({
    type: '',
    string: ''
  }),
  methods: {
    searchAction() {
      this.$store.commit('setSearchDialog', this.string)
      this.$store.commit('switchDialogState', true)
    }
  }
}
</script>
<style lang="scss">
.search-bar{
  border-radius: 10px;
  margin: 190px auto 0;
  height: 200px;
  background: #fafafa;
  box-shadow: 0px 16px 22px rgba(0, 0, 0, 0.11);
  display: flex;
  justify-content: center;
  align-items: center;
  .search-box{
    width: 1064px;
    height: 89px;
    border: 3px solid #e51429;
    border-radius: 10px;
    .el-input-group{
      height: 100%;
      display: flex;
      align-items: center;
    }
    .el-input-group__prepend{
      background: transparent;
      padding: 0 25px;
      width: 100px;
      font-size: 20px;
      line-height: 28px;
      border: none;
      .el-input__inner{
        text-align: center;
      }
      .el-input__inner::-webkit-input-placeholder{
        color: #000000;
      }
      .el-input__inner::-moz-placeholder{
        color: #000000;
        opacity: 1;
      }
      .el-input__suffix{
        border: 2px solid #dbdbdb;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        top:5px;
        right: 0;
        .el-input__icon{
          line-height: 14px;
          position: absolute;
          right: -3px;
          top: 0px;
        }
      }
    }
    .el-input__inner{
      height: 100%;
      border: none;
      font-size: 20px;
      line-height: 28px;
    }
    .el-input-group__append{
      background: #e51429;
      color: white;
      border: 1px solid #e51429;
      width: 250px;
      height: 87px;
      display: flex;
      align-items: center;
      justify-content: center;
      .el-button{
        font-size: 20px;
        line-height: 28px;
        i{
          font-size: 25px;
          margin: 0 5px;
        }
      }
    }
  }
}
</style>
