<script>
export default {
  props: {
    group: Object,
    expenses: Array,
    aggrExpenses: Object
  }
}
</script>

<template>
  <div>
    <h1 class="fs-1 px-4 py-4">
      Grupo: {{ group.name }}
    </h1>
  
    <div class="px-4 pb-4">
      <div class="pb-3">
        <h3>Membros</h3>
        <li v-for="member in group.members"
          class="list-group-item list-group-item-action">
          {{ member.first_name }} {{ member.last_name }}
        </li>
      </div>
  
      <div class="row align-items-start">
        <div class="col">
          <h3 class="pb-2">Despesas</h3>
          <table class="table">
            <thead>
              <th scope="col" class="ps-2">#</th>
              <th scope="col" class="ps-2">Nome</th>
              <th scope="col">Preço (R$)</th>
            </thead>
            <tbody>
              <tr v-for="(expense, index) in expenses">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ expense.description }}</td>
                <td>{{ expense.cost }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div class="col">
          <h3 class="pb-2">Despesas Agrupadas</h3>
          <table class="table">
            <thead>
              <th scope="col" class="ps-2">#</th>
              <th scope="col" class="ps-2">Nome</th>
              <th scope="col">Preço (R$)</th>
            </thead>
            <tbody>
              <tr v-for="(key, index) in Object.keys(aggrExpenses)">
                <th scope="row">{{ index + 1 }}</th>
                <td>{{ key }}</td>
                <td>{{ aggrExpenses[key] }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>