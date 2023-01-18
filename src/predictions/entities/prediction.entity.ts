import { Category } from 'src/categories/entities/category.entity';
import { ChampionshipRound } from 'src/championship-rounds/entities/championship-round.entity';
import { Driver } from 'src/drivers/entities/driver.entity';
import { Player } from 'src/players/entities/player.entity';
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('predictions')
export class Prediction {
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
  player_id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  category_id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  selected_driver_id: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  points_scored: number;

  @ManyToOne((type) => ChampionshipRound, (round) => round.predictions)
  @JoinColumn({ name: 'round_id' })
  championship_round: ChampionshipRound;

  @ManyToOne((type) => Player, (player) => player.predictions)
  @JoinColumn({ name: 'player_id' })
  player: Player;

  @ManyToOne((type) => Category, (category) => category.predictions)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne((type) => Driver, (driver) => driver.predictions)
  @JoinColumn({ name: 'selected_driver_id' })
  selected_driver: Driver;


  constructor (round_id: number, player_id: number, category_id: number,
    selected_driver_id: number){
        this.round_id = round_id
        this.player_id = player_id
        this.category_id = category_id
        this.selected_driver_id = selected_driver_id
        
  }

}
