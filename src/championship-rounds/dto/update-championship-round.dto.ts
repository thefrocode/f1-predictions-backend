import { PartialType } from '@nestjs/mapped-types';
import { CreateChampionshipRoundDto } from './create-championship-round.dto';

export class UpdateChampionshipRoundDto extends PartialType(CreateChampionshipRoundDto) {}
