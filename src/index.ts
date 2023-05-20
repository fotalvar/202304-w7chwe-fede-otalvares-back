import "./loadEnviroment.js";
import createDebug from "debug";
import mongoose from "mongoose";
import app from "./server/index.js";

const debug = createDebug("social-api:root");

const port = process.env.PORT ?? 4000;

mongoose.set("debug", true);

mongoose.set("toJSON", {
  virtuals: true,
  versionKey: false,
  transform(doc, ret) {
    delete ret._id;
  },
});

const mongoDbConnection = process.env.MONGODB_CONNECTION;

if (!mongoDbConnection) {
  debug(`Can't connect to the server`);
  process.exit(1);
}

app.listen(port, () => {
  debug(`Listening on http://localhost:${port}`);
});

try {
  await mongoose.connect(mongoDbConnection);
} catch (error: unknown) {
  debug(`Can't connect to database ${(error as Error).message}`);
}
