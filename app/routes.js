import express from 'express';
import { generateTemplate } from './helpers/templateGenerator';
import defaultParams from './helpers/defaultParams';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index', {});
});

router.get('/component/:component', async (req, res) => {
  const { component } = req.params;
  const { params } = defaultParams[component];

  generateTemplate({
    component,
    componentName: defaultParams[component].componentName,
    params,
    type: 'component',
  });

  res.render('template');
});

router.post('/component/:component', async (req, res) => {
  const { component } = req.params;
  const params = Object.entries(req.body).reduce((acc, [param, value]) => {
    if (!value) acc[param] = defaultParams[component].params[param];
    else acc[param] = value;
    return acc;
  }, {});

  if (component === 'view-data-bulletlist') {
    params.data = params.data.split(',');
  }

  generateTemplate({
    component,
    componentName: defaultParams[component].componentName,
    params,
    type: 'component',
  });

  res.render('template');
});

router.get('/section/:sectionName', async (req, res) => {
  const { sectionName } = req.params;
  res.render(`./sections/${sectionName}/template`, {});
});

module.exports = router;
