import { Category } from 'src/categories/entities/category.entity';
import { ChampionshipRound } from 'src/championship-rounds/entities/championship-round.entity';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Column,  Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('results')
export class Result {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  round_id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  category_id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  winner_id: number;

  @ManyToOne((type) => ChampionshipRound, (round) => round.results)
  @JoinColumn({ name: 'round_id' })
  championship_round: ChampionshipRound;

  @ManyToOne((type) => Category, (category) => category.results)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne((type) => Driver, (driver) => driver.results)
  @JoinColumn({ name: 'winner_id' })
  winner: Driver;

  constructor (round_id: number, category_id: number,
    winner_id: number){
        this.round_id = round_id
        this.category_id = category_id
        this.winner_id = winner_id
        
  }
}
