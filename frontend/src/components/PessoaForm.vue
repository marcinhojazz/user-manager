<template>
  <div class="px-2 sm:px-4 py-4">
    <h2 class="text-xl sm:text-2xl font-bold mb-6 text-center sm:text-left">
      {{ isEdit ? 'Editar Pessoa' : 'Adicionar Pessoa' }}
    </h2>

    <form @submit.prevent="handleSubmit" class="grid grid-cols-1 sm:grid-cols-2 gap-4">
      <!-- Nome -->
      <div>
        <label for="nome" class="block text-sm font-medium mb-1">Nome:</label>
        <input
          id="nome"
          v-model="form.nome"
          type="text"
          class="input input-bordered w-full"
          required
          minlength="3"
        />
      </div>

      <!-- Idade -->
      <div>
        <label for="idade" class="block text-sm font-medium mb-1">Idade:</label>
        <input
          id="idade"
          v-model.number="form.idade"
          type="number"
          class="input input-bordered w-full"
          required
          min="1"
          max="120"
        />
      </div>

      <!-- Estado Civil -->
      <div class="sm:col-span-2">
        <label for="estadoCivil" class="block text-sm font-medium mb-1">Estado Civil:</label>
        <select
          id="estadoCivil"
          v-model="form.estadoCivil"
          class="input input-bordered w-full"
          required
        >
          <option value="" disabled>Selecione um estado civil</option>
          <option value="Solteiro(a)">Solteiro(a)</option>
          <option value="Casado(a)">Casado(a)</option>
          <option value="Separado(a)">Separado(a)</option>
          <option value="Divorciado(a)">Divorciado(a)</option>
          <option value="Viúvo(a)">Viúvo(a)</option>
        </select>
      </div>

      <!-- CPF -->
      <div class="sm:col-span-2">
        <label for="cpf" class="block text-sm font-medium mb-1">CPF:</label>
        <input
          id="cpf"
          v-model="form.cpf"
          @input="handleCpfInput"
          type="text"
          class="input input-bordered w-full"
          placeholder="000.000.000-00"
          required
          pattern="\d{3}\.?\d{3}\.?\d{3}-?\d{2}"
        />
      </div>

      <!-- Estado -->
      <div>
        <label for="estado" class="block text-sm font-medium mb-1">Estado (UF):</label>
        <select
          id="estado"
          v-model="form.estado"
          class="input input-bordered w-full"
          required
        >
          <option value="" disabled>Selecione um estado</option>
          <option
            v-for="estado in estados"
            :key="estado.sigla"
            :value="estado.sigla"
          >
            {{ estado.sigla }} - {{ estado.nome }}
          </option>
        </select>
      </div>

      <!-- Cidade -->
      <div>
        <label for="cidade" class="block text-sm font-medium mb-1">Cidade:</label>
        <select
          id="cidade"
          v-model="form.cidade"
          class="input input-bordered w-full"
          required
        >
          <option value="" disabled>Selecione uma cidade</option>
          <option v-for="cidade in cidades" :key="cidade" :value="cidade">
            {{ cidade }}
          </option>
        </select>
      </div>

      <!-- Botões -->
      <div class="sm:col-span-2 flex flex-col sm:flex-row justify-end gap-2 mt-4">
        <button type="submit" class="btn btn-primary w-full sm:w-auto">
          {{ isEdit ? 'Atualizar' : 'Adicionar' }}
        </button>
        <button type="button" class="btn btn-secondary w-full sm:w-auto" @click="cancel">
          Cancelar
        </button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref, watch, computed, onMounted } from 'vue'
import type { Pessoa } from '@/types/pessoa'
import { cpfMask } from '@/utils/masks'
import { useUfStore } from '@/store/ufStore'

export default defineComponent({
  name: 'PessoaForm',
  props: {
    modelValue: {
      type: Object as () => Pessoa | null,
      default: null
    }
  },
  emits: ['submit', 'cancel'],
  setup(props, { emit }) {
    const form = reactive<Pessoa>({
      id: 0,
      nome: '',
      idade: 0,
      estadoCivil: '',
      cpf: '',
      cidade: '',
      estado: ''
    })

    const ufStore = useUfStore()
    const cidades = ref<string[]>([])

    onMounted(async () => {
      await ufStore.fetchEstadosIfNeeded()
      if (form.estado) await updateCidades(form.estado)
    })

    async function updateCidades(uf: string) {
      const lista = await ufStore.fetchCidades(uf)
      cidades.value = lista
      if (!lista.includes(form.cidade)) form.cidade = ''
    }

    watch(() => form.estado, async (uf) => {
      if (uf) await updateCidades(uf)
      else cidades.value = []
    })

    watch(() => props.modelValue, (val) => {
      if (val) Object.assign(form, val)
      else {
        form.id = 0
        form.nome = ''
        form.idade = 0
        form.estadoCivil = ''
        form.cpf = ''
        form.cidade = ''
        form.estado = ''
      }
    }, { immediate: true })

    function handleSubmit() {
      const nomeValido = form.nome.trim().length >= 3
      const idadeValida = form.idade > 0 && form.idade <= 120
      const cpfNumerico = form.cpf.replace(/\D/g, '')
      const cpfValido = cpfNumerico.length === 11

      if (!nomeValido) {
        alert('O nome deve ter no mínimo 3 caracteres.')
        return
      }

      if (!idadeValida) {
        alert('A idade deve estar entre 1 e 120 anos.')
        return
      }

      if (!cpfValido) {
        alert('O CPF deve conter 11 dígitos numéricos.')
        return
      }

      emit('submit', { ...form })
    }

    function cancel() {
      emit('cancel')
    }

    function handleCpfInput(e: Event) {
      const input = e.target as HTMLInputElement
      const masked = cpfMask(input.value)
      input.value = masked
      form.cpf = masked
    }

    const isEdit = computed(() => props.modelValue !== null)

    return {
      form,
      estados: ufStore.estados,
      cidades,
      handleSubmit,
      cancel,
      handleCpfInput,
      isEdit
    }
  }
})
</script>
