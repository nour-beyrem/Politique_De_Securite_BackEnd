import { HelmetMiddleware } from '@nest-middlewares/helmet';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { FirstMiddleware } from './middlewares/first.middleware';
import { SecondMiddleware } from './middlewares/second.middleware';
import { UserModule } from './user/user.module';
import { CelluleModule } from './cellule/cellule.module';
import { ReunionModule } from './reunion/reunion.module';
import { RapportModule } from './rapport/rapport.module';
import { InformationModule } from './information/information.module';
import { IncidentModule } from './incident/incident.module';
import { PerimetreModule } from './perimetre/perimetre.module';
import { ActifModule } from './actif/actif.module';
import { ExterneModule } from './externe/externe.module';
import { AutorisationModule } from './autorisation/autorisation.module';
import { DocumentModule } from './document/document.module';
import { MatriceModule } from './matrice/matrice.module';
import { ProgrammeModule } from './programme/programme.module';
import { SortieModule } from './sortie/sortie.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'pssi',
      entities: ['dist/**/*.entity.{js,ts}'],
      synchronize: true,
      logging: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserModule,
    CelluleModule,
    ReunionModule,
    RapportModule,
    InformationModule,
    IncidentModule,
    PerimetreModule,
    ActifModule,
    ExterneModule,
    AutorisationModule,
    DocumentModule,
    MatriceModule,
    ProgrammeModule,
    SortieModule,
  ],
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
