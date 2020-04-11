import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    Unique,
    BaseEntity,
    ManyToMany,
    JoinTable,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Roles } from '../roles/roles.entity';

@Entity()
@Unique(['email'])
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @ManyToMany(type => Roles)
    @JoinTable()
    roles: Roles[];

    @BeforeInsert()
    async hashPassword() {
        this.password = await bcrypt.hash(this.password, 10);
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }
}
