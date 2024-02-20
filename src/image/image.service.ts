import { AxiosError } from 'axios';
import FormData = require('form-data');
import { catchError, firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export default class ImageService {
  constructor(
    private configService: ConfigService,
    private httpService: HttpService,
  ) {}

  async uploadImages(imagesBuffer: Buffer[]): Promise<string[]> {
    try {
      let imagesLink: string[] = [];
      for (let i = 0; i < imagesBuffer.length; i++) {
        const formData = new FormData();
        formData.append('image', imagesBuffer[i].toString('base64'));
        const response = await firstValueFrom(
          this.httpService
            .post('https://api.imgur.com/3/image', formData, {
              headers: {
                Authorization: `Client-ID ${this.configService.get('IMGUR_APP_CLIENT_ID')}`,
              },
            })
            .pipe(
              catchError((error: AxiosError) => {
                console.error(error.response.data);
                throw 'Error uploading image to imgur';
              }),
            ),
        );
        if (response.status === 200) {
          imagesLink.push(response.data.data.link);
        } else {
          throw new Error('Error uploading image to imgur');
        }
      }

      return imagesLink;
    } catch (error) {
      console.error(error);
      throw new Error('Error uploading image: ' + error);
    }
  }
}
