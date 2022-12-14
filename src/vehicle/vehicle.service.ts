/* eslint-disable prettier/prettier */
import { Inject, Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { Model } from 'mongoose';
import { Vehicle } from 'src/schemas/vehicle.schema';

@Injectable()
export class VehicleService {
  constructor(@Inject('VEHICLE_MODEL')
    private vehicleModel: Model<Vehicle>,
  ){}
  create(createVehicleDto: CreateVehicleDto) : Promise<Vehicle> {
    const createdVehicle = new this.vehicleModel(createVehicleDto);
    return createdVehicle.save();
  }

  findAll(): Promise<Vehicle[]> {
    return this.vehicleModel.find().exec();
  }

  findOne(id: string) {
    return this.vehicleModel.findById(id);
  }

  update(id: number, updateVehicleDto: UpdateVehicleDto) {
    return this.vehicleModel.findByIdAndUpdate(id, updateVehicleDto).exec();
  }

  remove(id: number) {
    return this.vehicleModel.findByIdAndRemove(id);
  }
}
