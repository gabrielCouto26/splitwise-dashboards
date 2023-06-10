<script>
export default {
  props: {
    groups: Array,
  }
}
</script>

<template>
  <section>
    <header>
      <h1 class="fs-1 px-4 py-4">Grupos ativos</h1>
      <ol class="list-group list-group-numbered">
        <li v-for="group in groups"
          class="list-group-item list-group-item-action">
          <a :href="`/groups/${group.id}`"
            class="text-decoration-none"
            style="color: inherit">
            {{ group.name }}
          </a>
        </li>
      </ol>
    </header>
  </section>
</template>