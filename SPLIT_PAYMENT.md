# Split de Pagamento - 50% Hubla e 50% Cakto

## 📋 Visão Geral

Este projeto implementa um sistema de split de pagamento que divide 50% do valor para Hubla e 50% para Cakto usando a API do Cakto.

## 🔧 Configuração

### 1. Variáveis de Ambiente

Crie um arquivo `.env.local` na raiz do projeto com as seguintes variáveis:

```env
CAKTO_CLIENT_ID=xFxqzMyHWAXGsWtoyE4WVng0chgaUpgiZBhQk8Fc
CAKTO_CLIENT_SECRET=seu_client_secret_aqui
CAKTO_API_URL=https://api.cakto.com.br

NEXT_PUBLIC_BASE_URL=https://seu-dominio.com
```

### 2. Credenciais da API Cakto

Você precisa:
- **Client ID**: `xFxqzMyHWAXGsWtoyE4WVng0chgaUpgiZBhQk8Fc` ✅ (já configurado)
- **Client Secret**: Obtenha no painel do Cakto (seção "Chaves de API")
- **API URL**: URL base da API do Cakto

## 🚀 Como Funciona

1. Usuário clica no botão "GARANTIR PLANO"
2. Frontend chama a API `/api/checkout-split` com o plano selecionado
3. API cria um checkout na Cakto com split configurado:
   - 50% do valor → Hubla
   - 50% do valor → Cakto
4. Usuário é redirecionado para o checkout criado
5. Após pagamento, o valor é automaticamente dividido entre as duas plataformas

## 📝 Ajustes Necessários

A implementação atual tem um exemplo baseado em padrões comuns de APIs de pagamento. Você precisa ajustar conforme a **documentação oficial da API do Cakto**:

1. **Endpoint de autenticação**: Verificar o endpoint correto para obter o token OAuth2
2. **Endpoint de checkout**: Verificar o endpoint correto para criar checkouts com split
3. **Estrutura do payload**: Ajustar o formato do JSON enviado para a API
4. **Identificadores dos recebedores**: Configurar os IDs corretos da Hubla e Cakto no sistema

## 🔍 Documentação da API Cakto

Consulte a documentação oficial da API do Cakto para:
- Endpoints corretos
- Formato de autenticação
- Estrutura de split de pagamento
- Webhooks (se necessário)

## 🧪 Testando

1. Configure as variáveis de ambiente
2. Execute `npm run dev`
3. Acesse a página de vendas
4. Clique em "GARANTIR PLANO"
5. Verifique os logs do servidor para ver a chamada à API

## ⚠️ Nota Importante

Atualmente, a implementação usa as URLs diretas do Cakto como fallback. Para que o split funcione corretamente, é necessário:

1. Obter o **Client Secret** da API do Cakto
2. Configurar as variáveis de ambiente
3. Ajustar a implementação conforme a documentação oficial da API
