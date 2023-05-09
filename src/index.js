import app from "./app.js";
import "./database";
import config from "./config";

const { swaggerDocs: V1SwaggerDocs } = require("./routes/swagger");

app.listen(config.PORT, () => {
  console.log("blog server running on port");
  V1SwaggerDocs(app, config.PORT);
});
