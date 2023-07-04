import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import * as hbs from 'express-handlebars'
import {DocumentBuilder, SwaggerModule} from "@nestjs/swagger";
import { HttpServer, ValidationPipe } from "@nestjs/common";
import { urlencoded, json } from 'express';
import { auth } from "express-openid-connect";
import { Server } from "socket.io";
import { ServerOptions } from "typeorm";

require("dotenv").config();

async function bootstrap(opts?: Partial<ServerOptions>) {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'), { prefix: "/public"});
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  const instance = hbs.create({
    defaultLayout: 'layout',
    extname: 'hbs',
    layoutsDir: join(__dirname, '..', 'views', "layouts"),
    partialsDir: join(__dirname, '..', 'views', "partials")
  }).engine;

  app.engine('hbs', instance);
  app.setViewEngine('hbs');

  const config = new DocumentBuilder()
      .setTitle('Forum Platform')
      .setVersion('1.0')
      .build();

  app.useGlobalPipes(new ValidationPipe({
    transform: true
  }));

  const authConfig = {
    secret: process.env.AUTH_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    auth0Logout: true,
    authRequired: false
  };

  app.use(auth(authConfig));

  app.use(json({ limit: '50mb' }));
  app.use(urlencoded({ extended: true, limit: '50mb' }));

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const appServer: any = await app.listen(parseInt(process.env.PORT, 10) || 3000);

  const ioServer = new Server(appServer, { cors: { origin: '*' } });
  ioServer.on('connection', (socket) => {
    socket.on('createProjectMessage', (data) => {
      ioServer.emit('createProjectNotification', data);
    });
  });
}

bootstrap();