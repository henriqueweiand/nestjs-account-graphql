/* eslint-disable @typescript-eslint/ban-ts-ignore */
import { Account } from 'src/modules/account/account.entity';

export type MockType<T> = {
    [P in keyof T]: jest.Mock<{}>;
};

export const mockedAccount = {
    firstName: 'Test',
    lastName: 'da Silva',
    email: 'teste@gmail.com',
    password: '$2b$10$OX7pm5xpbWqzCZUgQwbbF.BSSMQyQoFspdk5GgxOTR7JaExdGuasi',
} as Account;

export const mockAccountRepository = () => ({
    create: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    getAccounts: jest.fn(),
    find: jest.fn(),
});
