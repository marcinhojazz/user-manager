import { defineStore } from 'pinia'
import { getEstados, getCidades } from '@/api/estadosCidades'

interface EstadoAPI {
  nome: string
  sigla: string
}

interface CidadeAPI {
  nome: string
}

export const useUfStore = defineStore('ufStore', {
  state: () => ({
    estados: [] as EstadoAPI[],
    cidadesPorEstado: {} as Record<string, string[]>
  }),

  actions: {
    async fetchEstadosIfNeeded() {
      if (this.estados.length) return
      try {
        const data = await getEstados()
        this.estados = data
      } catch (error) {
        console.error('Erro ao carregar estados:', error)
      }
    },

    async fetchCidades(sigla: string) {
      if (!this.cidadesPorEstado[sigla]) {
        try {
          const data = await getCidades(sigla)
          this.cidadesPorEstado[sigla] = data.map((c: CidadeAPI) => c.nome)
        } catch (error) {
          console.error(`Erro ao carregar cidades de ${sigla}:`, error)
          this.cidadesPorEstado[sigla] = []
        }
      }
      return this.cidadesPorEstado[sigla]
    }
  }
})
