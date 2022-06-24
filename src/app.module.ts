import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DistancesModule } from './distances/distances.module';
import { AddressesService } from './addresses/addresses.service';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: ':memory:',
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    DistancesModule,
  ],
  controllers: [AppController],
  providers: [AppService, AddressesService],
})
export class AppModule {}
