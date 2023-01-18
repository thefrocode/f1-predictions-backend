import { IsNotEmpty } from "class-validator";

export class CreatePlayerDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly nickname: string;
}
