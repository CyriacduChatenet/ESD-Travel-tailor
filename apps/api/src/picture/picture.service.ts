import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { UnsplashPictureArray } from '@travel-tailor/types';

@Injectable()
export class PictureService {

    private city = '';
    
    async findHomeBannerContent() {
        return {
            city: await this.findCity(),
            picture_url: await this.findPicture(await this.city),
        }
    }

    private async findPicture(city: string) {
        try {
            console.log(city);
            const response = await fetch(`https://unsplash.com/napi/search/photos?query=${city}&per_page=20&xp=search-synonym%3Acontrol&orientation=landscape`);
            const data: UnsplashPictureArray = await response.json();
            return data.results[1].urls.regular;
        } catch (error) {
            throw new Error(error);
        }
    }

    private async findCity() {
        try {
            const data = await this.loadCitiesSync();
            const randomCity = data.geonames.geoname[Math.floor(Math.random() * data.geonames.geoname.length)];
            return this.city = randomCity.name;
        } catch(error) {
            throw new Error(error);
        }
    }

    private async loadCitiesSync() {
        const jsonFilePath = path.resolve(__dirname, 'city.json');
        const cities = fs.readFileSync(jsonFilePath, 'utf8');
        return JSON.parse(cities);
    }
}
