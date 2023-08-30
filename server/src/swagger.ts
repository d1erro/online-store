import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";

export const setupSwagger = (app) => {
    const config = new DocumentBuilder()
        .setTitle('Members-Only')
        .build()
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/api/docs', app, document);
}
