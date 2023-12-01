import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';

@Injectable()
export class CarsService {
  private cars: Car[] = [
    // { id: uuid(), brand: 'Toyota', model: 'Corolla' }
  ];

  findAll() {
    return this.cars;
  }

  findOneById(id: string) {
    const car = this.cars.find((car) => car.id === id);
    if (!car) throw new NotFoundException(`Car with id ${id} not found`);
    return car;
  }

  create(createCarDto: CreateCarDto) {
    const newCar: Car = {
      id: uuid(),
      ...createCarDto,
    };
    this.cars.push(newCar);
    return newCar;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    const car = this.findOneById(id);
    const index = this.cars.findIndex((car) => car.id === id);
    this.cars[index] = {
      ...car,
      ...updateCarDto,
      id,
    };
    return this.cars[index];
  }

  delete(id: string) {
    this.findOneById(id);
    this.cars = this.cars.filter((car) => car.id !== id);
    return { deleted: true };
    // const index = this.cars.findIndex((car) => car.id === id);
    // if (index === -1)
    //   throw new NotFoundException(`Car with id ${id} not found`);
    // this.cars.splice(index, 1);
    // return { deleted: true };
  }
}
