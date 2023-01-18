import { Prediction } from 'src/predictions/entities/prediction.entity';
import { Result } from 'src/results/entities/result.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('championship_rounds')
export class ChampionshipRound {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 45,
    nullable: false,
  })
  country: string;

  @Column({
    type: 'varchar',
    length: 200,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'datetime',
    nullable: false,
  })
  deadline: Date;

  @Column({
    type: 'date',
    nullable: false,
  })
  start_date: Date;

  @Column({
    type: 'date',
    nullable: false,
  })
  end_date: Date;

  @Column({
    type: 'int',
    nullable: false,
  })
  championship_year: number;

  @Column({
    type: 'int',
    nullable: false,
  })
  round_number: number;

  @OneToMany(() => Prediction, (prediction: Prediction) => prediction.championship_round)
  public predictions: Prediction[];

  @OneToMany(() => Result, (result: Result) => result.championship_round)
  public results: Result[];
}
