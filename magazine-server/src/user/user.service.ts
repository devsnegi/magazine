import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { MagSubscription } from 'src/mag-subscription/entities/mag-subscription-entity';
import { MagSubscriptionService } from 'src/mag-subscription/mag-subscription.service';

interface UserWithSubscriptionList {
  id: number;
  name: string;
  username: string;
  email: string;
  age: number;
  password: string;
  gender: string;
  subscriptions?: Array<any>;
}
@Injectable()
export class UserService {
  /**
   * Here, we have used data mapper approch for this tutorial that is why we
   * injecting repository here. Another approch can be Active records.
   */
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    @InjectRepository(MagSubscription)
    private readonly magSubscriptionRepository: Repository<MagSubscription>,
    private readonly magSubscriptionService: MagSubscriptionService,
  ) {}

  /**
   * this is function is used to create User in User Entity.
   * @param createUserDto this will type of createUserDto in which
   * we have defined what are the keys we are expecting from body
   * @returns promise of user
   */
  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user: User = new User();
    console.log('createUser :-', createUserDto);
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    user.name = createUserDto.name;
    user.age = createUserDto.age;
    user.email = createUserDto.email;
    user.username = createUserDto.username;
    user.password = hashedPassword;
    user.gender = createUserDto.gender;
    return this.userRepository.save(user);
  }

  /**
   * this function is used to get all the user's list
   * @returns promise of array of users
   */
  findAllUser(): Promise<User[]> {
    return this.userRepository.find();
  }

  /**
   * this function used to get data of use whose id is passed in parameter
   * @param id is type of number, which represent the id of user.
   * @returns promise of user
   */
  async viewUser(id: number): Promise<User> {
    const user = this.userRepository.findOneBy({ id });
    return user;
  }

  async viewUserSubscription(id: number): Promise<any> {
    console.log(`viewUser called`, id);
    // const subscriptions = await this.magSubscriptionRepository.getAllMagazineSubscriptionByUserId();
    const magSubscriptionList =
      await this.magSubscriptionService.getAllMagazineSubscriptionByUserId(id);
    console.log(`magSubscriptionList:-- `, magSubscriptionList);
    const user = this.userRepository.findOneBy({ id });
    user['subscriptions'] = magSubscriptionList;
    return magSubscriptionList;
  }

  /**
   * this function is used to updated specific user whose id is passed in
   * parameter along with passed updated data
   * @param id is type of number, which represent the id of user.
   * @param updateUserDto this is partial type of createUserDto.
   * @returns promise of udpate user
   */
  updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user: User = new User();
    user.name = updateUserDto.name;
    user.age = updateUserDto.age;
    user.email = updateUserDto.email;
    user.username = updateUserDto.username;
    user.password = updateUserDto.password;
    user.id = id;
    return this.userRepository.save(user);
  }

  /**
   * this function is used to remove or delete user from database.
   * @param id is the type of number, which represent id of user
   * @returns nuber of rows deleted or affected
   */
  removeUser(id: number): Promise<{ affected?: number }> {
    return this.userRepository.delete(id);
  }
}
