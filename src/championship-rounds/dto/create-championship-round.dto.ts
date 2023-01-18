import { IsNotEmpty } from "class-validator";

export class CreateChampionshipRoundDto {
    @IsNotEmpty()
    country: string

    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    deadline: Date

    @IsNotEmpty()
    start_date: Date

    @IsNotEmpty()
    end_date: Date

    @IsNotEmpty()
    championship_year: number

    @IsNotEmpty()
    round_number: number


}
