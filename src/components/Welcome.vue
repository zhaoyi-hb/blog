<template>
<div>
<textarea v-model="formula" cols="30" rows="10"></textarea>
  <vue-mathjax :formula="formula"></vue-mathjax>
</div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      formula: '$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}.$$',
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>