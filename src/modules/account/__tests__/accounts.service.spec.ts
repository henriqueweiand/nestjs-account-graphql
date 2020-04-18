import * as dotenv from 'dotenv';
dotenv.config();

import { getRepositoryToken } from '@nestjs/typeorm';
import { Test, TestingModule } from '@nestjs/testing';
import { Repository } from 'typeorm';
import { Account } from '../account.entity';
import { AccountService } from '../account.service';
import {
    mockAccountRepository,
    MockType,
    mockedAccount,
} from '../../common/__tests__/mock';

describe('AccountService', () => {
    let service: AccountService;
    let repositoryMock: MockType<Repository<Account>>;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AccountService,
                {
                    provide: getRepositoryToken(Account),
                    useFactory: mockAccountRepository,
                },
            ],
        }).compile();
        service = module.get<AccountService>(AccountService);
        repositoryMock = module.get(getRepositoryToken(Account));
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should create a Account', async () => {
        repositoryMock.create.mockReturnValue({ save: () => mockedAccount });

        expect(await service.create(mockedAccount as Account)).toEqual(
            mockedAccount,
        );
        expect(repositoryMock.create).toHaveBeenCalledWith(mockedAccount);
    });
});
