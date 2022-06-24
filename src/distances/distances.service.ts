import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { AddressesService } from 'src/addresses/addresses.service';
import { Distance } from './distance.entity';

@Injectable()
export class DistancesService extends TypeOrmCrudService<Distance> {
  constructor(
    @InjectRepository(Distance) repo,
    public addressService: AddressesService,
  ) {
    super(repo);
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
  }

  // Based in https://www.movable-type.co.uk/scripts/latlong.html
  calculateDistance(
    latitude1: number,
    longitude1: number,
    latitude2: number,
    longitude2: number,
  ): number {
    const R = 6371; // Radius of the earth in km
    const dLat = this.deg2rad(latitude2 - latitude1);
    const dLon = this.deg2rad(longitude2 - longitude1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(latitude1)) *
        Math.cos(this.deg2rad(latitude2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
  }

  async getDistanceBetweenAddresses(
    address1: string,
    address2: string,
  ): Promise<number> {
    const request = await this.repo.findOne({
      where: {
        address1,
        address2,
      },
    });
    if (request) {
      return request.distance;
    }
    const { lat, lon } = await this.addressService.getLatLng(address1);
    const { lat: lat2, lon: lon2 } = await this.addressService.getLatLng(
      address2,
    );
    const distance = this.calculateDistance(lat, lon, lat2, lon2);
    const distanceRequest = new Distance();
    distanceRequest.address1 = address1;
    distanceRequest.address2 = address2;
    distanceRequest.distance = distance;
    distanceRequest.createdAt = new Date();
    await this.repo.save(distanceRequest);
    return distance;
  }

  async getAllDistances(): Promise<Distance[]> {
    return await this.repo.find();
  }
}
