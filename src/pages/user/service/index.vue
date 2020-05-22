<template>
  <div>
    <div class="tip">服务器临时维护，查询知产订单或申请知产发票请联系客服 ^_^</div>
    <!-- <tabline :title="items" :index="current" @clickItem="changeList" :hover="false"/>
    <el-table
      :data="currentList"
      style="width: 100%">
      <el-table-column
        prop="oid"
        label="订单号"
        width="160"
        align="center">
      </el-table-column>
      <el-table-column
        prop="gid"
        label="商品"
        width="170"
        align="center">
      </el-table-column>
      <el-table-column
        prop="price"
        label="金额"
        width="160"
        align="center">
      </el-table-column>
      <el-table-column
        prop="time"
        label="时间"
        width="180"
        align="center">
      </el-table-column>
      <el-table-column
        prop="status"
        label="状态"
        width="150"
        align="center">
        <template slot-scope="scope">
          <div :class="scope.row.status === '未支付' ? 'unpay' : 'pay'">
            {{scope.row.status}}
          </div>
        </template>
      </el-table-column>
      <el-table-column
        prop="status"
        label=""
        width="104"
        align="center">
        <template v-if="scope.row.status === '未支付'" slot-scope="scope">
          <el-button @click='toPay(scope.row)' type="primary">{{scope.row.status === '未支付' ? '去支付' : ''}}</el-button>
        </template>
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
    </div>-->
  </div>
</template>
<script>
import Tabline from '@/components/tabLine/index.vue'

export default {
  name: 'user-service',
  data: () => ({
    oList: [],
    current: 0,
    items: [
      {
        message: '全部订单',
        group: 'one'
      },
      {
        message: '尚未支付',
        group: 'two'
      },
      {
        message: '已支付',
        group: 'three'
      }
    ],
    line: '1,0,0'
  }),
  components: {
    Tabline
  },
  computed: {
    currentList() {
      let arr = []
      this.oList.forEach(value => {
        arr.push({
          oid: value.id,
          gid: value.subject,
          price: this.toPrice(value.price),
          time: this.toTime(value.create_time),
          status: this.status(value)
        })
      })
      return arr
    },
    pagNum() {
      let pagData = this.line.split(',')
      let current = pagData[2] * 1
      let total = pagData[1] * 1
      return { current, total }
    }
  },
  methods: {
    status(v) {
      if (v.price == 0) return '无需支付'
      return v.status == 0 ? '未支付' : '已支付'
    },
    toPay(item) {
      window.open(`/pay?orderId=${item.oid}`, '_blank')
    },
    toPrice(s) {
      if (s == 0) return '免费'
      let p = s / 100 + ''
      if (p.includes('.')) return p + '元'
      return p + '.00' + '元'
    },
    toTime(inputTime) {
      let date = new Date(inputTime * 1000)
      let y = date.getFullYear()
      let m = date.getMonth() + 1
      m = m < 10 ? ('0' + m) : m
      let d = date.getDate()
      d = d < 10 ? ('0' + d) : d
      let h = date.getHours()
      h = h < 10 ? ('0' + h) : h
      let minute = date.getMinutes()
      let second = date.getSeconds()
      minute = minute < 10 ? ('0' + minute) : minute
      second = second < 10 ? ('0' + second) : second
      return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
    },
    async getUserOrder(data) {
      this.oList = []
      let res = await this.$apiFactory.getOrderApi().orderList(data)
      this.oList = res.data.data || []
      this.line = res.data.line
    },
    async changeList(index) {
      // 初始化line数据
      this.line = '1,0,0'
      let data = {
        line: this.line
      }
      this.current = index
      if (index == 1) {
        data.status = '0'
      } else if (index == 2) {
        data.status = '1'
      }
      this.getUserOrder(data)
    },
    handleCurrentChange(v) {
      let pagData = this.line.split(',')
      this.line = `${v},${pagData[1]},${pagData[0]}`
      this.getUserOrder({ line: this.line })
      window.scrollTo(0, 0)
    }
  },
  created() {
    document.title = '订单中心 - 拍信'

    this.getUserOrder({ line: this.line })
  }
}
</script>
<style lang="scss" scoped>
.tip {
  text-align: center;
  margin: 200px 0;
  font-size: 1.3rem;
  letter-spacing: 2px;
  color: rgba(0, 0, 0, 0.4);
}
.pay {
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #3bb475;
}
.unpay {
  font-size: 14px;
  line-height: 20px;
  text-align: center;
  color: #e51429;
}
.pagination {
  margin: 30px auto;
}
.toPay {
  border: 1px;
}
</style>
