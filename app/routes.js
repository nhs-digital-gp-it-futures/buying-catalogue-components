import express from 'express';
import { generateTemplate } from './helpers/templateGenerator';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index', {});
});

router.get('/component/:component', async (req, res) => {
  const { component } = req.params;
  generateTemplate({ component });

  res.render(`templates/${component}-template`);
});

router.post('/component/:component', async (req, res) => {
  const { component } = req.params;
  const formParams = req.body;
  generateTemplate({ component, formParams });

  res.render(`templates/${component}-template`);
});

router.get('/section/:sectionName', async (req, res) => {
  const { sectionName } = req.params;
  res.render(`./sections/${sectionName}/template`, {});
});

module.exports = router;
