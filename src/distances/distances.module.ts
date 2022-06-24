import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressesService } from 'src/addresses/addresses.service';
import { Distance } from './distance.entity';
import { DistancesController } from './distances.controller';
import { DistancesService } from './distances.service';

@Module({
  imports: [TypeOrmModule.forFeature([Distance])],
  controllers: [DistancesController],
  providers: [DistancesService, AddressesService],
})
export class DistancesModule {}
