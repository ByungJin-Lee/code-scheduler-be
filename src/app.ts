import buildApp from "./loaders";
import controller from "./controllers";

const app = buildApp();

app.then((pp) => {
  pp.use(controller);
});

export default app;
