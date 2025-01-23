<template>
  <h1>About</h1>
  <p>Showcase of using Vike with Vercel.</p>
  <p>Demo version: 9</p>
</template>

<script>
export default {
  head() {
    return {
      title: 'About Page',
      meta: [
        { name: 'description', content: 'This is the about page of the project.' },
        { name: 'name', content: 'About Page' }
      ]
    }
  }
}
</script>