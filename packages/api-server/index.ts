import express from "express";
import * as trpc from "@trpc/server";

// Connect to server express => bring server express adapter
import * as trpcExpress from "@trpc/server/adapters/express";

/*
Create App Router, router how manage route
can add query route,which allow getData, Mutation Route
which allow mutate data, send post reques etc
*/
const appRouter = trpc.router().query("hello", {
  resolve() {
    return "Hello World";
  },
});

const app = express();
const port = 8080;

/*
app.use => direct to /trpc route */
app.use(
  "/trpc",
  trpcExpress.createExpressMiddleware({
    router: appRouter,
    createContext: () => null,
  })
);

app.get("/", (req, res) => {
  res.send("Hello from api-server");
});

app.listen(port, () => {
  console.log(`api-server listening at http://localhost:${port}`);
});
