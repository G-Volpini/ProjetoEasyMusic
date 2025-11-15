# 🎵 Como Testar o EasyMusic

## ✅ Sistema de Armazenamento JSON

O backend agora salva todos os dados em arquivos JSON locais.

### 📁 Localização dos Dados

Os dados ficam salvos em:
```
backend/data/
  ├── users.json      (usuários registrados)
  ├── profiles.json   (perfis dos usuários)
  └── projects.json   (projetos/cards)
```

## 🚀 Como Executar

### 1. Iniciar o Backend

```powershell
cd backend
npm start
```

**Saída esperada:**
```
🚀 Servidor rodando na porta 3000
```

### 2. Iniciar o Frontend (em outro terminal)

```powershell
npm start
```

O site abrirá em `http://localhost:4200`