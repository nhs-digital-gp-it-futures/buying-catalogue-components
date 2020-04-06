// eslint-disable-next-line import/no-extraneous-dependencies
import express from 'express';
import { generateTemplate } from './helpers/templateGenerator';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index', {});
});

router.get('/component/:subType/:component', async (req, res) => {
  const { component: name, subType } = req.params;
  generateTemplate({ name, templateType: 'component', subType });

  res.render(`templates/components/${subType}/${name}-template`);
});

router.post('/component/:subType/:component', async (req, res) => {
  const { component: name, subType } = req.params;
  const formParams = JSON.parse(req.body.params);
  generateTemplate({
    name,
    formParams,
    templateType: 'component',
    subType,
  });

  res.render(`templates/components/${subType}/${name}-template`);
});

router.get('/section/:sectionName', async (req, res) => {
  const name = req.params.sectionName;
  generateTemplate({ name, templateType: 'section' });

  res.render(`templates/sections/${name}-template`);
});

router.post('/section/:sectionName', async (req, res) => {
  const name = req.params.sectionName;
  const formParams = JSON.parse(req.body.params);
  generateTemplate({ name, formParams, templateType: 'section' });
  res.render(`templates/sections/${name}-template`, {});
});

module.exports = router;
