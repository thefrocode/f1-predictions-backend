import { Injectable } from '@nestjs/common';
import { CreatePredictionDto } from './dto/create-prediction.dto';
import { UpdatePredictionDto } from './dto/update-prediction.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Prediction } from './entities/prediction.entity';
import { Connection, Repository, getConnection, getConnectionManager, getManager } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';


@Injectable()
export class PredictionsService {

  constructor(private connection: Connection){

  }
  

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  async create(createPredictionDto: CreatePredictionDto) {
    const { round_id, player_id, ...predictions } = createPredictionDto;

    const createdPredictions: Object[] = []

    const categories = await this.categoryRepository.find()

    const flattenedCategories = categories.reduce((acc, obj) => {
      acc[obj.name] = obj.id;
      return acc;
    }, {});
    
    for (const key in predictions) {
      const newPrediction = new Prediction(round_id, player_id, flattenedCategories[key], predictions[key] )
      createdPredictions.push(newPrediction)
    }
    
    
    if(this.savePredictions(createdPredictions)){
      return 'Team Saved Successfully';
    }else{
      return 'Error Occurred'
    }

    
  }

  findAll() {
    return `This action returns all predictions`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prediction`;
  }

  update(id: number, updatePredictionDto: UpdatePredictionDto) {
    return `This action updates a #${id} prediction`;
  }

  remove(id: number) {
    return `This action removes a #${id} prediction`;
  }

  async savePredictions(predictions){
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect()

    await queryRunner.startTransaction();
    try {

      for(const prediction of predictions){
        queryRunner.manager
        .createQueryBuilder()
        .insert()
        .into(Prediction)
        .values(prediction)
        .orUpdate({conflict_target:['round_id','player_id','category_id'], overwrite:['selected_driver_id']})
        .execute()
        
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
