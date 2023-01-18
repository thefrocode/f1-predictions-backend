import { Module } from '@nestjs/common';
import { ResultsService } from './results.service';
import { ResultsController } from './results.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Result } from './entities/result.entity';
import { Category } from 'src/categories/entities/category.entity';
import { Prediction } from 'src/predictions/entities/prediction.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Result,Category,Prediction])],
  controllers: [ResultsController],
  providers: [ResultsService]
})
export class ResultsModule {}
