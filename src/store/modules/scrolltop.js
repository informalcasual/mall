/**
 * @author bcd
 * @description 获取当前滚轮到顶部高度
 */
const scrolltopscore = {
  state: {
    scroll_top_score: window.pageYOffset || document.body.scrollTop || document.documentElement.scrollTop
  }
}
window.addEventListener('scroll', () => {
  scrolltopscore.state.scroll_top_score = document.body.scrollTop || document.documentElement.scrollTop
})
export default scrolltopscore
