import express from 'express';

const router = express.Router();

router.get('/', async (req, res) => {
  res.render('index', {});
});

router.get('/component/:componentName', async (req, res) => {
  const { componentName } = req.params;
  res.render(`./components/${componentName}/template`, {});
});

module.exports = router;
