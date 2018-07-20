<template>
  <div>
    <h1>ijangsde</h1>
    <h2>{{ counjiangs }}</h2>
    <h3>{{ app }}</h3>
    <p>dsadsa</p>
    <img src="./banner.png" alt="" />
  </div>
</template>

<script>
  export default {
    data () {
      return {
        coun: '种股票',
        app: process.env.APP_NAME
      }
    }
  }
</script>
<style lang='scss'>
  div {
    color: red;
    transform: rotate(3deg);
    border-radius: 4px;
    background: url('./cart.png')
    p {
      color: blue
    }
  }
</style>
