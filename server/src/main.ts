import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { setupSwagger } from "./swagger";

async function start() {
  const PORT = process.env.PORT || 3000;
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix("api");

  setupSwagger(app);

  app.enableCors();

  await app.listen(PORT, () => console.log(`Server started on port = ${PORT}`));
}

start();
