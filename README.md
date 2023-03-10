
# D4Sign SDK

SDK em typescript para interagir com a API do d4sign.


## Referência

 - [D4sign docs - Documentação oficial ](https://docapi.d4sign.com.br/docs)
## Instalação

```bash
  npm install d4sign
  yarn add d4sign
```
    
## Uso/Exemplos

```typescript
import { D4Sign } from "d4sign";


async function main() {
    const client = new D4Sign({
        credentials: {
            tokenAPI: "live_44949239abfcd539d2fea3939493249349329494143fefabc",
            cryptKey: "live_crypt_erktlkwerooWREWfdsfPERWTGeI"
        }
    })

    const accountBalance = await client.account.getBalance()
    console.log(accountBalance)


    const documents = await client.document.list() //options { page?: number }
    const documentsByStatus = await client.document.listByStatus("Aguardando Signatários")
    const document = await client.document.get(documentUUID);

    ...
}
```


## Roadmap

- Implementar todos os métodos públicos da API do d4sign (em progresso)

- Implementar testes unitarios (não iniciado)

- Automatizar CI/CD (não iniciado)

- Criar workflow para manutenção (não iniciado)

## Disclaimer

Esse projeto não tem vínculo algum com a empresa D4Sign, trata-se apenas de uma sdk para facilitar o consumo da api do mesmo.
