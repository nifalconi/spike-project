import { Controller, Get, Query, Render } from '@nestjs/common';
import { Crud, CrudController } from '@nestjsx/crud';
import { AddressesService } from 'src/addresses/addresses.service';
import { Distance } from './distance.entity';
import { DistancesService } from './distances.service';

@Crud({
  model: {
    type: Distance,
  },
})
@Controller('distances')
export class DistancesController implements CrudController<Distance> {
  constructor(
    public service: DistancesService,
    public addressService: AddressesService,
  ) {}

  @Get('/calculate-addresses-distance')
  @Render('calculate-distance-between-addresses')
  async calculateAddressesDistance(
    @Query('address1') address1: string,
    @Query('address2') address2: string,
  ): Promise<{ distance: number; address1: string; address2: string }> {
    if (!address1 || !address2) {
      return { distance: 0, address1, address2 };
    }

    const distance = await this.service.getDistanceBetweenAddresses(
      address1,
      address2,
    );

    return { distance, address1, address2 };
  }

  @Get('/past-requests')
  @Render('past-requests')
  async pastRequests() {
    const allDistances = await this.service.getAllDistances();

    return { pastRequests: allDistances };
  }
}
