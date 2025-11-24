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

---

### 2. **Teste: Detalhes do Animal**
- **URL**: http://localhost:5173
- **Ação**: Clique em "Ver mais" em qualquer animal
- **Esperado**:
  - ✅ Página de detalhes carrega corretamente
  - ✅ Informações do animal aparecem

---

### 3. **Teste: Cadastrar Novo Animal (ONG)**
- **URL**: http://localhost:5173/register-animal
- **Pré-requisito**: Faça login como "ONG" primeiro
- **Ação**: 
  1. Clique em "Login" no menu
  2. Selecione "ONG/Protetor"
  3. Navegue para "Cadastrar Animal"
  4. Preencha o formulário com dados de teste
  5. Clique em "Salvar Animal"
- **Esperado**:
  - ✅ Formulário envia dados para `POST /animals`
  - ✅ Mensagem de sucesso aparece
  - ✅ Redireciona para lista de animais

**Dados de teste**:
```json
{
  "name": "Rex",
  "species": "Cachorro",
  "age": "1 ano",
  "size": "Médio",
  "temperament": "Energético",
  "city": "São Paulo, SP",
  "description": "Filhote de golden retriever",
  "history": "Resgatado de situação de rua",
  "status": "Disponível"
}
```

---

### 4. **Teste: Formulário de Adoção**
- **URL**: http://localhost:5173 → Animal Details
- **Ação**:
  1. Clique em "Ver mais" de um animal
  2. Preencha o formulário "Interessado em adotar?"
  3. Clique em "Quero adotar"
- **Esperado**:
  - ✅ Formulário envia dados para `POST /adoption`
  - ✅ Redireciona para página de sucesso
  - ✅ Dados aparecem no banco de dados

**Campos obrigatórios**: Nome, E-mail, Endereço completo, Mensagem

---

### 5. **Teste: Formulário de Contato**
- **URL**: http://localhost:5173/about
- **Ação**:
  1. Preencha o formulário "Entre em Contato"
  2. Clique em "Enviar mensagem"
- **Esperado**:
  - ✅ Dados enviam para `POST /contact`
  - ✅ Mensagem de sucesso aparece
  - ✅ Formulário limpa após sucesso

---

### 6. **Teste: Feedback**
- **URL**: http://localhost:5173/about
- **Ação**:
  1. Rolle até "Feedback e Sugestões"
  2. Escreva uma mensagem
  3. Clique em "Enviar Feedback"
- **Esperado**:
  - ✅ Feedback envia para `POST /feedback`
  - ✅ Mensagem de sucesso aparece

---

## 🔧 Endpoints da API

### Animals
- `GET /animals` - Lista todos os animais
- `GET /animals/<id>` - Obtém um animal específico
- `POST /animals` - Cria um novo animal
- `PUT /animals/<id>` - Atualiza um animal
- `DELETE /animals/<id>` - Deleta um animal

### Adoption
- `GET /adoption` - Lista todas as adoções
- `GET /adoption/<id>` - Obtém uma adoção específica
- `POST /adoption` - Cria uma solicitação de adoção
- `PUT /adoption/<id>` - Atualiza status da adoção

### Contact
- `POST /contact` - Envia mensagem de contato

### Feedback
- `POST /feedback` - Envia feedback

### Health
- `GET /health` - Verifica status do servidor

---

## 🐛 Troubleshooting

### Erro: "Cannot find module 'sonner'"
**Solução**: Instale os pacotes necessários
```powershell
npm install
```

### Erro: "Connection refused on localhost:3001"
**Solução**: 
- Verifique se o servidor Flask está rodando
- Confirme se está na porta correta em `.env.local`

### Erro: "CORS Error"
**Solução**: O back-end já está configurado com CORS. Se persistir:
```python
# Em app.py, verifique:
CORS(app, origins=["http://localhost:5173", ...])
```

### Dados não aparecem após cadastro
**Solução**: 
- Recarregue a página (F5)
- Verifique se o banco de dados foi criado em `Back-end/instance/`

---

## 📁 Estrutura de Arquivos Criados/Modificados

### Novo:
- `Front-end/src/services/api.ts` - Cliente HTTP centralizado
- `Front-end/.env.local` - Configuração da URL da API

### Modificados:
- `Front-end/src/App.tsx` - Integrado com busca de animais da API
- `Front-end/components/pages/RegisterAnimal.tsx` - Conectado ao POST /animals
- `Front-end/components/pages/AnimalDetails.tsx` - Conectado ao POST /adoption
- `Front-end/components/pages/About.tsx` - Conectado a POST /contact e POST /feedback

---

## 📝 Próximos Passos (Opcional)

1. **Implementar Autenticação**
   - Login de usuários e ONGs
   - JWT tokens
   - Proteção de rotas

2. **Upload de Imagens**
   - Integrar Cloudinary ou AWS S3
   - Salvar URLs das imagens no banco

3. **Validação Avançada**
   - Validação de CEP em tempo real
   - Verificação de email
   - Validação de dados de endereço

4. **Notificações**
   - E-mails de confirmação
   - Alertas de status de adoção
   - Notificações em tempo real

---

## ✨ Checklist de Integração

- [x] API client configurado (`src/services/api.ts`)
- [x] Variáveis de ambiente configuradas (`.env.local`)
- [x] Busca de animais integrada (GET /animals)
- [x] Cadastro de animais integrado (POST /animals)
- [x] Formulário de adoção integrado (POST /adoption)
- [x] Formulário de contato integrado (POST /contact)
- [x] Feedback integrado (POST /feedback)
- [x] Loading states implementados
- [x] Error handling implementado
- [x] Toasts de sucesso/erro configurados

---

**Data de Implementação**: 24 de Novembro de 2025
**Versão**: 1.0.0
