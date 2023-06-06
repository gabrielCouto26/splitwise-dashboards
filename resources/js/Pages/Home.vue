<script>
export default {
  props: {
    description: String
  }
}
</script>

<template>
  <section>
    <header>
      <h1>Home</h1>
      <p>{{ description }}</p>
    </header>
  </section>
</template>