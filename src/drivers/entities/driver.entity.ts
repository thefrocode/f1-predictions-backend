import { Prediction } from 'src/predictions/entities/prediction.entity';
import { Result } from 'src/results/entities/result.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('drivers')
export class Driver {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type:"varchar",
    nullable: false,
    length:"50"
  })
  name: string;

  @Column({
    type:"blob",
    nullable: false
  })
  photo: string;

  @OneToMany(() => Prediction, (prediction: Prediction) => prediction.selected_driver)
  public predictions: Prediction[];

  @OneToMany(() => Result, (result: Result) => result.winner)
  public results: Result[];
}
