#!/bin/bash

cd /Users/marllondiniz/Desktop/projetos/site-dietacalculada

# Remover .git se existir e tiver problemas
if [ -d .git ]; then
    echo "Removendo .git existente..."
    rm -rf .git
fi

# Inicializar repositório
echo "Inicializando repositório Git..."
git init

# Adicionar remote
echo "Adicionando remote..."
git remote add origin https://github.com/marllondiniz/site-diteta.git

# Adicionar arquivos
echo "Adicionando arquivos..."
git add .

# Fazer commit
echo "Fazendo commit..."
git commit -m "Initial commit: Site Dieta Calculada"

# Configurar branch main
echo "Configurando branch main..."
git branch -M main

# Push
echo "Fazendo push para GitHub..."
git push -u origin main

echo "Concluído!"
