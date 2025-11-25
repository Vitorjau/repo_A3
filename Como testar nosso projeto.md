# Como testar nosso projeto

Olá, professor — este é um guia curto e direto para executar e verificar o funcionamento do projeto (front-end + back-end).

Objetivo: subir os dois servidores localmente, executar os principais fluxos e confirmar respostas esperadas.

Pré-requisitos
- Sistema: Windows (os comandos abaixo são para PowerShell). Git Bash/WSL também funcionam com pequenas adaptações.
- Python 3.11/3.12 instalado (usamos `py -0p` para checar). Se usar Windows, marque "Add Python to PATH" na instalação.
- Node.js + npm instalados.

## 1) Backend (Flask)

- Abra um PowerShell e execute:

```powershell
cd C:\caminho\para\seu\projeto\Back-end    # substitua pelo caminho onde clonou o repositório
# Criar (se necessário) e ativar virtualenv
py -3.12 -m venv venv
.\venv\Scripts\Activate.ps1

# Atualizar pip e instalar dependências
python -m pip install --upgrade pip
python -m pip install -r requirements.txt

# Iniciar servidor
python app.py
```

- Saída esperada no terminal do back-end: logs do Flask e uma linha de health, por exemplo:

```
 * Running on http://0.0.0.0:3001
```

## 2) Frontend (Vite + React)

- Em outro PowerShell:

```powershell
cd C:\caminho\para\seu\projeto\Front-end   # substitua pelo caminho onde clonou o repositório
npm install
npm run dev
```

- Normalmente o front rodará em `http://localhost:5173`.

## 3) Autenticação (Registro + Login + Token)

Agora o fluxo de segurança exige JWT e roles. Há dois perfis:
- `ong`: pode criar/atualizar/deletar animais e aprovar adoções.
- `adotante`: pode apenas visualizar e solicitar adoção.

Endpoints principais:
- `POST /auth/register` (body: name, email, password, role) -> retorna JSON com `data.token` (novo: token também é fornecido no registro).
- `POST /auth/login` (body: email, password, role) -> retorna `data.token`.
- `GET /auth/me` (Authorization: Bearer <token>) -> dados do usuário logado.

Exemplo registro ONG (PowerShell):
```powershell
Invoke-RestMethod -Uri http://localhost:3001/auth/register -Method POST -Body '{"name":"ONG Test","email":"ong@example.com","password":"secret123","role":"ong"}' -ContentType 'application/json'
```
Copie o valor de `data.token` e use em chamadas protegidas:
```powershell
$token = "<COLE_AQUI>"
Invoke-RestMethod -Uri http://localhost:3001/animals -Method POST -Headers @{Authorization="Bearer $token"} -Body '{"name":"Rex","species":"Cachorro","age":"2 anos","size":"Médio","temperament":"Calmo","city":"São Paulo","description":"Teste","history":"Resgatado"}' -ContentType 'application/json'
```

## 4) Página de Gerenciamento (Frontend)

Para usuários com role `ong`, o header exibe o item "Gerenciar" que leva à página `ManageAnimals`:
- Lista animais cadastrados (com status "Disponível" ou "Adotado").
- Botão "Registrar novo" leva ao formulário de criação.
- Botão "Excluir" remove via `DELETE /animals/<id>` (necessita token valido de ONG).

Fluxo recomendado de teste:
1. Registrar ONG e criar 2–3 animais.
2. Abrir página Gerenciar e excluir um animal (lista deve atualizar automaticamente).
3. Abrir detalhes de um animal remanescente e iniciar solicitação de adoção com um usuário adotante (logout, registrar adotante, solicitar).
4. Voltar como ONG, aprovar adoção via botão de aprovação na página de sucesso (chama `PUT /adoptions/<id>/status` com body `{"status":"Approved"}`) e verificar que status do animal muda para "Adotado".

## 5) Health check & testes rápidos (curl / PowerShell)

- Health (back-end):
```powershell
Invoke-RestMethod http://localhost:3001/health
# Esperado: {"status":"ok","message":"Server is running"}
```

- Listar animais (inicialmente vazio):
```bash
curl http://localhost:3001/animals
```

- Criar animal (exemplo):
```bash
curl -X POST http://localhost:3001/animals \
  -H "Content-Type: application/json" \
  -d '{"name":"Belinha","species":"Gato","age":2,"size":"Pequeno","temperament":"Dócil","city":"São Paulo","description":"Gata fofa","history":"Resgatada"}'
```

- Buscar CEP (ViaCEP):
```bash
curl http://localhost:3001/address/01310100
```

- Criar adoção (substitua `animal_id` conforme retorno anterior):
```bash
curl -X POST http://localhost:3001/adoptions \
  -H "Content-Type: application/json" \
  -d '{"animal_id":1,"adopter_name":"João","adopter_email":"joao@example.com","address_cep":"01310100","address_street":"Avenida Paulista","address_number":"1000","address_city":"São Paulo","address_state":"SP"}'
```

- Enviar feedback (feedback.html usa jQuery POST para este endpoint):
```bash
curl -X POST http://localhost:3001/feedback -H "Content-Type: application/json" -d '{"mensagem":"Ótimo site!"}'
```

## 6) Paginação

`GET /animals` aceita `page` e `per_page`:
```powershell
Invoke-RestMethod http://localhost:3001/animals?page=1&per_page=6
```
Resposta inclui:
```json
{
  "success": true,
  "data": {
    "items": [ /* animais */ ],
    "meta": { "page":1, "per_page":6, "total": 12, "pages":2 }
  }
}
```

## 7) Parar os servidores

- No terminal onde cada servidor foi iniciado: `Ctrl+C` (forma mais segura).
- Alternativa (PowerShell) — parar por porta:
```powershell
Get-NetTCPConnection -LocalPort 3001 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
Get-NetTCPConnection -LocalPort 5173 | ForEach-Object { Stop-Process -Id $_.OwningProcess -Force }
```

## 8) O que verificar para avaliar funcionamento
- Health: `GET /health` retorna `{"status":"ok"}`.
- CRUD de animais: `POST /animals` cria; `GET /animals` lista; `GET /animals/<id>` retorna detalhes.
- Busca de CEP: `GET /address/<cep>` retorna rua, bairro, cidade e UF.
- Formulário de adoção: cria registro em `POST /adoptions` com campos de endereço.
- Feedback/Contato: `POST /feedback` e `POST /contact` aceitam mensagens.

## 9) Observações rápidas
- Se ocorrer erro de execução de scripts no PowerShell, rode:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
- Se houver erro de incompatibilidade de pacotes com Python 3.14, use Python 3.12 (o projeto foi testado com 3.11/3.12).

## 10) Roteiro resumido sugerido
1. Registrar ONG -> criar animal (OK 201).
2. Registrar adotante -> solicitar adoção (OK 201 e página de sucesso).
3. Voltar como ONG -> aprovar adoção -> animal aparece como "Adotado".
4. Testar exclusão de animal na página Gerenciar.
5. Verificar paginação mudando `page`.

Agradecemos por avaliar nosso trabalho!
