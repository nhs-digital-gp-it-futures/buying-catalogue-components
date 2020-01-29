import express from 'express';
import { generateTemplate } from './helpers/templateGenerator';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index', {});
});

router.get('/component/:component', async (req, res) => {
  const name = req.params.component;
  generateTemplate({ name }, 'component');

  res.render(`templates/components/${name}-template`);
});

router.post('/component/:component', async (req, res) => {
  const name = req.params.component;
  const formParams = JSON.parse(req.body.params);
  generateTemplate({ name, formParams, templateType: 'component' });

  res.render(`templates/components/${name}-template`);
});

router.get('/section/:sectionName', async (req, res) => {
  const name = req.params.sectionName;
  generateTemplate({ name }, 'section');

  res.render(`templates/sections/${name}-template`);
});

router.post('/section/:sectionName', async (req, res) => {
  const name = req.params.sectionName;
  const formParams = JSON.parse(req.body.params);
  generateTemplate({ name, formParams, templateType: 'section' });
  res.render(`templates/sections/${name}-template`, {});
});

module.exports = router;
