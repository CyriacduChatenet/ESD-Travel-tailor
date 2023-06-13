import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { TasteService } from './taste.service';
import { TasteRepository } from './taste.repository';
import { TravelerService } from '../traveler.service';
import { CreateTasteDto } from './dto/create-taste.dto';
import { UpdateTasteDto } from './dto/update-taste.dto';
import { Taste } from './entities/taste.entity';
import { Traveler } from '../entities/traveler.entity';

describe('TasteService', () => {
  let service: TasteService;
  let tasteRepository: TasteRepository;
  let travelerService: TravelerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TasteService,
        {
          provide: TasteRepository,
          useValue: {
            createTaste: jest.fn(),
            findAllTaste: jest.fn(),
            findOneTaste: jest.fn(),
            update: jest.fn(),
            removeTaste: jest.fn(),
          },
        },
        {
          provide: TravelerService,
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<TasteService>(TasteService);
    tasteRepository = module.get<TasteRepository>(TasteRepository);
    travelerService = module.get<TravelerService>(TravelerService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all tastes', async () => {
      const queries = { page: 1, limit: 10 };
      const expectedResult: any = {
        page: 1,
        limit: 10,
        total: 1,
        data: [], // Mocked data
      }; // Mocked expectedResult

      jest.spyOn(tasteRepository, 'findAllTaste').mockResolvedValue(expectedResult);

      const result = await service.findAll(queries);

      expect(result).toBe(expectedResult);
      expect(tasteRepository.findAllTaste).toHaveBeenCalledWith(queries);
    });

    it('should throw NotFoundException if an error occurs', async () => {
      const queries = { page: 1, limit: 10 };

      const errorMessage = 'Error finding tastes';
      jest.spyOn(tasteRepository, 'findAllTaste').mockRejectedValue(new Error(errorMessage));

      await expect(service.findAll(queries)).rejects.toThrowError(NotFoundException);
      expect(tasteRepository.findAllTaste).toHaveBeenCalledWith(queries);
    });
  });

  describe('findOne', () => {
    it('should return the taste with the given id', async () => {
      const id = 'example-id';
      const expectedResult: Taste = {
          id: '',
          name: '',
          traveler: new Traveler,
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
      }; // Mocked expectedResult

      jest.spyOn(tasteRepository, 'findOneTaste').mockResolvedValue(expectedResult);

      const result = await service.findOne(id);

      expect(result).toBe(expectedResult);
      expect(tasteRepository.findOneTaste).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if an error occurs', async () => {
      const id = 'example-id';

      const errorMessage = 'Error finding taste';
      jest.spyOn(tasteRepository, 'findOneTaste').mockRejectedValue(new Error(errorMessage));

      await expect(service.findOne(id)).rejects.toThrowError(NotFoundException);
      expect(tasteRepository.findOneTaste).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update the taste with the given id', async () => {
      const id = 'example-id';
      const updateTasteDto: UpdateTasteDto = {
          name: ''
      };
      const expectedResult: any = {
          id: '',
          name: '',
          traveler: {},
          createdAt: new Date(),
          updatedAt: new Date(),
          deletedAt: null
      }; // Mocked expectedResult

      jest.spyOn(tasteRepository, 'update').mockResolvedValue(expectedResult);

      const result = await service.update(id, updateTasteDto);

      expect(result).toBe(expectedResult);
      expect(tasteRepository.update).toHaveBeenCalledWith(id, updateTasteDto);
    });

    it('should throw UnauthorizedException if an error occurs', async () => {
      const id = 'example-id';
      const updateTasteDto: UpdateTasteDto = {
          name: ''
      };

      const errorMessage = 'Error updating taste';
      jest.spyOn(tasteRepository, 'update').mockRejectedValue(new Error(errorMessage));

      await expect(service.update(id, updateTasteDto)).rejects.toThrowError(UnauthorizedException);
      expect(tasteRepository.update).toHaveBeenCalledWith(id, updateTasteDto);
    });
  });

  describe('remove', () => {
    it('should remove the taste with the given id', async () => {
      const id = 'example-id';

      await service.remove(id);

      expect(tasteRepository.removeTaste).toHaveBeenCalledWith(id);
    });

    it('should throw UnauthorizedException if an error occurs', async () => {
      const id = 'example-id';

      const errorMessage = 'Error removing taste';
      jest.spyOn(tasteRepository, 'removeTaste').mockRejectedValue(new Error(errorMessage));

      await expect(service.remove(id)).rejects.toThrowError(UnauthorizedException);
      expect(tasteRepository.removeTaste).toHaveBeenCalledWith(id);
    });
  });
});
