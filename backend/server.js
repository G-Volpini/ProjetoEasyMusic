const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const fs = require('fs');
const path = require('path');

// Carregar variáveis de ambiente
dotenv.config();

// Importar rotas
const authRoutes = require('./routes/auth.routes');
const profileRoutes = require('./routes/profile.routes');
const projectRoutes = require('./routes/project.routes.new');

const app = express();
const PORT = process.env.PORT || 3000;

// Criar diretório data se não existir
const dataDir = path.join(__dirname, 'data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Criar arquivos JSON se não existirem
const dbFiles = ['users.json', 'profiles.json', 'projects.json'];
dbFiles.forEach(file => {
  const filePath = path.join(dataDir, file);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, JSON.stringify([], null, 2));
  }
});

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Servir arquivos estáticos (uploads)
app.use('/uploads', express.static('uploads'));

// Rotas
app.use('/api/auth', authRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/projects', projectRoutes);

// Rota de teste
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'EasyMusic API está funcionando!' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor rodando na porta ${PORT}`);
  console.log(`📁 Dados salvos em: ${dataDir}`);
});

// Tratamento de erros global
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Algo deu errado!', 
    message: process.env.NODE_ENV === 'development' ? err.message : undefined 
  });
});