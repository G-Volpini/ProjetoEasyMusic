const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fs = require('fs');
const path = require('path');

const projectsFilePath = path.join(__dirname, '../data/projects.json');

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

// GET /api/projects - Listar projetos com filtros e busca
router.get('/', async (req, res) => {
  try {
    const { 
      search, 
      musicalGenre, 
      city, 
      projectType, 
      minBudget, 
      maxBudget
    } = req.query;
    
    let projects = readJSON(projectsFilePath);
    
    // Filtrar apenas projetos ativos
    projects = projects.filter(p => p.status === 'active');
    
    // Busca por texto
    if (search) {
      const searchLower = search.toLowerCase();
      projects = projects.filter(p => 
        p.title?.toLowerCase().includes(searchLower) ||
        p.description?.toLowerCase().includes(searchLower)
      );
    }
    
    // Filtros
    if (musicalGenre) {
      projects = projects.filter(p => p.musicalGenre === musicalGenre);
    }
    
    if (city) {
      projects = projects.filter(p => 
        p.location?.city?.toLowerCase().includes(city.toLowerCase())
      );
    }
    
    if (projectType) {
      projects = projects.filter(p => p.projectType === projectType);
    }
    
    if (minBudget) {
      projects = projects.filter(p => p.budget?.min >= Number(minBudget));
    }
    
    if (maxBudget) {
      projects = projects.filter(p => p.budget?.max <= Number(maxBudget));
    }

    res.json({
      success: true,
      projects,
      total: projects.length
    });
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao buscar projetos' 
    });
  }
});

// GET /api/projects/:id - Obter detalhes de um projeto
router.get('/:id', async (req, res) => {
  try {
    const projects = readJSON(projectsFilePath);
    const project = projects.find(p => p._id === req.params.id);
    
    if (!project) {
      return res.status(404).json({ 
        success: false,
        error: 'Projeto não encontrado' 
      });
    }

    // Incrementar views
    project.views = (project.views || 0) + 1;
    writeJSON(projectsFilePath, projects);

    res.json({
      success: true,
      project
    });
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao buscar projeto' 
    });
  }
});

// POST /api/projects - Criar novo projeto
router.post('/', async (req, res) => {
  try {
    const {
      title,
      description,
      imageUrl,
      musicalGenre,
      tags,
      projectType,
      budget,
      duration,
      location,
      requirements,
      deadline,
      contactPhone,
      authorId,
      authorName
    } = req.body;

    const projects = readJSON(projectsFilePath);

    const newProject = {
      _id: Date.now().toString(),
      title,
      description,
      imageUrl: imageUrl || 'https://via.placeholder.com/686x536',
      musicalGenre,
      tags: tags || [],
      projectType,
      budget,
      duration,
      location,
      requirements,
      deadline,
      contactPhone: contactPhone || '',
      author: {
        userId: authorId,
        name: authorName,
      },
      status: 'active',
      likes: 0,
      views: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    projects.push(newProject);
    writeJSON(projectsFilePath, projects);

    res.status(201).json({
      success: true,
      message: 'Projeto criado com sucesso',
      project: newProject,
    });
  } catch (error) {
    console.error('Erro ao criar projeto:', error);
    res.status(500).json({ 
      success: false,
      error: 'Erro ao criar projeto' 
    });
  }
});

module.exports = router;
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    // Verificar se o usuário é o autor do projeto
    if (project.author.userId.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ error: 'Você não tem permissão para editar este projeto' });
    }

    const {
      title,
      description,
      imageUrl,
      musicalGenre,
      tags,
      projectType,
      budget,
      duration,
      location,
      requirements,
      deadline,
      status,
    } = req.body;

    Object.assign(project, {
      title,
      description,
      imageUrl,
      musicalGenre,
      tags,
      projectType,
      budget,
      duration,
      location,
      requirements,
      deadline,
      status,
    });

    await project.save();

    res.json({
      message: 'Projeto atualizado com sucesso',
      project,
    });
  } catch (error) {
    console.error('Erro ao atualizar projeto:', error);
    res.status(500).json({ error: 'Erro ao atualizar projeto' });
  }

// DELETE /api/projects/:id - Deletar projeto (requer autenticação)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    // Verificar se o usuário é o autor do projeto
    if (project.author.userId.toString() !== req.user.userId.toString()) {
      return res.status(403).json({ error: 'Você não tem permissão para deletar este projeto' });
    }

    await project.deleteOne();

    res.json({ message: 'Projeto deletado com sucesso' });
  } catch (error) {
    console.error('Erro ao deletar projeto:', error);
    res.status(500).json({ error: 'Erro ao deletar projeto' });
  }
});

// POST /api/projects/:id/like - Curtir projeto
router.post('/:id/like', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    project.likes += 1;
    await project.save();

    res.json({ likes: project.likes });
  } catch (error) {
    console.error('Erro ao curtir projeto:', error);
    res.status(500).json({ error: 'Erro ao curtir projeto' });
  }
});

// POST /api/projects/:id/save - Salvar projeto
router.post('/:id/save', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return res.status(404).json({ error: 'Projeto não encontrado' });
    }

    project.saves += 1;
    await project.save();

    res.json({ saves: project.saves });
  } catch (error) {
    console.error('Erro ao salvar projeto:', error);
    res.status(500).json({ error: 'Erro ao salvar projeto' });
  }
});

module.exports = router;
