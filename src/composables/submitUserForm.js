export function postApplication (data) {
  this.$axios.post('.application', {data})
}
