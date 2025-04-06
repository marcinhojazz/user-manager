<template>
  <div class="container mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4 text-center sm:text-left">Gestão de Pessoas</h1>

    <div class="flex sm:justify-start">
      <button class="btn btn-success mt-4" @click="abrirFormulario" v-if="!editData">
        Adicionar Pessoa
      </button>
    </div>

    <Modal v-if="showAddForm || editData" @close="cancelEdit">
      <PessoaForm :modelValue="editData" @submit="handleSubmit" @cancel="cancelEdit" />
    </Modal>

    <PessoaTable @edit="editPessoa" @delete="deletePessoa" />

    <Toast />

  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import Modal from '@/components/Modal.vue'
import PessoaForm from '@/components/PessoaForm.vue'
import PessoaTable from '@/components/PessoaTable.vue'
import { usePessoaStore } from '@/store/pessoa'
import type { Pessoa } from '@/types/pessoa'
import Toast from '@/components/Toast.vue'

const pessoaStore = usePessoaStore()
const showAddForm = ref(false)
const editData = ref<Pessoa | null>(null)

onMounted(() => {
  pessoaStore.fetchPessoas()
})

function abrirFormulario() {
  editData.value = null
  showAddForm.value = true
}

function handleSubmit(p: Pessoa) {
  if (editData.value) {
    pessoaStore.updatePessoa(p)
  } else {
    const { id, ...newPessoaData } = p
    pessoaStore.addPessoa(newPessoaData)
  }
  cancelEdit()
}

function editPessoa(p: Pessoa) {
  editData.value = p
  showAddForm.value = true
}

function cancelEdit() {
  showAddForm.value = false
  editData.value = null
}

function deletePessoa(id: number) {
  pessoaStore.deletePessoa(id)
}
</script>
