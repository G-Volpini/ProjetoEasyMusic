const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true,
  },
  // Informações profissionais
  bio: {
    type: String,
    maxlength: 1000,
  },
  musicalGenres: [{
    type: String, // ex: "Pop", "Rock", "Jazz", "Clássico", etc
  }],
  instruments: [{
    type: String, // ex: "Violão", "Piano", "Bateria", etc
  }],
  skills: [{
    type: String, // ex: "Composição", "Produção", "Mixagem", etc
  }],
  
  // Localização
  location: {
    city: String,
    state: String,
    country: { type: String, default: 'Brasil' },
  },
  
  // Preços e disponibilidade
  hourlyRate: {
    type: Number,
    min: 0,
  },
  availability: {
    type: String,
    enum: ['Disponível', 'Parcialmente disponível', 'Indisponível'],
    default: 'Disponível',
  },
  
  // Portfolio
  portfolioLinks: [{
    title: String,
    url: String,
    type: { type: String, enum: ['youtube', 'spotify', 'soundcloud', 'instagram', 'other'] },
  }],
  
  // Experiência
  yearsOfExperience: {
    type: Number,
    min: 0,
  },
  
  // Redes sociais
  socialMedia: {
    instagram: String,
    facebook: String,
    youtube: String,
    spotify: String,
    soundcloud: String,
  },
  
  // Estatísticas
  rating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5,
  },
  completedProjects: {
    type: Number,
    default: 0,
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

// Atualizar updatedAt antes de salvar
profileSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Profile', profileSchema);
