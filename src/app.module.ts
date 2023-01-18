import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DriversModule } from './drivers/drivers.module';
import { PlayersModule } from './players/players.module';
import { ChampionshipRoundsModule } from './championship-rounds/championship-rounds.module';
import { PredictionsModule } from './predictions/predictions.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configService } from './config/config.service';
import { CategoriesModule } from './categories/categories.module';
import { ResultsModule } from './results/results.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(configService.getTypeOrmConfig()),
    DriversModule,
    PlayersModule,
    ChampionshipRoundsModule,
    PredictionsModule,
    CategoriesModule,
    ResultsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
