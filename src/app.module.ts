import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstMiddleware } from './middlewares/first.middleware';
import { SecondMiddleware } from './middlewares/second.middleware';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    HelmetMiddleware.configure({});
    consumer
      .apply(HelmetMiddleware)
      .forRoutes('')
      .apply(FirstMiddleware)
      .forRoutes('')
      .apply(SecondMiddleware)
      .forRoutes('');
  }
}
