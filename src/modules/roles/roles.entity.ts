import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Unique,
    BaseEntity,
} from 'typeorm';

@Entity()
@Unique(['name'])
export class Roles extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;
}
