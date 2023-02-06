import { Injectable } from '@nestjs/common';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { UpdatePredictionDto } from './dto/update-prediction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prediction } from './entities/prediction.entity';
import { Connection, Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { resolve } from 'path';

@Injectable()
export class PredictionsService {
  constructor(private connection: Connection) {}

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  @InjectRepository(Prediction)
  private readonly predictionRepository: Repository<Prediction>;

  async create(createPredictionDto: CreatePredictionDto) {
    const { round_id, player_id, ...predictions } = createPredictionDto;

    const createdPredictions: Object[] = [];

    const categories = await this.categoryRepository.find();

    const flattenedCategories = categories.reduce((acc, obj) => {
      acc[obj.name] = obj.id;
      return acc;
    }, {});

    for (const key in predictions) {
      const newPrediction = new Prediction(
        round_id,
        player_id,
        flattenedCategories[key],
        predictions[key],
      );
      createdPredictions.push(newPrediction);
    }

    return createPredictionDto;
  }

  findAll() {
    return `This action returns all predictions`;
  }

  async findOne(round_id: number, player_id: number) {
    const overallPrediction: CreatePredictionDto = {
      round_id,
      player_id,
      p1: 0,
      p2: 0,
      p3: 0,
      p4: 0,
      p5: 0,
      pole_position: 0,
      fastest_lap: 0,
      driver_of_the_day: 0,
      highest_overtakes: 0
    };
    const categories = await this.categoryRepository.find();
    const flattenedCategories = categories.reduce((acc, obj) => {
      acc[obj.id] = obj.name;
      return acc;
    }, {});
    console.log(flattenedCategories);
    const predictions = await this.predictionRepository.find({
      where: { player_id, round_id },
    });

    await Promise.all(
      predictions.map(async (prediction) => {
        overallPrediction[flattenedCategories[prediction.category_id]] =
          prediction.selected_driver_id;
        console.log(overallPrediction);
      }),
    );

    //await for loop of predictions
    // for await(const prediction of predictions) {
    //   console.log(prediction)
    //   console.log(flattenedCategories[prediction.category_id])
    //   prediction[flattenedCategories[prediction.category_id]] = prediction.selected_driver_id
    //   console.log(prediction[flattenedCategories[prediction.category_id]])
    // }
    
    return overallPrediction;
  }

  update(id: number, updatePredictionDto: UpdatePredictionDto) {
    return `This action updates a #${id} prediction`;
  }

  remove(id: number) {
    return `This action removes a #${id} prediction`;
  }

  async savePredictions(predictions) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      for (const prediction of predictions) {
        queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(Prediction)
          .values(prediction)
          .orUpdate({
            conflict_target: ['round_id', 'player_id', 'category_id'],
            overwrite: ['selected_driver_id'],
          })
          .execute();
      }

      await queryRunner.commitTransaction();
    } catch (err) {
      await queryRunner.rollbackTransaction();
      return false;
    } finally {
      await queryRunner.release();
      return true;
    }
  }
}
