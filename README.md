# Workly

> **Importante:** a autenticação atual é uma implementação local para fins de
> protótipo. Usuários e sessão são armazenados no `localStorage` do navegador.
> Para uso em produção, substitua essa camada por uma API de autenticação e
> nunca armazene senhas em texto puro no cliente.

## Deploy

Site publicado no Vercel:

- https://dashboard-one-gamma-48.vercel.app/

Dashboard de produtividade construído com React, TypeScript, Vite, Tailwind
CSS e componentes do shadcn/ui.

> **Projeto demonstrativo:** este projeto é apenas um exemplo de uso das
> funcionalidades e dos componentes do shadcn/ui. Ele não representa um
> produto completo e nem todas as telas, botões e ações disponíveis no
> dashboard possuem funcionalidades reais utilizáveis.

O projeto contém uma tela inicial de autenticação com login e cadastro, rotas
protegidas, dashboard responsivo e opção de encerramento de sessão.

Grande parte do dashboard serve como demonstração visual de layouts,
componentes, navegação, tabelas, gráficos e interações do shadcn/ui. Algumas
ações são placeholders e não estão conectadas a backend, banco de dados ou
serviços externos. Portanto, o projeto deve ser usado como referência de
interface e ponto de partida para desenvolvimento, não como uma aplicação
pronta para uso em produção.

## Requisitos

Antes de começar, instale:

- [Node.js](https://nodejs.org/) 20 ou superior
- npm (incluído no Node.js)

Confira as versões instaladas:

```bash
node --version
npm --version
```

## Instalação

Clone ou abra o projeto e instale as dependências:

```bash
npm install
```

## Executando em desenvolvimento

Inicie o servidor local do Vite:

```bash
npm run dev
```

Por padrão, o projeto estará disponível em:

<http://localhost:5173>

O Vite disponibiliza hot reload, então alterações nos arquivos são refletidas
automaticamente no navegador.

Para iniciar o servidor aceitando conexões da rede local:

```bash
npm run dev -- --host
```

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o servidor de desenvolvimento |
| `npm run build` | Executa a verificação TypeScript e gera o build de produção |
| `npm run preview` | Serve localmente o build gerado |
| `npm run lint` | Executa o Oxlint no código do projeto |

Fluxo recomendado antes de publicar:

```bash
npm run lint
npm run build
npm run preview
```

## Rotas

| Rota | Acesso | Descrição |
| --- | --- | --- |
| `/login` | Público | Login e cadastro de usuários |
| `/dashboard` | Protegido | Dashboard principal da aplicação |

As rotas são configuradas em `src/App.tsx`. Usuários sem sessão são
redirecionados de `/dashboard` para `/login`. Usuários autenticados que
acessam `/login` são enviados para `/dashboard`.

## Como usar a autenticação

### Criar uma conta

1. Acesse `/login`.
2. Clique em **Criar conta**.
3. Informe nome, e-mail e uma senha com pelo menos seis caracteres.
4. Clique em **Criar conta** novamente.

Após o cadastro, a sessão é criada e o usuário é direcionado para o dashboard.

### Entrar

1. Informe o e-mail utilizado no cadastro.
2. Informe a senha cadastrada.
3. Clique em **Entrar**.

### Sair

1. No dashboard, abra o menu do usuário no rodapé da barra lateral.
2. Clique em **Log out**.

A sessão é removida e a aplicação retorna para `/login`.

### Limpar os dados locais

Para testar novamente o cadastro ou apagar uma sessão durante o
desenvolvimento, abra o console do navegador e execute:

```js
localStorage.removeItem("workspace-session")
localStorage.removeItem("workspace-users")
```

Também é possível limpar todos os dados do site pelas ferramentas de
desenvolvedor do navegador.

## Estrutura principal

```text
src/
├── App.tsx                    # Provider do router e rotas protegidas
├── main.tsx                   # Ponto de entrada da aplicação
├── index.css                  # Tailwind, tema e tokens visuais
├── app/
│   ├── auth/
│   │   └── AuthPage.tsx       # Layout da tela de autenticação
│   └── page/
│       └── Page.tsx           # Dashboard
├── components/
│   ├── login-form.tsx         # Login, cadastro e validações
│   ├── app-sidebar.tsx       # Barra lateral do dashboard
│   ├── nav-user.tsx           # Menu do usuário e Log out
│   └── ui/                    # Componentes reutilizáveis do shadcn/ui
└── hooks/                     # Hooks compartilhados
```

## Tecnologias

- **React 19** para a interface
- **TypeScript** para tipagem estática
- **Vite** para desenvolvimento e build
- **React Router** para as rotas de login e dashboard
- **Tailwind CSS v4** para estilos utilitários
- **shadcn/ui** e **Base UI** para componentes acessíveis
- **Lucide React** para ícones
- **Recharts** para gráficos
- **Oxlint** para linting

## Alias de imports

O alias `@` aponta para a pasta `src`. Assim, os imports podem ser escritos
de forma curta:

```tsx
import { Button } from "@/components/ui/button"
```

Essa configuração está em `tsconfig.app.json` e `vite.config.ts`.

## Build de produção

Gere os arquivos otimizados:

```bash
npm run build
```

O resultado é criado na pasta `dist/`. Para visualizar esse build localmente:

```bash
npm run preview
```

Em uma hospedagem com suporte a SPA, configure fallback para `index.html`.
Isso é necessário para que URLs como `/login` e `/dashboard` funcionem
corretamente quando acessadas diretamente.

## Limitações do exemplo

Este repositório não implementa todas as funcionalidades sugeridas pela
interface. Por exemplo, itens como gerenciamento de conta, cobrança,
notificações, projetos, equipe, relatórios e configurações ainda são
demonstrativos ou placeholders. A autenticação também funciona apenas
localmente no navegador e não deve ser usada para proteger dados reais.

## Próximos passos para produção

Esta versão foi preparada como base visual e funcional. Para transformá-la em
uma aplicação pronta para produção, recomenda-se:

1. Criar uma API de autenticação.
2. Armazenar usuários em um banco de dados.
3. Aplicar hash de senha no servidor.
4. Usar cookies de sessão seguros ou tokens com renovação.
5. Validar os dados também no backend.
6. Adicionar recuperação de senha e verificação de e-mail.
7. Proteger endpoints e implementar controle de permissões.
8. Adicionar testes automatizados para autenticação e navegação.

## Solução de problemas

### A porta 5173 já está em uso

Execute o Vite em outra porta:

```bash
npm run dev -- --port 5174
```

### O dashboard continua aberto após alterações no código

Limpe a sessão no console do navegador:

```js
localStorage.removeItem("workspace-session")
```

Depois recarregue a página.

### Erro após instalar dependências

Remova `node_modules` e o lockfile apenas se necessário e reinstale:

```bash
npm install
```

Evite excluir o lockfile sem necessidade, pois ele ajuda a manter as versões
consistentes entre ambientes.
