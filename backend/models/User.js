const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'Email é obrigatório'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'Senha é obrigatória'],
    minlength: [6, 'Senha deve ter no mínimo 6 caracteres'],
    select: false, // Não retorna senha por padrão em queries
  },
  userType: {
    type: String,
    enum: ['freelancer', 'employer'],
    required: true,
  },
  name: {
    type: String,
    required: function() {
      return this.userType === 'freelancer';
    },
  },
  companyName: {
    type: String,
    required: function() {
      return this.userType === 'employer';
    },
  },
  phone: {
    type: String,
    trim: true,
  },
  document: {
    type: String, // CPF ou CNPJ
    trim: true,
  },
  profileImage: {
    type: String,
    default: null,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash da senha antes de salvar
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Método para comparar senha
userSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw error;
  }
};

// Atualizar updatedAt antes de salvar
userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('User', userSchema);
