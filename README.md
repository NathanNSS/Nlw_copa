

<h1 align="center">NLW COPA</h1>

<p align="center">
  <img alt="License" src="https://img.shields.io/static/v1?label=license&message=MIT&color=F7DD43&labelColor=202124">
</p>

<p align="center">
    <img  alt="COPA" title="CAPA" src="AppShowcase/mobile.png" width="75%"></img>
</p>


<br>

## 💻 Projeto

O <b>NLW COPA</b> e um projeto multiplataforma que disponibiliza meios para você e seus amigos criarem bolões e torcem juntos nessa copa do mundo, foi desenvolvido durante a semana do [NLW-COPA](https://github.com/rocketseat-education/nlw-copa-ignite) com base neste [protótipo](https://www.figma.com/file/pOsKQzvg6RPHXLRSEopTUm/Bol%C3%A3o-da-Copa).


<br>

## ✨ Tecnologias

Este projeto foi desenvolvido com as seguintes tecnologias:

> [Server](./server/)
- [NodeJS](https://nodejs.org/en/)
- [TypeScript](https://www.typescriptlang.org/)
- [Fastify](https://www.fastify.io/)
- [Prisma](https://www.prisma.io/)
- [Mermaid](https://github.com/mermaid-js/mermaid)
- [Zod](https://github.com/colinhacks/zod)
  
> [Web](./web)
- [React](https://reactjs.org/)
- [Next](https://nextjs.org/)
- [Axios](https://axios-http.com/)
- [Eslint](https://eslint.org/)
- [Critters](https://github.com/GoogleChromeLabs/critters)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwindcss](https://tailwindcss.com/)
  
> [Mobile](./mobile)
- [Expo](https://docs.expo.dev/)
- [Axios](https://axios-http.com/)
- [Auth Session](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [React Native](https://reactnative.dev/)
- [Navigation](https://reactnavigation.org/)
- [TypeScript](https://www.typescriptlang.org/)

<br>

## 🚀 Como executar

#### **❗ Acesse os repositórios para mais detalhes**
- Clone o repositório
> [Server](./server/)
- Rode `cd server` para ir até a pasta da api
- Rode `npm install` para instalar as dependências
- Rode o `npm run dev` para iniciar a aplicação na porta <b>3333</b>
- Por fim, a <b>API</b> estará disponível em `http://localhost:3333`
  
> [Web](./web)
- Rode `cd web` para ir até a pasta da Web Page
- Rode `npm install` para instalar as dependências
- Execute o [Server](./server#-como-executar) e conecte-se
- Rode o `npm run dev` para iniciar a aplicação na porta <b>3000</b>
- Por fim, o <b>Website</b> estará disponível em `http://localhost:3000`

> [Mobile](./mobile)
#### **Obs: Tenha o expo-cli instalado na sua maquina**

- Rode `cd mobile` para ir até a pasta mobile
- Rode `npx expo install` para instalar as dependências
- Execute o [Server](./server#-como-executar) e conecte-se
- Rode o `npx expo start` para iniciar a aplicação
- Por fim, o **Bundler do APP** estará disponível

<br>

## 📄 Licença

Esse projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

<br/>

## 🚧 Atenção
O código em [server.ts](./server/src/server.ts#L34) deve estar assim para funcionar a comunicação com o [Mobile](./mobile)
```ts
await fastify.listen({port: port, host: "0.0.0.0"})
```
E assim para funcionar o [Web](./web)
```ts
await fastify.listen({port: port})
```
> ##### **Obs: O arquivo [ERD.svg](./server/prisma/ERD.svg) e um Diagrama de Entidade e Relacionamento do Banco de Dados que é gerado automaticamente toda vez que ocorre uma migrate no prisma**
