import { defineStore } from 'pinia'
import api from '../api/apiConfig'
import type { Pessoa } from '../types/pessoa'
import { useToastStore } from './toast'

export const usePessoaStore = defineStore('pessoa', {
  state: () => ({
    pessoas: [] as Pessoa[],
    loading: false,
  }),
  actions: {
    async fetchPessoas() {
      const toast = useToastStore()
      this.loading = true
      try {
        const response = await api.get<Pessoa[]>('/Pessoa')
        this.pessoas = response.data.sort((a, b) => a.nome.localeCompare(b.nome))
      } catch (error) {
        console.error("Erro ao buscar pessoas", error)
        toast.show('Erro ao buscar pessoas', 'error')
      } finally {
        this.loading = false
      }
    },

    async addPessoa(pessoa: Omit<Pessoa, 'id'>) {
      const toast = useToastStore()
      try {
        const response = await api.post<Pessoa>('/Pessoa', pessoa)
        this.pessoas.push(response.data)
        toast.show('Pessoa adicionada com sucesso!', 'success')
      } catch (error) {
        console.error("Erro ao adicionar pessoa", error)
        toast.show('Erro ao adicionar pessoa', 'error')
      }
    },

    async updatePessoa(pessoa: Pessoa) {
      const toast = useToastStore()
      try {
        await api.put(`/Pessoa/${pessoa.id}`, pessoa)
        const index = this.pessoas.findIndex(p => p.id === pessoa.id)
        if (index !== -1) {
          this.pessoas[index] = pessoa
        }
        toast.show('Pessoa atualizada com sucesso!', 'success')
      } catch (error) {
        console.error("Erro ao atualizar pessoa", error)
        toast.show('Erro ao atualizar pessoa', 'error')
      }
    },

    async deletePessoa(id: number) {
      const toast = useToastStore()
      try {
        await api.delete(`/Pessoa/${id}`)
        this.pessoas = this.pessoas.filter(p => p.id !== id)
        toast.show('Pessoa excluída com sucesso!', 'success')
      } catch (error) {
        console.error("Erro ao deletar pessoa", error)
        toast.show('Erro ao deletar pessoa', 'error')
      }
    }
  }
})
