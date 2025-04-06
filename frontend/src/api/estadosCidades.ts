import axios from 'axios';

const apiEstados = axios.create({
  baseURL: 'https://brasilapi.com.br/api/ibge'
});

export async function getEstados() {
  try {
    const response = await apiEstados.get('/uf/v1')
    return response.data
  } catch (err) {
    console.error('Erro ao buscar estados:', err)
    return []
  }
}

export async function getCidades(uf: string) {
  try {
    const response = await apiEstados.get(`/municipios/v1/${uf}`)
    return response.data
  } catch (err) {
    console.error(`Erro ao buscar cidades do estado ${uf}:`, err)
    return []
  }
}
