<script>
export default {
  props: {
    group: Object,
    expenses: Array,
  }
}
</script>

<template>
  <h1 class="fs-1 px-4 py-4">
    Grupo: {{ group.name }}
  </h1>

  <div class="px-4 pb-4">
    <h3>Membros</h3>
    <li v-for="member in group.members"
      class="list-group-item list-group-item-action">
      {{ member.first_name }} {{ member.last_name }}
    </li>

    <h3>Despesas</h3>
    <li v-for="expense in expenses"
      class="list-group-item list-group-item-action">
      {{ expense.description }} - {{ expense.cost }}
    </li>
  </div>
</template>