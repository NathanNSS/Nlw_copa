<h1 align="center">Server</h1>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=F7DD43&labelColor=202124">
</p>

<!-- <img alt="COPA Web" title="Web Page" src="./prisma/ERD.svg" width="40%"></img> -->

<br>


## 💻 Projeto

A versão SERVER e uma API implementada no back-end do sistema que disponibiliza informações para [web](../web) e [mobile](../mobile) através de suas ROTAS.

<br>

## ✨ Tecnologias

Esse projeto foi desenvolvido com as seguintes tecnologias:
- [NodeJS](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [Mermaid](https://github.com/mermaid-js/mermaid)
- [Zod](https://github.com/colinhacks/zod)

<br>

## 🚀 Como executar
- Clone o repositório
- Rode `npm install` para instalar as dependências
- Rode o `npm run dev` para iniciar a aplicação na porta <b>3333</b>
- Por fim, a <b>API</b> estará disponível em `http://localhost:3333`

<br>

## 📄 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](../LICENSE) para mais detalhes.

<br>

## 🚧 Atenção
O código em [server.ts](./src/server.ts#L34) deve estar assim para funcionar a comunicação com o [Mobile](../mobile)
```ts
await fastify.listen({port: port, host: "0.0.0.0"})
```
E assim para funcionar o [Web](../web)
```ts
await fastify.listen({port: port})
```
> ##### **Obs: O arquivo [ERD.svg](./prisma/ERD.svg) e um Diagrama de Entidade e Relacionamento do Banco de Dados que é gerado automaticamente toda vez que ocorre uma migrate no prisma**
