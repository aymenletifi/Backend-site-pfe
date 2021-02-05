import { Injectable } from '@nestjs/common';

// This should be a real class/interface representing a user entity
export type User = any;

@Injectable()
export class UsersService {
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: '$2b$10$m2IWsGwd6q0FlflXyb8AQe6bqjfKPEgQXtlXKSljp9AHiR79DDOqe',
    },
    {
      userId: 2,
      username: 'maria',
      password: '$2b$10$m2IWsGwd6q0FlflXyb8AQeTh8h9NQdt4oVWNutPRvvxN1AgUgxf5C',
    },
  ];

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }
}