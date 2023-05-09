import app from "./app";
import "./database";

const { swaggerDocs: V1SwaggerDocs } = require("./routes/swagger");

app.listen(3000, () => {
  console.log("blog server running on port", 3000);
  V1SwaggerDocs(app, 3000);
});
