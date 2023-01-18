import { Injectable } from '@nestjs/common';
import { CreatePlayerDto } from './dto/create-player.dto';
import { UpdatePlayerDto } from './dto/update-player.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Player } from './entities/player.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PlayersService {

  @InjectRepository(Player)
  private readonly playerRepository: Repository<Player>


  create(createPlayerDto: CreatePlayerDto) {
    const newPlayer = this.playerRepository.create(createPlayerDto)
    return this.playerRepository.insert(newPlayer)

  }

  findAll() {
    return this.playerRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} player`;
  }

  update(id: number, updatePlayerDto: UpdatePlayerDto) {
    return `This action updates a #${id} player`;
  }

  remove(id: number) {
    return `This action removes a #${id} player`;
  }
}
