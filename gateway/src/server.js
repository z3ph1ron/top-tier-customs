import { createApp } from "./index.js";
import { env } from "./config/env.js";

const app = createApp();

app.listen(env.PORT, () => {
  console.log(`api/gateway live on localhost:${env.PORT}`);
});
