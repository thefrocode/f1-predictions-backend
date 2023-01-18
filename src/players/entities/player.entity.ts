import { Prediction } from "src/predictions/entities/prediction.entity";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity('players')
export class Player {
    @PrimaryGeneratedColumn()
    id: number

    @Column({
        type: "varchar",
        length: 200
    })
    name: string

    @Column({
        type: "varchar",
        length: 50
    })
    nickname: string

    @OneToMany(() => Prediction, (prediction: Prediction) => prediction.player)
    public predictions: Prediction[];
}
