import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Roles } from './roles.entity';
import { CreateRolesInput } from './inputs/create-roles.input';

@Injectable()
export class RolesService {
    constructor(
        @InjectRepository(Roles)
        private rolesRepository: Repository<Roles>,
    ) {}

    async getRoles(): Promise<Roles[]> {
        return this.rolesRepository.find();
    }

    async getRole(id: string): Promise<Roles> {
        return this.rolesRepository.findOne({ id });
    }

    public async getById(id: string): Promise<Roles> {
        return await this.rolesRepository.findOne({ id });
    }

    async create(createRolesInput: CreateRolesInput): Promise<Roles> {
        const { name } = createRolesInput;
        const role = this.rolesRepository.create({
            name,
        });

        return await this.rolesRepository.save(role);
    }

    async getMany(roles: string[]): Promise<Roles[]> {
        return await this.rolesRepository.find({
            id: In(roles),
        });
    }
}
