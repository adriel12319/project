<template>
  <h1>Hello from Vercel</h1>
  This page is:
  <ul>
    <li>Rendered to HTML.</li>
    <li>Interactive. <Counter /></li>
  </ul>
</template>

<script setup>
defineHead({
  title: 'Welcome to My Vike App',
  meta: [
    {
      name: 'description',
      content: 'A Vue.js application built with Vike and deployed on Vercel'
    }
  ]
})
</script>

<script>
import Counter from './Counter.vue'
const components = { Counter }
export default { components }
</script>