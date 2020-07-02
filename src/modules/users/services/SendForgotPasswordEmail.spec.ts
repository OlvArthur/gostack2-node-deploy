import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import FakeUserTokensRepository from '../repositories/fakes/FakeUserTokensRepository';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

let fakeUsersRepository: FakeUsersRepository;
let fakeMailProvider: FakeMailProvider;
let fakeUserTokensRepository: FakeUserTokensRepository;

let sendForgotPasswordEmailService: SendForgotPasswordEmailService;

describe('SendForgotPasswordEmail', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeUserTokensRepository = new FakeUserTokensRepository();

    sendForgotPasswordEmailService = new SendForgotPasswordEmailService(
      fakeUsersRepository,
      fakeMailProvider,
      fakeUserTokensRepository,
    );
  });

  it('should be able to retrieve the password using email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUsersRepository.create({
      email: 'arthur@inobras.co',
      name: 'Arthur',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'arthur@inobras.co',
    });

    return expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to retrive a non-existing user password', async () => {
    await expect(
      sendForgotPasswordEmailService.execute({
        email: 'arthur@inobras.co',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgotten password token', async () => {
    const generateToken = jest.spyOn(fakeUserTokensRepository, 'generate');

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'jhondoe@example.com',
    });

    return expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
