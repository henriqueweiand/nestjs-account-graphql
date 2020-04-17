import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    BeforeInsert,
    Unique,
    BaseEntity,
    ManyToMany,
    JoinTable,
    BeforeUpdate,
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

    @ManyToMany(type => Roles, { cascade: true, nullable: true })
    @JoinTable({ name: 'account_roles ' })
    roles: Promise<Roles[]>;

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }

    async comparePassword(attempt: string): Promise<boolean> {
        return await bcrypt.compare(attempt, this.password);
    }
}
