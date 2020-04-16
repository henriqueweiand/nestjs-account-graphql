import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Unique,
    BaseEntity,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Actions extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}
