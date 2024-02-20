import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AccountModule } from './account/account.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './prisma/prisma.module';
import { ProductModule } from './product/product.module';
import { ImageModule } from './image/image.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    AccountModule,
    PrismaModule,
    ConfigModule.forRoot({ isGlobal: true }),
    HttpModule,
    ProductModule,
    ImageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
