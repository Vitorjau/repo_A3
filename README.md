ProtegePet — Plataforma de Adoção de Animais
Um projeto full‑stack para conectar animais resgatados a famílias. Front-end em React + TypeScript (Vite) e Back-end em Flask (Python) com SQLite via SQLAlchemy.

🔎 Visão Geral
Front-end: React + TypeScript (Vite), UI baseada em componentes.
Back-end: Flask, Flask-SQLAlchemy, endpoints REST para gerenciar animais, adoções, contatos e feedback.
Objetivo: permitir ONGs e protetores cadastrarem animais, receber solicitações de adoção e permitir que adotantes entrem em contato.
📁 Estrutura do Repositório
🚀 Como rodar localmente
# Como testar nosso projeto

Olá, professor — este é um guia curto e direto para executar e verificar o funcionamento do projeto (front-end + back-end).

Objetivo: subir os dois servidores localmente, executar os principais fluxos e confirmar respostas esperadas.

Pré-requisitos
- Sistema: Windows (os comandos abaixo são para PowerShell). Git Bash/WSL também funcionam com pequenas adaptações.
- Python 3.11/3.12 instalado (usamos `py -0p` para checar). Se usar Windows, marque "Add Python to PATH" na instalação.
- Node.js + npm instalados.

## 1) Backend (Flask)

- Abra um PowerShell ou no terminal do VS Code e execute:

```powershell
cd 'C:\Users\VitorJau\Desktop\repo\A3-quinta-projeto\Back-end'
Obs ' altere o caminho para o do seu computador '
.\venv\Scripts\Activate.ps1
python app.py
```

- Saída esperada no terminal do back-end: logs do Flask e uma linha de health, por exemplo:

```
 * Running on http://0.0.0.0:3001
```

## 2) Frontend (Vite + React)

- Em outro PowerShell:

```powershell
Set-Location 'C:\Users\VitorJau\Desktop\repo\A3-quinta-projeto\Front-end'
Obs ' altere o caminho para o do seu computador '
npm install
npm run dev
```

- Normalmente o front rodará em `http://localhost:5173`.


## 3) Roteiro resumido sugerido
1. Registrar ONG -> criar animal (OK 201).
2. Registrar adotante -> solicitar adoção (OK 201 e página de sucesso).
3. Voltar como ONG -> aprovar adoção -> animal aparece como "Adotado".
4. Testar exclusão de animal na página Gerenciar.
5. Verificar paginação mudando `page`.

Agradecemos por avaliar nosso trabalho!

📝 Licença
(MIT)

