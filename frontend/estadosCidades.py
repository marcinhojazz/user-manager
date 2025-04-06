import requests
import json

def main():
    # Endpoint para obter os estados do Brasil
    states_url = "https://servicodados.ibge.gov.br/api/v1/localidades/estados"
    response = requests.get(states_url)
    response.raise_for_status()  # Levanta exceção se houver erro na requisição
    states = response.json()

    resultado = []

    for state in states:
        uf = state["sigla"]
        state_nome = state["nome"]
        # Endpoint para obter os municípios de um estado
        cities_url = f"https://servicodados.ibge.gov.br/api/v1/localidades/estados/{uf}/municipios"
        response_cities = requests.get(cities_url)
        response_cities.raise_for_status()
        cities = response_cities.json()
        city_names = [city["nome"] for city in cities]

        resultado.append({
            "uf": uf,
            "nome": state_nome,
            "cidades": city_names
        })

    # Gera o arquivo JSON com indentação e sem caracteres Unicode escapados
    with open("estados-cidades.json", "w", encoding="utf-8") as f:
        json.dump(resultado, f, ensure_ascii=False, indent=2)

    print("Arquivo 'estados-cidades.json' gerado com sucesso!")

if __name__ == "__main__":
    main()
