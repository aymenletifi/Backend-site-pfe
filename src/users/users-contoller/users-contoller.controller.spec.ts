import { Test, TestingModule } from '@nestjs/testing';
import { UsersContollerController } from './users-contoller.controller';

describe('UsersContollerController', () => {
  let controller: UsersContollerController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersContollerController],
    }).compile();

    controller = module.get<UsersContollerController>(UsersContollerController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
