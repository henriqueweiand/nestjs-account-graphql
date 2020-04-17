import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';

import { Actions } from './actions.entity';
import { ActionsInput } from './inputs/actions.input';

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

    async getMany(actions: string[]): Promise<Actions[]> {
        return await this.actionsRepository.find({
            id: In(actions),
        });
    }

    async create(actionsInput: ActionsInput): Promise<Actions> {
        const { name } = actionsInput;
        const role = this.actionsRepository.create({
            name,
        });

        return await this.actionsRepository.save(role);
    }

    async update(
        action: Actions,
        actionsInput: ActionsInput,
    ): Promise<Actions> {
        const actionUpdate = this.actionsRepository.merge(action, actionsInput);

        return await this.actionsRepository.save(actionUpdate);
    }

    async delete(action: Actions): Promise<boolean> {
        await this.actionsRepository.delete(action);

        return true;
    }
}
