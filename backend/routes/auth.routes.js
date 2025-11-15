const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const fs = require('fs');
const path = require('path');

const usersFilePath = path.join(__dirname, '../data/users.json');
const profilesFilePath = path.join(__dirname, '../data/profiles.json');

// Funções auxiliares para ler/escrever JSON
const readJSON = (filePath) => {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
};

const writeJSON = (filePath, data) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};

// Validações
const registerValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('Senha deve ter no mínimo 6 caracteres'),
  body('userType').isIn(['freelancer', 'employer']).withMessage('Tipo de usuário inválido'),
  body('name').if(body('userType').equals('freelancer')).notEmpty().withMessage('Nome é obrigatório'),
  body('companyName').if(body('userType').equals('employer')).notEmpty().withMessage('Nome da empresa é obrigatório'),
];

const loginValidation = [
  body('email').isEmail().normalizeEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('Senha é obrigatória'),
];

// Função para gerar token JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET || 'secret-key-easymusic', {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });
};

// POST /api/auth/register - Registrar novo usuário
router.post('/register', registerValidation, async (req, res) => {
  try {
    console.log('📥 Requisição de registro recebida');
    console.log('📝 Dados recebidos:', req.body);
    
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('❌ Erros de validação:', errors.array());
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { email, password, userType, name, companyName, phone, document } = req.body;

    // Ler usuários existentes
    const users = readJSON(usersFilePath);
    console.log('📂 Total de usuários existentes:', users.length);

    // Verificar se email já existe
    const existingUser = users.find(u => u.email === email);
    if (existingUser) {
      console.log('❌ Email já existe:', email);
      return res.status(400).json({ 
        success: false,
        error: 'Email já cadastrado' 
      });
    }

    console.log('🔐 Gerando hash da senha...');
    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar novo usuário
    const newUser = {
      _id: Date.now().toString(),
      email,
      password: hashedPassword,
      userType,
      name: userType === 'freelancer' ? name : undefined,
      companyName: userType === 'employer' ? companyName : undefined,
      phone,
      document,
      isActive: true,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    writeJSON(usersFilePath, users);
    console.log('✅ Usuário salvo no arquivo users.json');

    // Criar perfil vazio
    const profiles = readJSON(profilesFilePath);
    const newProfile = {
      _id: Date.now().toString() + '-profile',
      userId: newUser._id,
      bio: '',
      genres: [],
      instruments: [],
      location: {},
      hourlyRate: null,
      socialMedia: {},
      createdAt: new Date().toISOString(),
    };
    profiles.push(newProfile);
    writeJSON(profilesFilePath, profiles);
    console.log('✅ Perfil criado');

    // Gerar token
    const token = generateToken(newUser._id);
    console.log('🔑 Token gerado');

    console.log('✅ Registro concluído com sucesso!');
    res.status(201).json({
      success: true,
      message: 'Usuário registrado com sucesso! ✅',
      token,
      user: {
        id: newUser._id,
        email: newUser.email,
        userType: newUser.userType,
        name: newUser.name || newUser.companyName,
      },
    });
  } catch (error) {
    console.error('❌ Erro no registro:', error);
    console.error('Erro no registro:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao registrar usuário' 
    });
  }
});

// POST /api/auth/login - Login de usuário
router.post('/login', loginValidation, async (req, res) => {
  try {
    // Verificar erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    const { email, password } = req.body;

    // Ler usuários
    const users = readJSON(usersFilePath);

    // Buscar usuário
    const user = users.find(u => u.email === email);
    if (!user) {
      return res.status(401).json({ 
        success: false,
        error: 'Email ou senha incorretos' 
      });
    }

    // Verificar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ 
        success: false,
        error: 'Email ou senha incorretos' 
      });
    }

    // Verificar se usuário está ativo
    if (!user.isActive) {
      return res.status(401).json({ 
        success: false,
        error: 'Usuário inativo' 
      });
    }

    // Gerar token
    const token = generateToken(user._id);

    res.json({
      success: true,
      message: 'Login realizado com sucesso! ✅',
      token,
      user: {
        id: user._id,
        email: user.email,
        userType: user.userType,
        name: user.name || user.companyName,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao realizar login' 
    });
  }
});

// GET /api/auth/me - Obter dados do usuário logado
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ 
        success: false,
        error: 'Token não fornecido' 
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key-easymusic');
    const users = readJSON(usersFilePath);
    const user = users.find(u => u._id === decoded.userId);

    if (!user) {
      return res.status(404).json({ 
        success: false,
        error: 'Usuário não encontrado' 
      });
    }

    res.json({
      success: true,
      id: user._id,
      email: user.email,
      userType: user.userType,
      name: user.name || user.companyName,
      phone: user.phone,
      document: user.document,
      profileImage: user.profileImage,
      createdAt: user.createdAt,
    });
  } catch (error) {
    console.error('Erro ao buscar usuário:', error);
    res.status(401).json({ 
      success: false,
      error: 'Token inválido' 
    });
  }
});

module.exports = router;
