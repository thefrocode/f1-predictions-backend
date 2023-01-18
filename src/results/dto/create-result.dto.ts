import { IsNotEmpty } from "class-validator"

export class CreateResultDto {
    @IsNotEmpty()
    round_id: number

    p1: number

    p2: number

    p3: number

    p4: number

    p5: number

    pole_position: number

    fastest_lap: number

    driver_of_the_day: number

    highest_overtakes: number
}
