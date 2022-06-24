import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Distance {
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty()
  @Column()
  address1: string;

  @ApiProperty()
  @Column()
  address2: string;

  @ApiProperty()
  @Column()
  distance: number;

  @ApiProperty()
  @Column()
  createdAt: Date;
}
