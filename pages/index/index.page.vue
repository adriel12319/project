<template>
  <h1>Hello from Vercel</h1>
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
    },
    {
      'http-equiv': 'X-UA-Compatible',
      content: 'IE=edge'
    },
    {
      'http-equiv': 'Content-Security-Policy',
      content: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline';"
    },
    {
      name: 'Access-Control-Allow-Origin',
      content: '*'
    },
    {
      name: 'Access-Control-Allow-Methods',
      content: 'GET, POST, OPTIONS'
    }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})
</script>

<script>
import Counter from './Counter.vue'
const components = { Counter }
export default { components }
</script>