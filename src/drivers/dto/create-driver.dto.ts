import { IsNotEmpty } from "class-validator";

export class CreateDriverDto {
    @IsNotEmpty()
    readonly name: string;

    @IsNotEmpty()
    readonly photo: string;
}
