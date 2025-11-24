# 🧪 Exemplos de Requisições - API ProtegePet

## 📌 URL Base
```
http://localhost:3001
```

---

## 🐕 Animals (Animais)

### 1. Listar todos os animais
```bash
GET http://localhost:3001/animals
```

**Resposta (200)**:
```json
{
  "success": true,
  "message": "Animais recuperados com sucesso",
  "data": [
    {
      "id": 1,
      "name": "Max",
      "species": "Cachorro",
      "age": "2 anos",
      "size": "Médio",
      "temperament": "Dócil e brincalhão",
      "city": "São Paulo, SP",
      "status": "Disponível",
      "image": "https://...",
      "description": "Max é um cachorro super carinhoso",
      "history": "Resgatado das ruas...",
      "created_at": "2025-11-24T10:30:00",
      "updated_at": "2025-11-24T10:30:00"
    }
  ]
}
```

---

### 2. Obter animal específico
```bash
GET http://localhost:3001/animals/1
```

**Resposta (200)**:
```json
{
  "success": true,
  "message": "Animal recuperado com sucesso",
  "data": {
    "id": 1,
    "name": "Max",
    ...
  }
}
```

---

### 3. Criar novo animal
```bash
POST http://localhost:3001/animals
Content-Type: application/json

{
  "name": "Rex",
  "species": "Cachorro",
  "age": "1 ano",
  "size": "Grande",
  "temperament": "Protetor e leal",
  "city": "Belo Horizonte, MG",
  "description": "Cachorro grande e protetor",
  "history": "Resgatado de situação de abandono",
  "image": "https://images.unsplash.com/...",
  "status": "Disponível"
}
```

**Resposta (201)**:
```json
{
  "success": true,
  "message": "Animal criado com sucesso",
  "data": {
    "id": 7,
    "name": "Rex",
    ...
  }
}
```

---

### 4. Atualizar animal
```bash
PUT http://localhost:3001/animals/1
Content-Type: application/json

{
  "status": "Adotado",
  "age": "3 anos"
}
```

**Resposta (200)**:
```json
{
  "success": true,
  "message": "Animal atualizado com sucesso",
  "data": {
    "id": 1,
    "status": "Adotado",
    ...
  }
}
```

---

### 5. Deletar animal
```bash
DELETE http://localhost:3001/animals/1
```

**Resposta (200)**:
```json
{
  "success": true,
  "message": "Animal deletado com sucesso",
  "data": null
}
```

---

## 📝 Adoption (Adoções)

### 1. Criar solicitação de adoção
```bash
POST http://localhost:3001/adoption
Content-Type: application/json

{
  "animal_id": 1,
  "adopter_name": "João Silva",
  "adopter_email": "joao@email.com",
  "adopter_phone": "(31) 99999-9999",
  "address_cep": "30130-000",
  "address_street": "Rua das Flores",
  "address_number": "123",
  "address_complement": "Apto 45",
  "address_neighborhood": "Centro",
  "address_city": "Belo Horizonte",
  "address_state": "MG",
  "adoption_message": "Amamos animais e temos espaço em nossa casa para cuidar bem."
}
```

**Resposta (201)**:
```json
{
  "success": true,
  "message": "Solicitação de adoção criada com sucesso",
  "data": {
    "id": 1,
    "animal_id": 1,
    "adopter_name": "João Silva",
    "status": "Pending",
    "created_at": "2025-11-24T10:35:00",
    ...
  }
}
```

---

### 2. Listar todas as adoções
```bash
GET http://localhost:3001/adoption
```

**Resposta (200)**:
```json
{
  "success": true,
  "message": "Adoções recuperadas com sucesso",
  "data": [
    {
      "id": 1,
      "animal_id": 1,
      "adopter_name": "João Silva",
      "status": "Pending",
      ...
    }
  ]
}
```

---

### 3. Obter adoção específica
```bash
GET http://localhost:3001/adoption/1
```

---

### 4. Atualizar status da adoção
```bash
PUT http://localhost:3001/adoption/1
Content-Type: application/json

{
  "status": "Approved"
}
```

**Status válidos**: `Pending`, `Approved`, `Rejected`

---

## 📧 Contact (Contato)

### Enviar mensagem de contato
```bash
POST http://localhost:3001/contact
Content-Type: application/json

{
  "name": "Maria Santos",
  "email": "maria@email.com",
  "subject": "Dúvida sobre adoção",
  "message": "Gostaria de saber mais sobre o processo de adoção..."
}
```

**Resposta (201)**:
```json
{
  "success": true,
  "message": "Mensagem de contato recebida com sucesso",
  "data": {
    "id": 1,
    "name": "Maria Santos",
    "email": "maria@email.com",
    "subject": "Dúvida sobre adoção",
    "message": "Gostaria de saber mais...",
    "created_at": "2025-11-24T10:40:00"
  }
}
```

---

## ⭐ Feedback

### Enviar feedback
```bash
POST http://localhost:3001/feedback
Content-Type: application/json

{
  "mensagem": "Adorei o site! Muito intuitivo e útil. Parabéns ao time!"
}
```

**Resposta (201)**:
```json
{
  "success": true,
  "message": "Feedback recebido com sucesso",
  "data": {
    "id": 1,
    "mensagem": "Adorei o site! Muito intuitivo e útil...",
    "created_at": "2025-11-24T10:45:00"
  }
}
```

---

## ❤️ Health Check

### Verificar saúde do servidor
```bash
GET http://localhost:3001/health
```

**Resposta (200)**:
```json
{
  "status": "ok",
  "message": "Server is running"
}
```

---

## 🧪 Testando com cURL

### Exemplo: Listar animais
```bash
curl -X GET http://localhost:3001/animals
```

### Exemplo: Criar animal
```bash
curl -X POST http://localhost:3001/animals \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Bella",
    "species": "Gato",
    "age": "2 anos",
    "size": "Pequeno",
    "temperament": "Carinhosa",
    "city": "São Paulo, SP",
    "description": "Gata calma e carinhosa",
    "history": "Encontrada em um lote abandonado"
  }'
```

### Exemplo: Criar adoção
```bash
curl -X POST http://localhost:3001/adoption \
  -H "Content-Type: application/json" \
  -d '{
    "animal_id": 1,
    "adopter_name": "Pedro Costa",
    "adopter_email": "pedro@email.com",
    "adopter_phone": "(85) 98888-7777",
    "address_cep": "60110-100",
    "address_street": "Avenida Paulista",
    "address_number": "1000",
    "address_city": "Fortaleza",
    "address_state": "CE",
    "adoption_message": "Quero dar um lar amoroso para este animal"
  }'
```

---

## 🔧 Testando com Postman ou Insomnia

1. **Crie uma coleção** chamada "ProtegePet API"
2. **Defina variável de ambiente**:
   - Nome: `base_url`
   - Valor: `http://localhost:3001`

3. **Crie requisições** usando as estruturas acima

4. **Exporte a coleção** para compartilhar com o time

---

## 📊 Fluxo de Teste Recomendado

### Fase 1: Health Check
```bash
GET /health
```
Verifique se o servidor está online ✅

### Fase 2: Animals
```bash
GET /animals          # Listar (deve estar vazio ou ter dados)
POST /animals         # Criar um animal
GET /animals/1        # Buscar o criado
PUT /animals/1        # Atualizar
DELETE /animals/1     # Deletar (opcional)
```

### Fase 3: Adoption
```bash
POST /animals         # Criar animal primeiro
POST /adoption        # Criar solicitação de adoção
GET /adoption         # Listar adoções
PUT /adoption/1       # Aprovar/Rejeitar
```

### Fase 4: Contact & Feedback
```bash
POST /contact         # Enviar contato
POST /feedback        # Enviar feedback
```

---

## ✅ Respostas de Erro

### Campo obrigatório faltando
```json
{
  "success": false,
  "message": "Campos obrigatórios faltando",
  "data": null
}
```
**Status HTTP**: 400

---

### Recurso não encontrado
```json
{
  "success": false,
  "message": "Animal não encontrado",
  "data": null
}
```
**Status HTTP**: 404

---

### Erro interno
```json
{
  "success": false,
  "message": "Erro interno do servidor",
  "data": null
}
```
**Status HTTP**: 500

---

## 💡 Dicas de Teste

1. **Use Postman/Insomnia** para testar endpoints facilmente
2. **Verifique o banco de dados** em `Back-end/instance/` após cada requisição
3. **Monitore o console** do Flask para ver logs
4. **Teste casos de erro** (campos vazios, IDs inválidos)
5. **Verifique os tipos de dados** retornados
6. **Teste CORS** fazendo requisições do front-end

---

## 🔐 Segurança (Futura)

- [ ] Implementar JWT para autenticação
- [ ] Validar entrada de dados (sanitização)
- [ ] Rate limiting
- [ ] HTTPS em produção
- [ ] Proteção de rotas sensíveis

---

**Última atualização**: 24 de Novembro de 2025
**Versão da API**: 1.0.0
