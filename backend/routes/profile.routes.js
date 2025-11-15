const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');

const profilesFilePath = path.join(__dirname, '../data/profiles.json');
const usersFilePath = path.join(__dirname, '../data/users.json');

// Funções auxiliares
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

// GET /api/profiles/me - Obter perfil do usuário logado
router.get('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, error: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key-easymusic');
    const profiles = readJSON(profilesFilePath);
    const users = readJSON(usersFilePath);
    
    const profile = profiles.find(p => p.userId === decoded.userId);
    const user = users.find(u => u._id === decoded.userId);
    
    if (!profile) {
      return res.status(404).json({ success: false, error: 'Perfil não encontrado' });
    }

    res.json({
      success: true,
      ...profile,
      user: {
        email: user.email,
        name: user.name || user.companyName,
        phone: user.phone,
      },
    });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ success: false, error: 'Erro ao buscar perfil' });
  }
});

// PUT /api/profiles/me - Atualizar perfil do usuário logado
router.put('/me', async (req, res) => {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      return res.status(401).json({ success: false, error: 'Token não fornecido' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret-key-easymusic');
    const {
      bio,
      musicalGenres,
      instruments,
      skills,
      location,
      hourlyRate,
      availability,
      portfolioLinks,
      yearsOfExperience,
      socialMedia,
    } = req.body;

    const profiles = readJSON(profilesFilePath);
    const profileIndex = profiles.findIndex(p => p.userId === decoded.userId);
    
    if (profileIndex === -1) {
      return res.status(404).json({ success: false, error: 'Perfil não encontrado' });
    }

    profiles[profileIndex] = {
      ...profiles[profileIndex],
      bio,
      musicalGenres,
      instruments,
      skills,
      location,
      hourlyRate,
      availability,
      portfolioLinks,
      yearsOfExperience,
      socialMedia,
      updatedAt: new Date().toISOString(),
    };

    writeJSON(profilesFilePath, profiles);

    res.json({
      success: true,
      message: 'Perfil atualizado com sucesso',
      profile: profiles[profileIndex],
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({ success: false, error: 'Erro ao atualizar perfil' });
  }
});

module.exports = router;

// GET /api/profiles/:id - Obter perfil público de um usuário
router.get('/:id', async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.id }).populate('userId', 'name companyName profileImage');
    
    if (!profile) {
      return res.status(404).json({ error: 'Perfil não encontrado' });
    }

    res.json(profile);
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({ error: 'Erro ao buscar perfil' });
  }
});

// GET /api/profiles - Buscar perfis com filtros
router.get('/', async (req, res) => {
  try {
    const { musicalGenre, city, minRate, maxRate, availability } = req.query;
    
    let filter = {};
    
    if (musicalGenre) {
      filter.musicalGenres = musicalGenre;
    }
    
    if (city) {
      filter['location.city'] = new RegExp(city, 'i');
    }
    
    if (availability) {
      filter.availability = availability;
    }
    
    if (minRate || maxRate) {
      filter.hourlyRate = {};
      if (minRate) filter.hourlyRate.$gte = Number(minRate);
      if (maxRate) filter.hourlyRate.$lte = Number(maxRate);
    }

    const profiles = await Profile.find(filter)
      .populate('userId', 'name companyName profileImage')
      .limit(50);

    res.json(profiles);
  } catch (error) {
    console.error('Erro ao buscar perfis:', error);
    res.status(500).json({ error: 'Erro ao buscar perfis' });
  }
});

module.exports = router;
