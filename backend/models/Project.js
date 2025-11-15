const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Título é obrigatório'],
    trim: true,
  },
  description: {
    type: String,
    required: [true, 'Descrição é obrigatória'],
    maxlength: 2000,
  },
  author: {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    name: String,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  musicalGenre: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
  }],
  
  // Tipo de projeto
  projectType: {
    type: String,
    enum: ['show', 'gravacao', 'aula', 'producao', 'outro'],
    default: 'outro',
  },
  
  // Informações do projeto
  budget: {
    min: Number,
    max: Number,
  },
  duration: String, // ex: "2 horas", "1 dia", etc
  location: {
    city: String,
    state: String,
    isRemote: { type: Boolean, default: false },
  },
  
  // Estatísticas
  likes: {
    type: Number,
    default: 0,
  },
  views: {
    type: Number,
    default: 0,
  },
  saves: {
    type: Number,
    default: 0,
  },
  
  // Status
  status: {
    type: String,
    enum: ['active', 'completed', 'cancelled', 'draft'],
    default: 'active',
  },
  
  // Dados extras
  requirements: String,
  deadline: Date,
  
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Atualizar updatedAt antes de salvar
projectSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Índices para busca
projectSchema.index({ title: 'text', description: 'text' });
projectSchema.index({ musicalGenre: 1 });
projectSchema.index({ 'location.city': 1 });

module.exports = mongoose.model('Project', projectSchema);
