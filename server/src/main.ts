import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setupSwagger } from './swagger';

async function bootstrap() {
    const PORT = process.env.BACKEND_PORT || 5000;
    const app = await NestFactory.create(AppModule);
    app.setGlobalPrefix('api');

    setupSwagger(app);

    await app.listen(PORT, () =>
        console.log(`Server started on port = ${PORT}`),
    );
}
bootstrap();
