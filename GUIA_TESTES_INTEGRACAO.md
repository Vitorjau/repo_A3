# Guia de Teste - Integração Front-end e Back-end

## 📋 Resumo da Integração

A integração entre o front-end (React) e back-end (Flask) foi completada com sucesso. Aqui está o guia para testar todas as funcionalidades.

---

## 🚀 Como Executar o Projeto

### 1. Inicie o Back-end (Flask)

```powershell
# Acesse a pasta do back-end
cd c:\Users\VitorJau\Desktop\repo\A3-quinta-projeto\Back-end

# Ative o ambiente virtual (se usar)
# python -m venv venv
# .\venv\Scripts\Activate

# Instale as dependências
pip install -r requirements.txt

# Execute o servidor
python app.py
```

O servidor Flask estará rodando em `http://localhost:3001`

### 2. Inicie o Front-end (React + Vite)

```powershell
# Em outro terminal, acesse a pasta do front-end
cd c:\Users\VitorJau\Desktop\repo\A3-quinta-projeto\Front-end

# Instale as dependências (se primeira vez)
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O servidor React estará rodando em `http://localhost:5173`

---

## ✅ Testes de Funcionalidade

### 1. **Teste: Carregar Lista de Animais**
- **URL**: http://localhost:5173
- **Ação**: Navegue para "Adote um Amigo" ou clique em "Animais para Adoção"
- **Esperado**: 
  - ✅ Lista de animais carrega da API
  - ✅ Se o banco de dados estiver vazio, a lista aparecerá vazia
  - ✅ Filtros funcionam normalmente

**Status Esperado**: Animais são carregados via `GET /animals`
````markdown
# Guia de Teste - Integração Front-end e Back-end

Este guia descreve como executar e testar a aplicação completa (Back-end Flask + Front-end React), incluindo comandos PowerShell para criar o ambiente, iniciar/parar o servidor e realizar requisições de teste.

---

## 1) Situação atual (nota automática)

- O `venv` do back-end foi recriado usando Python 3.12 e as dependências de `Back-end/requirements.txt` foram instaladas.
- Se você seguiu os passos anteriores, o servidor Flask pode estar parado — comandos abaixo mostram como iniciar/parar e verificar.

---

## 2) Comandos úteis (PowerShell)

Observação: execute os comandos a partir do diretório do projeto (`c:\Users\VitorJau\Desktop\repo\A3-quinta-projeto`).

Ativar o venv do back-end e iniciar o servidor (foreground):
```powershell
Set-Location 'C:\Users\VitorJau\Desktop\repo\A3-quinta-projeto\Back-end'
.\venv\Scripts\Activate.ps1
python app.py
```

Iniciar o front-end (em outra janela):
```powershell
Set-Location 'C:\Users\VitorJau\Desktop\repo\A3-quinta-projeto\Front-end'
npm install      # (se ainda não instalou)
npm run dev
```

Parar o servidor Flask que estiver ocupando a porta `3001` (força o término do processo):
```powershell
Set-Location 'C:\Users\VitorJau\Desktop\repo\A3-quinta-projeto\Back-end'
$p=(Get-NetTCPConnection -LocalPort 3001 -ErrorAction SilentlyContinue).OwningProcess
if ($p) { Stop-Process -Id $p -Force; Write-Output "Stopped process(es): $p" } else { Write-Output 'No process found on port 3001' }
```

Verificar se a porta `3001` está ouvindo:
```powershell
Test-NetConnection -ComputerName 127.0.0.1 -Port 3001
```

Checar o endpoint health da API (esperado JSON de retorno):
```powershell
Invoke-RestMethod -Uri http://127.0.0.1:3001/health -Method GET
```

---

## 3) Fluxo de teste completo (passo-a-passo)

1. Garantir que o back-end esteja rodando
   - Ative o venv e rode `python app.py` (veja seção anterior).
   - Chame `GET /health` para confirmar: `Invoke-RestMethod -Uri http://127.0.0.1:3001/health -Method GET`.

2. Garantir que o front-end esteja rodando
   - No diretório `Front-end`, rode `npm run dev` e abra `http://localhost:5173`.

3. Testar leitura de animais (lista)
   - `GET /animals` (via PowerShell):
```powershell
Invoke-RestMethod -Uri http://127.0.0.1:3001/animals -Method GET | ConvertTo-Json
```

4. Criar um animal de teste (POST)
   - Exemplo com `Invoke-RestMethod` (PowerShell):
```powershell
$body = @{
  name = 'Rex'
  species = 'Cachorro'
  age = '1 ano'
  size = 'Médio'
  temperament = 'Energético'
  city = 'São Paulo, SP'
  description = 'Filhote de golden retriever'
  history = 'Resgatado de situação de rua'
  status = 'Disponível'
} | ConvertTo-Json

Invoke-RestMethod -Uri http://127.0.0.1:3001/animals -Method POST -Body $body -ContentType 'application/json'
```
   - Verifique `GET /animals` novamente para confirmar inserção.

5. Criar uma solicitação de adoção (POST /adoption)
```powershell
$adopt = @{
  animal_id = 1
  name = 'João da Silva'
  email = 'joao@example.com'
  address = 'Rua Teste, 123, São Paulo, SP'
  message = 'Tenho experiência com animais e quero adotar.'
} | ConvertTo-Json

Invoke-RestMethod -Uri http://127.0.0.1:3001/adoption -Method POST -Body $adopt -ContentType 'application/json'
```

6. Testar formulários de contato e feedback
```powershell
$contact = @{ name='Usuário Teste'; email='teste@example.com'; message='Pergunta sobre adoção' } | ConvertTo-Json
Invoke-RestMethod -Uri http://127.0.0.1:3001/contact -Method POST -Body $contact -ContentType 'application/json'

$feedback = @{ name='Usuário Teste'; email='teste@example.com'; message='Ótimo site!' } | ConvertTo-Json
Invoke-RestMethod -Uri http://127.0.0.1:3001/feedback -Method POST -Body $feedback -ContentType 'application/json'
```

7. Verificar resultados no front-end
   - Recarregue a página do front-end; a lista e detalhes devem refletir as inserções.

---

## 4) Endpoints principais (resumo)

- `GET /health` — health check
- `GET /animals` — lista animais
- `GET /animals/<id>` — detalhes
- `POST /animals` — criar animal
- `POST /adoption` — criar solicitação de adoção
- `POST /contact` — enviar contato
- `POST /feedback` — enviar feedback

---

## 5) Observações sobre o ambiente que executamos aqui

- Neste ambiente eu recriei o `venv` com Python 3.12 e instalei `SQLAlchemy 2.0.23` e demais dependências listadas em `requirements.txt`.
- Iniciei o servidor e verifiquei que `GET /health` respondeu `{"message":"Server is running","status":"ok"}` e `GET /animals` retornou `{"data":[],...}` (sem registros iniciais).

---

## 6) Troubleshooting rápido

- Se `Invoke-RestMethod` retornar "Unable to connect", verifique se o servidor está ativo e se não há firewall bloqueando a porta `3001`.
- Se houver erros relacionados a versões do Python/typing, recrie o `venv` usando Python 3.11/3.12 e reinstale dependências.

---

## 7) Próximos passos (opcionais que posso executar para você)

- Criar um conjunto de seeds (N animais) automaticamente.
- Iniciar o front-end e testar end-to-end interações (eu executo ambos e mostro logs).
- Gerar um `Postman` collection com todas as rotas para facilitar testes manuais.

---

**Data de Atualização**: 24 de Novembro de 2025
**Versão do Guia**: 1.1.0

````

