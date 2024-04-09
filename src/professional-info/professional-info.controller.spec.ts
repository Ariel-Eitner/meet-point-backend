import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalInfoController } from './professional-info.controller';

describe('ProfessionalInfoController', () => {
  let controller: ProfessionalInfoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProfessionalInfoController],
    }).compile();

    controller = module.get<ProfessionalInfoController>(ProfessionalInfoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
