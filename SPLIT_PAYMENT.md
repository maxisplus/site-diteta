# Checkout - 100% Hubla

## 📋 Visão Geral

Este projeto direciona o checkout 100% para a Hubla.

## 🔧 Configuração

Não é necessário configurar credenciais de split/Cakto. O redirecionamento é feito via URLs da Hubla.

## 🚀 Como Funciona

1. Usuário clica no botão "GARANTIR PLANO"
2. Frontend chama a API `/api/checkout-split` com o plano selecionado
3. API retorna a URL direta da Hubla para o plano solicitado
4. Usuário é redirecionado para o checkout da Hubla

## 🧪 Testando

1. Execute `npm run dev`
2. Acesse a página de vendas
3. Clique em "GARANTIR PLANO"
4. Verifique o redirecionamento para a Hubla
