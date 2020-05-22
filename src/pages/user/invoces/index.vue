<template>
  <div class="invoice">
    <div class="invoice-header">
      <div class="title">已开发票
        <router-link tag="div" to="/user/invoice" class="btn">
          申请发票
          <img src="../img/plus.svg" alt="">
        </router-link>
      </div>
    </div>
    <el-table
      :data="currentList"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <div v-if="props.row.type == 0" class="subBox">
                <div class='subOneItem' v-if="props.row.name">
                    <div>开票公司</div>
                    <div>{{ props.row.name }}</div>
                </div>
                <div class='subOneItem' v-if="props.row.connect">
                    <div>收件电话</div>
                    <div>{{ props.row.connect }}</div>
                </div>
                <div class='subOneItem' v-if="props.row.email">
                    <div>收件邮箱</div>
                    <div>{{ props.row.email }}</div>
                </div>
                <div class='subOneItem' v-if="props.row.remark">
                    <div>备注</div>
                    <div>{{ props.row.remark }}</div>
                </div>
            </div>
            <div v-else class="subBox">
              <div>
                <div class='subOneItem' v-if="props.row.name">
                  <div>开票公司</div>
                  <div>{{ props.row.name }}</div>
                </div>
                <div class='subOneItem' v-if="props.row.bank">
                  <div>开户银行</div>
                  <div>{{ props.row.bank }}</div>
                </div>
                <div class='subOneItem' v-if="props.row.bank_id">
                  <div>银行账户</div>
                  <div>{{ props.row.bank_id }}</div>
                </div>
              </div>
              <div>
                <div class='subOneItem' v-if="props.row.connect">
                  <div>公司电话</div>
                  <div>{{ props.row.connect }}</div>
                </div>
                <div class='subOneItem' v-if="props.row.receive_contact">
                  <div>收件人</div>
                  <div>{{ props.row.receive_contact }}</div>
                </div>
                <div class='subOneItem' v-if="props.row.receive_connect">
                  <div>收件电话</div>
                  <div>{{ props.row.receive_connect }}</div>
                </div>
                <div class='subOneItem' v-if="props.row.remark">
                  <div>备注</div>
                  <div>{{ props.row.remark }}</div>
                </div>
              </div>
              <div>
                <div class='subOneItem' v-if="props.row.address">
                  <div>公司注册地址</div>
                  <div>{{ props.row.address }}</div>
                </div>
                <div class='subOneItem' v-if="props.row.receive_address">
                  <div>收件地址</div>
                  <div>{{ props.row.receive_address }}</div>
                </div>
              </div>
            </div>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        prop="id"
        label="发票ID"
        width="170"
        align="center">
      </el-table-column>
      <el-table-column
        prop="createline"
        label="开票时间"
        width="170"
        align="center">
      </el-table-column>
      <el-table-column
        prop="price"
        label="开票金额"
        width="170"
        align="center">
      </el-table-column>
      <el-table-column
        prop="track_status"
        label="开票进度"
        width="170"
        align="center">
      </el-table-column>
      <el-table-column
        prop="track"
        label="快递单号"
        width="170"
        align="center">
      </el-table-column>
    </el-table>
    <div class='pagination'>
      <el-pagination
        background
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :pager-count="11"
        :page-count="pagNum.total"
        :current-page="pagNum.current">
      </el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  name: 'invoces',
  data: () => ({
    iList: [],
    line: '1,0,0'
  }),
  methods: {
    async getInvoiceData(data) {
      this.iList = []
      let res = await this.$apiFactory.getInvoiceApi().getInvoice(data)
      this.iList = res.data.data || []
      this.line = res.data.line
    },
    formatDate(v) {
      let _temp = parseInt(v / 1000)
      let date = new Date(_temp)
      let dateFormatter = date.getFullYear() + '年' + (date.getMonth() + 1) + '月' + date.getDate() + '日'
      return dateFormatter
    },
    toStatus(item) {
      let st = ''
      switch (item) {
        case '0':
          st = '未开票'
          break
        case '1':
          st = '未开票'
          break
        case '2':
          st = '开票中'
          break
        case '3':
          st = '已开票'
          break
        default:
          break
      }
      return st
    },
    trackNum(num) {
      if (num == '') {
        return '无'
      } else {
        return num
      }
    },
    handleCurrentChange(v) {
      let pagData = this.line.split(',')
      this.line = `${pagData[0]},${pagData[1]},${v}`
      this.getInvoiceData({ line: this.line, limit: '11' })
      window.scrollTo(0, 0)
    }
  },
  created() {
    document.title = '我的发票 - 拍信'

    this.getInvoiceData({ line: this.line, limit: '11' })
  },
  computed: {
    currentList() {
      let arr = []
      this.iList.forEach(value => {
        value.createline = this.formatDate(value.createline)
        value.price = value.amount / 100 + '元'
        value.track_status = value.tracking_number != '' && value.status != 3 ? '已寄出' : this.toStatus(value.status)
        value.track = this.trackNum(value.tracking_number)
        arr.push(value)
      })
      return arr
    },
    pagNum() {
      let pagData = this.line.split(',')
      let current = pagData[2] * 1
      let total = pagData[1] * 1
      return { current, total }
    }
  }
}
</script>
<style lang="scss" scoped>
.invoice{
  margin: 0 auto;
  .el-icon-circle-close {
        color: rgba(0, 0, 0, 0.1);
        font-size: 1.1rem;
    }
    .el-icon-circle-check {
        color: rgb(61, 194, 61);
        font-size: 1.1rem;
    }
  .el-form {
    > div {
      display: block;
      padding-top: 10px;
      padding-bottom: 10px;
    }
    &:not(:last-child) {
      > div {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }
    }
    .subBox{
      display: flex;
      flex-wrap: wrap;
    }
    .subOneItem {
      margin-right: 40px;
      div {
        &:first-child {
          color: #99a9bf;
        }
        &:last-child {
          line-height: 60px;
        }
      }
    }
  }
  .invoice-header{
    font-size: 24px;
    letter-spacing: 1px;
    text-align: center;
    margin: 15px 0 25px;
    .title{
      display: inline-block;
      position: relative;
      .btn{
        position: absolute;
        top: 5px;
        right: -100px;
        font-size: 16px;
        width: 85px;
        color: #E51429;
        display: flex;
        justify-content: space-between;
        cursor: pointer;
        img{
          height: 16px;
          width: auto;
        }
      }
    }
  }
  .pagination{
    margin: 25px 0;
  }
}
</style>
