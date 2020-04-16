import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    Unique,
    BaseEntity,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import { Actions } from '../actions/actions.entity';

@Entity()
@Unique(['name'])
export class Roles extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    name: string;

    @ManyToMany(type => Actions, { cascade: true, nullable: true })
    @JoinTable({ name: 'roles_actions ' })
    actions: Promise<Actions[]>;
}
