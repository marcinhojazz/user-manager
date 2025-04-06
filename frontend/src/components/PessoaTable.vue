<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Lista de Pessoas</h1>

    <!-- Wrapper com overflow-x-auto -->
    <div class="overflow-x-auto">
      <table class="table w-full min-w-[700px]">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Idade</th>
            <th>Estado Civil</th>
            <th>CPF</th>
            <th>Cidade</th>
            <th>Estado</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="pessoa in paginatedPessoas" :key="pessoa.id">
            <td>{{ pessoa.nome }}</td>
            <td>{{ pessoa.idade }}</td>
            <td>{{ pessoa.estadoCivil }}</td>
            <td>{{ pessoa.cpf }}</td>
            <td>{{ pessoa.cidade }}</td>
            <td>{{ pessoa.estado }}</td>
            <td>
              <div class="flex gap-2">
                <button class="btn btn-sm btn-primary" @click="$emit('edit', pessoa)">Editar</button>
                <button class="btn btn-sm btn-error" @click="$emit('delete', pessoa.id)">Excluir</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Paginação -->
    <div class="flex justify-between lg:justify-center gap-6 mt-4">
      <button class="btn btn-sm" :disabled="currentPage === 1" @click="prevPage">Anterior</button>
      <span>Página {{ currentPage }} de {{ totalPages }}</span>
      <button class="btn btn-sm" :disabled="currentPage === totalPages" @click="nextPage">Próxima</button>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { usePessoaStore } from '../store/pessoa'

export default defineComponent({
  name: 'PessoaTable',
  emits: ['edit', 'delete'],
  setup() {
    const store = usePessoaStore()
    const currentPage = ref(1)
    const pageSize = 5

    const totalPages = computed(() => Math.ceil(store.pessoas.length / pageSize))

    const paginatedPessoas = computed(() => {
      const start = (currentPage.value - 1) * pageSize
      return store.pessoas.slice(start, start + pageSize)
    })

    function nextPage() {
      if (currentPage.value < totalPages.value) {
        currentPage.value++
      }
    }

    function prevPage() {
      if (currentPage.value > 1) {
        currentPage.value--
      }
    }

    return {
      currentPage,
      totalPages,
      paginatedPessoas,
      nextPage,
      prevPage,
    }
  }
})
</script>
