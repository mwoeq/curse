import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

export interface User {
  id: string;
  name: string;
  email: string;
  age?: number;
  role: string;
}

@Injectable()
export class UsersService {
  private readonly logger = new Logger(UsersService.name);
  private users: User[] = []; // Хранилище в оперативной памяти
  private idCounter = 1;

  findAll(): User[] {
    this.logger.log('Вызов GET /users — получение всех пользователей');
    return this.users;
  }

  findOne(id: string): User {
    this.logger.log(`Вызов GET /users/${id} — поиск пользователя`);
    const user = this.users.find(u => u.id === id);
    if (!user) {
      this.logger.error(`Пользователь с ID ${id} не найден`);
      throw new NotFoundException(`Пользователь с идентификатором ${id} не найден`);
    }
    return user;
  }

  create(createUserDto: CreateUserDto): User {
    this.logger.log(`Вызов POST /users — создание пользователя ${createUserDto.name}`);
    const newUser: User = {
      id: (this.idCounter++).toString(),
      name: createUserDto.name,
      email: createUserDto.email,
      age: createUserDto.age,
      role: createUserDto.role || 'Reader',
    };
    this.users.push(newUser);
    return newUser;
  }
}
