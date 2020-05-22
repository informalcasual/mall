<template>
  <div>
    <div class="code">
      <Qcode @binding="binding"></Qcode>
    </div>
  </div>
</template>
<script>
import Qcode from '../code/Rcode'
export default {
  components: {
    Qcode
  },
  methods: {
    binding(id) {
      if (id > 0) {
        this.$bus.emit('showBending', {
          show: true,
          sceneId: id
        })
      }
      this.$emit('ifshow')
    }
  },
  computed: {

  }
}
</script>
<style lang="scss" scoped>
.code {
  width: 200px;
  height: 200px;
  border: 1px solid rgba(214, 214, 214, 1);
  margin: 20px auto 0px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
