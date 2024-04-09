import { Test, TestingModule } from '@nestjs/testing';
import { ProfessionalInfoService } from './professional-info.service';

describe('ProfessionalInfoService', () => {
  let service: ProfessionalInfoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfessionalInfoService],
    }).compile();

    service = module.get<ProfessionalInfoService>(ProfessionalInfoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
