import { Injectable } from '@nestjs/common';
import { CreateDriverDto } from './dto/create-driver.dto';
import { UpdateDriverDto } from './dto/update-driver.dto';
import { Driver } from './entities/driver.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class DriversService {

  @InjectRepository(Driver)
  private readonly driverRepository: Repository<Driver>

  create(createDriverDto: CreateDriverDto) {
    const newDriver = this.driverRepository.create(createDriverDto);
    return this.driverRepository.insert(newDriver);
  }

  findAll() {
    return this.driverRepository.find()
  }

  findOne(id: number) {
    return `This action returns a #${id} driver`;
  }

  update(id: number, updateDriverDto: UpdateDriverDto) {
    return `This action updates a #${id} driver`;
  }

  remove(id: number) {
    return `This action removes a #${id} driver`;
  }
}
