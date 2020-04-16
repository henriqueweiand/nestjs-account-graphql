import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Actions } from './actions.entity';
import { CreateActionsInput } from './inputs/create-actions.input';

@Injectable()
export class ActionsService {
    constructor(
        @InjectRepository(Actions)
        private actionsRepository: Repository<Actions>,
    ) {}

    async getActions(): Promise<Actions[]> {
        return this.actionsRepository.find();
    }

    async getAction(id: string): Promise<Actions> {
        return this.actionsRepository.findOne({ id });
    }

    public async getById(id: string): Promise<Actions> {
        return await this.actionsRepository.findOne({ id });
    }

    async create(createActionsInput: CreateActionsInput): Promise<Actions> {
        const { name } = createActionsInput;
        const role = this.actionsRepository.create({
            name,
        });

        return await this.actionsRepository.save(role);
    }

    async getMany(actions: string[]): Promise<Actions[]> {
        return await this.actionsRepository.find({
            id: In(actions),
        });
    }
}
