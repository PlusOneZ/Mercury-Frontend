<template>
  <div>
    <h1>Hello Login!</h1>
    <p class="text-xl"> Login please. </p>
    <button @click="toHome">toHome</button>
  </div>

</template>

<script>
import { useRouter } from 'vue-router'
export default {
  name: "login",
  setup () {
    const router = useRouter()
    const toHome = (() => {
      router.push({
        name: 'home'
      })
    })
    return {
      toHome
    }
  },
}
</script>

<style scoped>

</style>