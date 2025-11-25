ProtegePet — Plataforma de Adoção de Animais
Um projeto full‑stack para conectar animais resgatados a famílias. Front-end em React + TypeScript (Vite) e Back-end em Flask (Python) com SQLite via SQLAlchemy.

🔎 Visão Geral
Front-end: React + TypeScript (Vite), UI baseada em componentes.
Back-end: Flask, Flask-SQLAlchemy, endpoints REST para gerenciar animais, adoções, contatos e feedback.
Objetivo: permitir ONGs e protetores cadastrarem animais, receber solicitações de adoção e permitir que adotantes entrem em contato.
📁 Estrutura do Repositório
🚀 Como rodar localmente
1) Back-end (Flask)
Requisitos: Python 3.10+ (ou compatível)

No terminal:

API rodando por padrão em: http://localhost:3001
Health check: GET http://localhost:3001/health
Se quiser outro host/porta, ajuste app.run(...) em app.py ou exporte/defina variáveis de ambiente conforme config.py.

2) Front-end (React + Vite)
Requisitos: Node.js (16+) e npm

No terminal:

Front-end disponível em: http://localhost:5173 (por padrão do Vite)
A URL da API pode ser configurada em .env.local com:
📡 Endpoints principais
GET /animals — listar animais

GET /animals/:id — detalhes de um animal

POST /animals — criar animal

PUT /animals/:id — atualizar animal

DELETE /animals/:id — deletar animal

POST /adoption — criar solicitação de adoção

GET /adoption — listar solicitações

PUT /adoption/:id — atualizar status

POST /contact — enviar mensagem de contato

POST /feedback — enviar feedback

GET /health — health-check

(Consulte routes para mensagens/formatos exatos de request/response)

🧪 Testes rápidos (manuais)
Inicie backend e frontend.
Acesse o site (http://localhost:5173).
Vá até “Adote um Amigo” — a lista deve vir da API.
Clique em “Cadastrar Animal” (como ONG) e envie o formulário — verifique se o animal aparece.
Abra um animal e preencha o formulário de adoção — confira se a solicitação foi criada no back-end.
Envie mensagem via página “Sobre” → formulário de contato e envie feedback.
Também há arquivos de documentação no repositório:

GUIA_TESTES_INTEGRACAO.md
EXEMPLOS_REQUISICOES_API.md
CHECKLIST_RAPIDO.md
🛠️ Observações técnicas e pontos importantes
O front usa um API client central em api.ts. Configure VITE_API_URL em .env.local.
O projeto usa TypeScript — para evitar erros, execute npm install no Front-end antes de rodar.
O backend cria o banco automaticamente (SQLite em instance/ por padrão).
CORS já configurado no app.py para permitir acesso do Vite (localhost:5173).
✅ O que foi implementado (resumido)
API REST completa para animais, adoções, contatos e feedback.
Front-end integrado: busca de animais, cadastro de animal, envio de adoção, formulários de contato/feedback.
Client centralizado de API, toasts e loading states.
Documentação e exemplos de requisição incluídos.
📦 Dependências principais
Back-end:

Flask, Flask-CORS, Flask-SQLAlchemy, SQLAlchemy
Front-end:

React, Vite, TypeScript, Tailwind UI components (shadcn-style), Sonner (toasts), Lucide icons
Veja requirements.txt e package.json para versões completas.

📝 Licença
(MIT)

