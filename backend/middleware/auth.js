const jwt = require('jsonwebtoken');
const User = require('../models/User');

const authMiddleware = async (req, res, next) => {
  try {
    // Obter token do header
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ error: 'Token não fornecido' });
    }
    
    const token = authHeader.substring(7); // Remove "Bearer "
    
    // Verificar token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Buscar usuário
    const user = await User.findById(decoded.userId);
    
    if (!user || !user.isActive) {
      return res.status(401).json({ error: 'Usuário não encontrado ou inativo' });
    }
    
    // Adicionar usuário à requisição
    req.user = {
      userId: user._id,
      email: user.email,
      userType: user.userType,
    };
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Token inválido' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expirado' });
    }
    
    res.status(500).json({ error: 'Erro na autenticação' });
  }
};

module.exports = authMiddleware;
