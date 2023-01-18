import { Prediction } from "src/predictions/entities/prediction.entity";
import { Result } from "src/results/entities/result.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 45
    })
    name: string

    @OneToMany(() => Prediction, (prediction: Prediction) => prediction.category)
    public predictions: Prediction[];

    @OneToMany(() => Result, (result: Result) => result.category)
    public results: Result[];
}
