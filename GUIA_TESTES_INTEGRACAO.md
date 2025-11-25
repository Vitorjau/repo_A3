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
# Guia Completo de Testes (Front + Back) – ProtegePet

Versão: 2.0.0 • Data: 24/11/2025

Este guia substitui completamente o anterior e contém o fluxo de inicialização limpo, autenticação (cadastro/login), criação e visualização de animais, adoção, contato, feedback, testes negativos e troubleshooting. Use sempre que reiniciar o ambiente.

---
## 1. Pré-requisitos
- Python 3.12 instalado (evitar Python 3.14 para compatibilidade do SQLAlchemy).
- Node.js (versão LTS recomendada) + npm.
- PowerShell (já em uso).

Verifique rapidamente:
```powershell
py -3.12 --version   # Deve mostrar Python 3.12.x
node -v              # Versão do Node
npm -v               # Versão do npm
```

---
## 2. Inicialização Limpa (Backend)
```powershell
Set-Location 'C:\Users\VitorJau\Desktop\repo\A3-quinta-projeto\Back-end'
if (Test-Path .\venv) { Remove-Item -Recurse -Force .\venv }
py -3.12 -m venv venv
.\venv\Scripts\Activate.ps1
python -m pip install --upgrade pip
pip install -r requirements.txt
python --version
python -c "import sqlalchemy; print('SQLAlchemy', __import__('sqlalchemy').__version__)"
python app.py
```
Esperado no console: servidor rodando em `http://127.0.0.1:3001` e PIN do debugger exibido.

Health check:
```powershell
Invoke-RestMethod -Uri http://127.0.0.1:3001/health -Method GET
```
Resposta esperada:
```json
{"status":"ok","message":"Server is running"}
```

---
## 3. Inicialização Limpa (Front-end)
```powershell
Set-Location 'C:\Users\VitorJau\Desktop\repo\A3-quinta-projeto\Front-end'
if (!(Test-Path .\.env.local)) { "VITE_API_URL=http://localhost:3001" | Out-File -Encoding utf8 .\.env.local }
if (!(Test-Path .\node_modules)) { npm install }
npm run dev
```
Abrir: `http://localhost:5173`.

Verifique no DevTools (Network) que o front chama `GET /animals` logo ao entrar.

---
## 4. Fluxo de Teste – Passo a Passo

### 4.1 Cadastro de ONG
Via interface (aba Login → Cadastro):
Preencha:
- Nome: `ONG Esperança`
- E-mail: `ong.esperanca@example.com`
- Senha: `SenhaForte123`
- Confirmar senha: `SenhaForte123`
- Tipo selecionado: ONG/Protetor

Esperado:
- Toast de sucesso.
- Redirecionamento para Home.

Teste negativo: tentar cadastrar mesmo email novamente → deve exibir erro “E-mail já cadastrado”.

Via API (opcional PowerShell):
```powershell
Invoke-RestMethod -Uri http://127.0.0.1:3001/auth/register -Method POST -Body (@{name='ONG Esperança'; email='ong.esperanca@example.com'; password='SenhaForte123'; role='ong'} | ConvertTo-Json) -ContentType 'application/json'
```

### 4.2 Login da ONG
Interface (aba Login):
- E-mail: `ong.esperanca@example.com`
- Senha: `SenhaForte123`
- Tipo: ONG/Protetor
Esperado: Toast “Login realizado com sucesso!” + volta para Home.

Teste negativo: senha errada → toast de erro “Credenciais inválidas”.

### 4.3 Cadastro de Animal
Navegar para “Cadastrar Animal” (visível após login ONG).
Preencher campos (exemplo completo):
- Nome: `Thor`
- Espécie: `Cachorro`
- Idade: `2 anos`
- Porte: `Médio`
- Temperamento: `Brincalhão e dócil`
- Cidade: `São Paulo, SP`
- Descrição curta: `Cachorro muito alegre e sociável.`
- História completa: `Resgatado de abrigo, adora crianças e outros cães.`
- Status: `Disponível`
- Foto: (upload qualquer imagem pequena)

Enviar.
Esperado:
- Spinner enquanto salva.
- Toast sucesso.
- Redireciona para lista (`Adote um Amigo`).
- Animal aparece imediatamente (lista atualizada via callback).

Teste negativo: deixar “Nome” vazio → toast erro.

### 4.4 Ver Detalhes
Na lista de animais, clicar em “Ver mais” no card de `Thor`.
Esperado: página de detalhes com todos os campos + status “Disponível”.

### 4.5 Cadastro de Adotante
Logout.
Ir para Login → Cadastro.
Preencher:
- Nome: `Carlos Pereira`
- E-mail: `carlos.pereira@example.com`
- Senha: `Teste123!`
- Confirmar senha: `Teste123!`
- Tipo selecionado: Adotante

Login com esse adotante.
Esperado: lista de animais aparece (Thor visível).

### 4.6 Solicitação de Adoção
Entrar no “Ver mais” de `Thor`.
Preencher formulário de adoção:
- Nome: `Carlos Pereira`
- Email: `carlos.pereira@example.com`
- CEP: `01001-000`
- Rua: `Praça da Sé`
- Número: `100`
- Complemento: `Apto 12`
- Bairro: `Sé`
- Cidade: `São Paulo`
- Estado: `SP`
- Mensagem: `Tenho casa com quintal e tempo para brincadeiras.`
Enviar.
Esperado:
- Toast sucesso + redirecionamento para página de sucesso.

Teste negativo: CEP vazio → deve bloquear (se validação implementada) ou enviar erro posterior.

### 4.7 Formulário de Contato
Ir para “Sobre” (`/about`).
- Nome: `Visitante`
- Email: `visitante@example.com`
- Mensagem: `Quero saber como posso ajudar com doações.`
Enviar.
Esperado: toast de sucesso.

### 4.8 Feedback
Na mesma página “Sobre”:
- Mensagem: `Site muito intuitivo, parabéns!`
Enviar.
Esperado: toast sucesso.

### 4.9 Verificação Final
Recarregar a página de lista de animais → `Thor` permanece.
Realizar novo login com credenciais incorretas → bloqueado.
Criar segundo animal para testar filtros (ex.: espécie `Gato`).
Aplicar filtro “Cachorro” → apenas `Thor`.

---
## 5. Testes Via API (Opcional) – PowerShell

Registrar adotante:
```powershell
Invoke-RestMethod -Uri http://127.0.0.1:3001/auth/register -Method POST -Body (@{name='Carlos Pereira'; email='carlos.pereira@example.com'; password='Teste123!'; role='adotante'} | ConvertTo-Json) -ContentType 'application/json'
```
Login adotante:
```powershell
Invoke-RestMethod -Uri http://127.0.0.1:3001/auth/login -Method POST -Body (@{email='carlos.pereira@example.com'; password='Teste123!'; role='adotante'} | ConvertTo-Json) -ContentType 'application/json'
```
Listar animais:
```powershell
Invoke-RestMethod -Uri http://127.0.0.1:3001/animals -Method GET | ConvertTo-Json
```
Criar animal (ONG):
```powershell
Invoke-RestMethod -Uri http://127.0.0.1:3001/animals -Method POST -Body (@{name='Thor'; species='Cachorro'; age='2 anos'; size='Médio'; temperament='Brincalhão'; city='São Paulo, SP'; description='Alegre'; history='Resgatado'; status='Disponível'} | ConvertTo-Json) -ContentType 'application/json'
```

---
## 6. Cenários de Erro (Validar Comportamento)
- Login com email inexistente: deve retornar `Credenciais inválidas`.
- Registro com email duplicado: deve retornar `E-mail já cadastrado`.
- POST /animals faltando campos obrigatórios: retorna `Campos obrigatórios faltando`.
- Adoção com `animal_id` inválido: deve retornar 404 (se rota implementar validação futura).
- Servidor desligado: front mostra erro/toast de falha nas requisições.

---
## 7. Checklist de Sucesso
- [ ] Cadastro ONG funciona.
- [ ] Login ONG bloqueia senha errada.
- [ ] Cadastro animal atualiza lista imediatamente.
- [ ] Cadastro adotante e login funcionam.
- [ ] Lista de animais visível para adotante.
- [ ] Solicitação de adoção gera página de sucesso.
- [ ] Formulário de contato envia sem erro.
- [ ] Feedback envia sem erro.
- [ ] Filtros de espécie/porte/status atuam corretamente.
- [ ] Login falha com credenciais inválidas.

---
## 8. Troubleshooting Rápido
| Problema | Causa Provável | Ação |
|----------|----------------|------|
| Erro TypingOnly / AssertionError | Python 3.14 em uso | Recriar venv com Python 3.12 |
| Porta 3001 não responde | Servidor não iniciou ou caiu | Reiniciar `python app.py` |
| CORS bloqueado | Origem não listada | Conferir `CORS(...)` em `app.py` |
| Animal não aparece após cadastro | Lista não foi atualizada | Verificar callback `onAnimalCreated` e rede |
| Login aceita qualquer senha | Front não chama API | Confirmar import `authAPI` em `Login.tsx` |

---
## 9. Próximos Passos (Evolução)
- Adicionar JWT e header Authorization.
- Restringir POST /animals por role = ONG.
- Paginação em /animals.
- Upload real de imagens (S3/Cloudinary).
- Validação de CEP via API externa.
- Postman Collection + testes automatizados.

---
## 10. TL;DR (Executar Tudo Rápido)
```powershell
# Backend
cd .\Back-end
py -3.12 -m venv venv; .\venv\Scripts\Activate.ps1
pip install -r requirements.txt
python app.py

# Front-end (nova janela)
cd .\Front-end
if (!(Test-Path .env.local)) { echo VITE_API_URL=http://localhost:3001 > .env.local }
npm install
npm run dev
```

Criar ONG + login + cadastrar animal + criar adotante + login adotante + ver animal.

---
## 11. Referências Técnicas Internas
- Autenticação simples: `routes/auth_routes.py`
- Modelo usuários: `database/models.py` (classe `User`)
- Cliente API front: `src/services/api.ts`
- Atualização lista de animais: callback `onAnimalCreated` em `RegisterAnimal.tsx` + função `refreshAnimals()` em `App.tsx`.

---
Qualquer ajuste futuro: incremente versão (ex. 2.1.0) e registre mudanças neste arquivo.


```powershell

# Backend
