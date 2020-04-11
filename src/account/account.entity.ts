import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Account {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;
}
