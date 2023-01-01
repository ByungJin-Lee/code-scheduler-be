import env from "./src/configs/env";
import app from "./src/app";

app.then((pp) => {
  pp.listen(env.PORT, () => {
    console.log(`running at http://localhost:${env.PORT}`);
  });
});
