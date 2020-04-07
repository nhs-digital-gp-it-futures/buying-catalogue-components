// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import { generateTemplate } from './helpers/templateGenerator';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index', {});
});

router.get('/:templateType', async (req, res) => {
  const { templateType } = req.params;
  res.render(`componentLibraryViewer/${templateType}`);
});

router.get('/components/:componentType', async (req, res) => {
  const { componentType } = req.params;
  res.render(`componentLibraryViewer/components/${componentType}Components`);
});

router.get('/components/:componentType/:component', async (req, res) => {
  const { component: name, componentType } = req.params;
  generateTemplate({ name, templateType: 'component', componentType });

  res.render(`templates/components/${componentType}/components/${name}-template`);
});

router.post('/components/:componentType/:component', async (req, res) => {
  const { component: name, componentType } = req.params;
  const formParams = JSON.parse(req.body.params);
  generateTemplate({
    name,
    formParams,
    templateType: 'component',
    componentType,
  });

  res.render(`templates/components/${componentType}/components/${name}-template`);
});

router.get('/sections/:sectionName', async (req, res) => {
  const name = req.params.sectionName;
  generateTemplate({ name, templateType: 'section' });

  res.render(`templates/sections/${name}-template`);
});

router.post('/sections/:sectionName', async (req, res) => {
  const name = req.params.sectionName;
  const formParams = JSON.parse(req.body.params);
  generateTemplate({ name, formParams, templateType: 'section' });
  res.render(`templates/sections/${name}-template`, {});
});

module.exports = router;
