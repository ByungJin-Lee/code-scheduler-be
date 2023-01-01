import buildApp from "./loaders";

const app = buildApp();

app.then((pp) => {
  pp.use("/", (req, res) => {
    res.send("hello");
  });
});

export default app;
