# 💰 Simulador de Crédito

O **Simulador de Crédito** é uma aplicação frontend que permite aos usuários simular empréstimos, visualizando as condições de pagamento com base no valor solicitado, taxa de juros e prazo de pagamento. Todos os cálculos são realizados localmente no frontend.

O objetivo do projeto é oferecer uma interface intuitiva e limpa, permitindo que qualquer usuário compreenda facilmente os custos e parcelas de um empréstimo antes de tomar decisões financeiras.

## 📋 Sumário

- [Funcionalidades](#funcionalidades)  
- [Tecnologias Utilizadas](#tecnologias-utilizadas)  
- [Estrutura do Projeto](#estrutura-do-projeto)  
- [Fluxo da Aplicação](#fluxo-da-aplicação)  
- [Como Rodar Localmente](#como-rodar-localmente)  
- [Testes](#testes)
- [Scripts Disponíveis](#scripts-disponiveis)  
- [Decisões de Arquitetura](#decisoes-de-arquitetura)  
- [Contribuição](#contribuicao)  
- [Licença](#licenca)

## 🖥️ Funcionalidades
- Simulação de crédito baseada em:
  - Valor do empréstimo
  - Prazo de pagamento (meses)
  - Data de nascimento do cliente
- Cálculo de parcelas fixas usando fórmula PMT
- Taxa de juros anual definida por faixa etária:
  - Até 25 anos: 5% a.a.
  - 26 a 40 anos: 3% a.a.
  - 41 a 60 anos: 2% a.a.
  - Acima de 60 anos: 4% a.a.
- Resultado da simulação com:
  - Valor das parcelas mensais
  - Valor total a pagar
  - Total de juros pagos
- Dark mode suportado via contexto
- Feedback visual com animações Lottie
- Simulação de resposta do backend (sucesso ou erro) no frontend

## 🛠 Tecnologias Utilizadas

- **Frontend:** React 19, Next.js 15, TypeScript 5  
- **Estilização:** Tailwind CSS 4  
- **Componentes e animações:** React-datepicker, Lottie, Recharts, React Icons  
- **Data e validação:** date-fns  
- **Testes:** Jest, Testing Library

## 📁 Estrutura do Projeto
A estrutura de diretórios do projeto é a seguinte:
```
credit-simulator/
├── 📁 app/
│   ├── 📁 finalization/
│   ├── 📁 simulation/
│   │   ├── 📁 loan-details/
│   │   ├── 📁 personal-data/
│   │   ├── 📁 summary/    
├── 📁 public
│   ├── 📁 icons/
├── 📁 src/
│   ├── 📁 __tests__
│   ├── 📁 __mocks__
│   ├── 📁 assets/
│   │   ├── 📁 animations/
│   │   ├── 📁 docs/
│   │   ├── 📁 icons/
│   │   ├── 📁 images/   
│   ├── 📁 componentes
│   ├── 📁 consts/
│   ├── 📁 contexts
│   ├── 📁 hooks/
│   ├── 📁 utils/
└── arquivos de configuração do projeto
```

### 🗂️ Explicação das pastas:

- app: Pasta principal de páginas do Next.js usando App Router.
  - finalization: Páginas de finalização da simulação (sucesso ou erro).
  - simulation: Páginas da simulação de crédito.
    - loan-details: Inserção do valor do empréstimo e prazo.
    - personal-data: Inserção da data de nascimento.
    - summary: Resultado da simulação com gráficos e resumo financeiro.
- public: Arquivos estáticos acessíveis publicamente.
  - icons: Ícones da aplicação, incluindo favicon e logos.
- src: Código-fonte da aplicação.
    - __mocks__: Mocks para testes, como imagens e hooks simulados.
    - __tests__: Testes unitários e de integração.
    - assets: Recursos visuais e animações.
      - animations: Arquivos Lottie.
      - docs: Imagens para documentação.
      - icons: Ícones específicos.
      - images: Ilustrações e imagens da aplicação.
    - components: Componentes reutilizáveis de UI.
    - consts: Constantes, mensagens, tipos e dados fixos.
    - contexts: Contextos do React para estado global (Theme, Simulation).
    - hooks: Hooks personalizados (useLoanChartData, useRouteGuard, etc).
    - utils: Funções utilitárias (cálculos financeiros, validações, formatação).
- arquivos de configuração do projeto: Next.js, TypeScript, ESLint, Tailwind, Prettier, Jest etc.

## 🔄 Fluxo da Aplicação

### 🔁 Diagrama de Fluxo de Dados

O diagrama abaixo representa o fluxo de dados do simulador de crédito, destacando as principais etapas do processamento — desde a entrada dos dados pelo usuário até a geração da simulação final.

![Diagrama de fluxo de dados](https://raw.githubusercontent.com/marimunari/credit-simulator/master/src/assets/docs/data_flow_diagram.jpg)

1. Usuário informa **data de nascimento** → valida idade mínima 18 anos
2. Usuário preenche **valor do empréstimo** e **prazo**  
3. Aplicação calcula:
   - Parcelas mensais
   - Valor total a pagar
   - Total de juros pagos
4. Usuário envia simulação → redireciona para **Finalization**  
   - Resultado aleatório: sucesso ou erro (simulação de backend)

## ⚙️ Como Rodar Localmente

### 📋 Pré-requisitos
- Node.js >= 18.x
- npm

### 🚀 Passos para rodar o projeto
1. Clone o repositório:
  ```bash
  git clone https://github.com/marimunari/credit-simulator.git
  ```

2. Navegue até a pasta do projeto:
  ```bash
  cd credit-simulator
  ```
  
3. Instale as dependências do projeto:
  ```bash
 npm install
  ```
  
4. Rodar a aplicação em desenvolvimento:
  ```bash
  npm run dev
  ```

5. Abra o frontend da aplicação no seu navegador:
  ```bash
  http://localhost:3000
  ```

### 🚀 Passos para rodar os testes
 Rode o seguinte comando:
  ```bash
  npm test
  ```

## 🧪 Testes  
  - A aplicação conta com testes para hooks, componentes e serviços principais.

## 📜 Scripts Disponíveis

| Script           | Descrição                                                                 |
|------------------|---------------------------------------------------------------------------|
| `dev`            | Inicia a aplicação em modo desenvolvimento usando Next.js com Turbopack. |
| `build`          | Gera a build de produção da aplicação.                                     |
| `start`          | Inicia a aplicação em modo produção.                                      |
| `lint`           | Executa o ESLint para verificar problemas de lint no código.              |
| `lint:fix`       | Executa o ESLint e corrige automaticamente os problemas encontrados.     |
| `format`         | Executa o Prettier para formatar todo o código do projeto.                |
| `test`           | Executa os testes configurados com Jest.                                   |

## 🏗 Decisões de Arquitetura
- Context API para gerenciar dados da simulação e tema (dark/light mode).
- Next.js App Router (app/) para páginas e layouts.
- Hooks personalizados (useLoanChartData, useRouteGuard) para lógica de simulação e navegação protegida.
- Componentes reutilizáveis (Button, Input, Card, Charts) com integração de tema.
- Cálculos financeiros centralizados em loanCalculations.ts.
- Dados da simulação armazenados no sessionStorage para persistência temporária.

## 📄 Licença
Este projeto está licenciado sob a [Licença MIT](https://github.com/marimunari/credit-simulator/blob/master/LICENSE).

## ✍️ Autor
Desenvolvido por [Mariana Munari](https://github.com/marimunari)
