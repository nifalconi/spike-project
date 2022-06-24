import { Injectable } from '@nestjs/common';
import fetch from 'node-fetch';

@Injectable()
export class AddressesService {
  async getLatLng(address: string): Promise<any> {
    // TODO: add error handling
    const url = `https://nominatim.openstreetmap.org/search?q=${address}&format=json`;
    const response = await fetch(url);
    const data = await response.json();

    const geodisicInformation = data[0];
    const { lat, lon } = geodisicInformation;
    return { lat, lon };
  }
}
