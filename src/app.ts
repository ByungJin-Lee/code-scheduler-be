import buildApp from "./loaders";
import controller from "./controllers";
import ScheduleService from "./services/ScheduleService";

const app = buildApp();

app.then((pp) => {
  pp.use(controller);

  ScheduleService.run();
});

export default app;
