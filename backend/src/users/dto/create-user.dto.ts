import { IsString, IsEmail, IsNumber, IsOptional, IsNotEmpty, Min, Max } from 'class-validator';

export class CreateUserDto {
  @IsString({ message: 'Имя должно быть строкой' })
  @IsNotEmpty({ message: 'Имя обязательно для заполнения' })
  name: string;

  @IsEmail({}, { message: 'Некорректный формат email адреса' })
  @IsNotEmpty({ message: 'Email обязателен для заполнения' })
  email: string;

  @IsNumber({}, { message: 'Возраст должен быть числом' })
  @IsOptional()
  @Min(0, { message: 'Возраст не может быть меньше 0' })
  @Max(120, { message: 'Указан слишком большой возраст' })
  age?: number;

  @IsString({ message: 'Категория доступа должна быть строкой' })
  @IsOptional()
  role?: string; // Категория доступа: 'Admin', 'Reader', 'Guest'
}

