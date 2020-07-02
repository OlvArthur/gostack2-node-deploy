import { injectable, inject } from 'tsyringe';
import { differenceInHours } from 'date-fns';

// import User from '@modules/users/infra/typeorm/entities/User';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IUserTokensRepository from '../repositories/IUserTokensRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

interface IRequest {
  token: string;
  password: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('UserTokensRepository')
    private userTokensRepository: IUserTokensRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ password, token }: IRequest): Promise<void> {
    const userToken = await this.userTokensRepository.findByToken(token);

    if (!userToken || differenceInHours(Date.now(), userToken.created_at) > 2) {
      throw new AppError('Reset Password Token expired');
    }

    // Alternativily
    // const addedDate = addHours(userToken.created_at, 2);

    // if (isAfter(new Date(), addedDate)) {
    //   throw new AppError('User token is invalid or not exisitent');
    // }

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('user does not exist');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}
export default ResetPasswordService;
