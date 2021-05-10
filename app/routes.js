// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import { sanitize } from 'sanitize-filename';
import { generateTemplate } from './helpers/templateGenerator';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index', {});
});

router.get('/holding', async (req, res) => {
  res.render('views/holding', {
    title: 'Buying Catalogue',
  });
});

router.get('/:templateType', async (req, res) => {
  const { templateType } = req.params;
  res.render(`componentLibraryViewer/${sanitize(templateType)}`);
});

router.get('/components/:componentType', async (req, res) => {
  const { componentType } = req.params;
  res.render(`componentLibraryViewer/components/${sanitize(componentType)}Components`);
});

router.get('/components/:componentType/:component', async (req, res) => {
  const { component: name, componentType } = req.params;
  generateTemplate({ name, templateType: 'component', componentType });

  res.render(`templates/components/${sanitize(componentType)}/components/${sanitize(name)}-template`);
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

  res.render(`templates/components/${sanitize(componentType)}/components/${sanitize(name)}-template`);
});

router.get('/sections/:sectionName', async (req, res) => {
  const name = req.params.sectionName;
  generateTemplate({ name, templateType: 'section' });

  res.render(`templates/sections/${sanitize(name)}-template`);
});

router.post('/sections/:sectionName', async (req, res) => {
  const name = req.params.sectionName;
  const formParams = JSON.parse(req.body.params);
  generateTemplate({ name, formParams, templateType: 'section' });
  res.render(`templates/sections/${sanitize(name)}-template`, {});
});

module.exports = router;
