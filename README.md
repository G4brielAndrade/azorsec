# Azor Sec — Guia de Execução (Windows + VS Code)

Este projeto é um frontend em React (Vite) com Tailwind CSS e componentes shadcn/ui.

## Requisitos
- Node.js 18+
- pnpm 8+ 
- Visual Studio Code

## Como rodar
1. Extraia a pasta `azor-sec-app` deste ZIP para um local do seu PC (ex.: `C:\Projetos\azor-sec-app`).
2. Abra o Visual Studio Code e vá em File > Open Folder... e selecione a pasta `azor-sec-app`.
3. Abra um terminal no VS Code (Terminal > New Terminal) e garanta que você está na pasta do projeto.
4. Instale as dependências:
   pnpm install
5. Inicie o servidor de desenvolvimento:
   pnpm run dev
6. Abra o navegador em:
   http://localhost:5173/

## Fluxo de teste (demo)
1. Tela inicial: insira o número de chip 123456789 e clique em Acessar.
2. Configure: Nome (ex.: João Silva), Tipo de veículo (Carro), Apelido (opcional) e Salvar.
3. Tela pós-configuração: clique em “Simular Rastreador Instalado”.
4. Explore as abas: Início, Track, Alerta, Mais.

## Observações
- Este projeto é apenas o frontend; dados “em tempo real” estão simulados para demonstração.
- Para produção/implantação pública, recomendo fazer build e usar um host estático (Vercel/Netlify) ou integrar com um backend.

## Scripts úteis
- pnpm run dev — servidor de desenvolvimento com HMR
- pnpm run build — build de produção (saída em dist/)
- pnpm run preview — pré-visualização do build localmente

## Suporte
Se precisar de ajuda para implantar, integrar backend ou personalizar o design, fale comigo.

