import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import e from 'express';

@Injectable()
export class OpencageService {
    constructor(private configService: ConfigService) {}

    async getCurrency(query: { location: string }): Promise<string> {
       try {
        const url = `https://api.opencagedata.com/geocode/v1/json?q=${query.location}&key=${this.configService.get('OPENCAGE_API_KEY')}`;
        const response = await fetch(url);
        const data = await response.json();
        const currency = data.results[0].annotations.currency.iso_code;
        return currency;
       } catch (err) {
        throw new BadRequestException('Invalid location');
       }
      }
}
