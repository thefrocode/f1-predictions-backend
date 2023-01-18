import { Injectable } from '@nestjs/common';
import { CreateResultDto } from './dto/create-result.dto';
import { UpdateResultDto } from './dto/update-result.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/categories/entities/category.entity';
import { Connection, Repository } from 'typeorm';
import { Result } from './entities/result.entity';
import { Prediction } from 'src/predictions/entities/prediction.entity';
import { query } from 'express';

@Injectable()
export class ResultsService {
  constructor(private connection: Connection) {}

  @InjectRepository(Category)
  private readonly categoryRepository: Repository<Category>;

  @InjectRepository(Prediction)
  private readonly predictionsRepository: Repository<Prediction>;

  async create(createResultDto: CreateResultDto) {
    const { round_id, ...results } = createResultDto;

    const createdResults: Object[] = [];

    const categories = await this.categoryRepository.find();

    const flattenedCategories = categories.reduce((acc, obj) => {
      acc[obj.name] = obj.id;
      return acc;
    }, {});

    for (const key in results) {
      const newResult = new Result(
        round_id,
        flattenedCategories[key],
        results[key],
      );
      createdResults.push(newResult);
    }

    if (this.saveResults(createdResults, round_id)) {
      return 'Team Saved Successfully';
    } else {
      return 'Error Occurred';
    }
  }

  findAll() {
    return `This action returns all results`;
  }

  async findOne(player_id: number, round_id:number) {
    const championshipRoundPoints = await this.predictionsRepository
      .createQueryBuilder('predictions')
      .innerJoin('predictions.player', 'player')
      .select('player.name, SUM(points_scored) as total_points')
      .where('player_id = :player_id', { player_id })
      .andWhere('round_id = :round_id', { round_id })
      .getRawOne();

    const totalPoints = await this.predictionsRepository
      .createQueryBuilder('predictions')
      .innerJoin('predictions.player', 'player')
      .select('player.name, sum(points_scored) as total_points')
      .where('player_id = :player_id', { player_id })
      .getRawOne();

    return {
      championship_round_points: championshipRoundPoints,
      total_points: totalPoints
    }
  }

  update(id: number, updateResultDto: UpdateResultDto) {
    return `This action updates a #${id} result`;
  }

  remove(id: number) {
    return `This action removes a #${id} result`;
  }
  async saveResults(results, round_id) {
    const queryRunner = this.connection.createQueryRunner();

    await queryRunner.connect();

    await queryRunner.startTransaction();
    try {
      queryRunner.manager
        .createQueryBuilder(Prediction, 'predictions')
        .update()
        .set({
          points_scored: 0,
        })
        .where('round_id = :round_id', { round_id })
        .execute();

      for (const result of results) {
        queryRunner.manager
          .createQueryBuilder()
          .insert()
          .into(Result)
          .values(result)
          .orUpdate({
            conflict_target: ['round_id', 'category_id'],
            overwrite: ['winner_id'],
          })
          .execute();
        queryRunner.manager
          .createQueryBuilder(Prediction, 'predictions')
          .update()
          .set({
            points_scored: 1,
          })
          .where('round_id = :round_id', { round_id: result.round_id })
          .andWhere('category_id = :category_id', {
            category_id: result.category_id,
          })
          .andWhere('selected_driver_id = :winner_id', {
            winner_id: result.winner_id,
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

  async getLeaderBoard() {
    const leaderboard = await this.predictionsRepository
      .createQueryBuilder('predictions')
      .innerJoin('predictions.player', 'player')
      .select('player.name, sum(points_scored) as total_points')
      .groupBy('player_id')
      .addOrderBy('total_points', 'DESC')
      .getRawMany();

    return leaderboard;
  }
}
