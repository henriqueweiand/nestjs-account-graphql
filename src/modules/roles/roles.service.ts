import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Roles } from './roles.entity';
import { RolesInput } from './inputs/roles.input';
import { Actions } from '../actions/actions.entity';

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

    async getMany(roles: string[]): Promise<Roles[]> {
        return await this.rolesRepository.find({
            id: In(roles),
        });
    }

    async create(rolesInput: Omit<RolesInput, 'actions'>): Promise<Roles> {
        const { name } = rolesInput;
        const role = this.rolesRepository.create({
            name,
        });

        return await this.rolesRepository.save(role);
    }

    async update(
        role: Roles,
        rolesInput: Omit<RolesInput, 'actions'>,
    ): Promise<Roles> {
        const roleUpdate = this.rolesRepository.merge(role, rolesInput);

        return await this.rolesRepository.save(roleUpdate);
    }

    async delete(role: Roles): Promise<boolean> {
        await this.rolesRepository.delete(role);

        return true;
    }

    async assign(roles: Roles, actions: Actions[]): Promise<boolean> {
        try {
            roles.actions = Promise.resolve(actions);
            await this.rolesRepository.save(roles);

            return true;
        } catch (e) {
            return false;
        }
    }
}
