import express from 'express';
import nunjucks from 'nunjucks';
import { App } from '../../app';

export const createTestHarness = (macroWrapper, componentContext) => {

  const app = new App().createApp();
  const router = express.Router();
  
  const dummyRouter = router.get('/', (req, res) => {
    const viewToTest = nunjucks.renderString(macroWrapper, componentContext);
    res.send(viewToTest);
  });

  app.use(dummyRouter);
  return app;
}