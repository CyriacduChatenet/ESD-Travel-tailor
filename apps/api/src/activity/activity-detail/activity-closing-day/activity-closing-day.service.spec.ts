import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ActivityClosingDayService } from './activity-closing-day.service';
import { ActivityClosingDayRepository } from './activity-closing-day.repository';
import { CreateActivityClosingDayDto } from './dto/create-activity-closing-day.dto';
import { UpdateActivityClosingDayDto } from './dto/update-activity-closing-day.dto';
import { ActivityClosingDay, ApiLimitResourceQuery } from '@travel-tailor/types';

describe('ActivityClosingDayService', () => {
  let service: ActivityClosingDayService;
  let repository: ActivityClosingDayRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityClosingDayService,
        {
          provide: ActivityClosingDayRepository,
          useValue: {
            createActivityClosingDay: jest.fn(),
            findAllActivityClosingDay: jest.fn(),
            findOneActivityClosingDay: jest.fn(),
            updateActivityClosingDay: jest.fn(),
            removeActivityClosingDay: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ActivityClosingDayService>(ActivityClosingDayService);
    repository = module.get<ActivityClosingDayRepository>(ActivityClosingDayRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an activity closing day', async () => {
      const createDto: CreateActivityClosingDayDto = {
        recurrence: true,
        date: new Date(),
      };

      await service.create(createDto);

      expect(repository.createActivityClosingDay).toHaveBeenCalledWith(createDto);
    });

    it('should throw UnauthorizedException if repository throws an error', async () => {
      const createDto: CreateActivityClosingDayDto = {
        recurrence: true,
        date: new Date(),
      };

      const errorMessage = 'Error creating activity closing day';
      jest.spyOn(repository, 'createActivityClosingDay').mockRejectedValue(new Error(errorMessage));

      await expect(service.create(createDto)).rejects.toThrowError(UnauthorizedException);
      expect(repository.createActivityClosingDay).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return all activity closing days', async () => {
      const query: ApiLimitResourceQuery = {
        page: 1,
        limit: 10,
        // Provide the necessary properties for the query
      };

      const expectedResult = {
        page: 1,
        limit: 10,
        total: 1,
        data: [],
        // Provide the expected result
      };

      jest.spyOn(repository, 'findAllActivityClosingDay').mockResolvedValue(expectedResult);

      const result = await service.findAll(query);

      expect(result).toEqual(expectedResult);
      expect(repository.findAllActivityClosingDay).toHaveBeenCalledWith(query);
    });

    it('should throw NotFoundException if repository throws an error', async () => {
      const query: ApiLimitResourceQuery = {
        // Provide the necessary properties for the query
      };

      const errorMessage = 'Error finding activity closing days';
      jest.spyOn(repository, 'findAllActivityClosingDay').mockRejectedValue(new Error(errorMessage));

      await expect(service.findAll(query)).rejects.toThrowError(NotFoundException);
      expect(repository.findAllActivityClosingDay).toHaveBeenCalledWith(query);
    });
  });

  describe('findOne', () => {
    it('should return the activity closing day with the given id', async () => {
      const id = 'example-id';
      const expectedResult: any = {
        id: 'example-id',
        recurrence: true,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        activityDetailId: 'example-activity-detail-id',
      };

      jest.spyOn(repository, 'findOneActivityClosingDay').mockResolvedValue(expectedResult);

      const result = await service.findOne(id);

      expect(result).toEqual(expectedResult);
      expect(repository.findOneActivityClosingDay).toHaveBeenCalledWith(id);
    });

    it('should throw UnauthorizedException if repository throws an error', async () => {
      const id = 'example-id';

      const errorMessage = 'Error finding activity closing day';
      jest.spyOn(repository, 'findOneActivityClosingDay').mockRejectedValue(new Error(errorMessage));

      await expect(service.findOne(id)).rejects.toThrowError(UnauthorizedException);
      expect(repository.findOneActivityClosingDay).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update the activity closing day with the given id', async () => {
      const id = 'example-id';
      const updateDto: UpdateActivityClosingDayDto = {
        recurrence: true,
        date: new Date(),
      };

      const expectedResult: any = {
        id: 'example-id',
        recurrence: true,
        date: new Date(),
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
        activityDetailId: 'example-activity-detail-id',
      };

      jest.spyOn(repository, 'updateActivityClosingDay').mockResolvedValue(expectedResult);

      const result = await service.update(id, updateDto);

      expect(result).toEqual(expectedResult);
      expect(repository.updateActivityClosingDay).toHaveBeenCalledWith(id, updateDto);
    });

    it('should throw UnauthorizedException if repository throws an error', async () => {
      const id = 'example-id';
      const updateDto: UpdateActivityClosingDayDto = {
        recurrence: true,
        date: new Date(),
      };

      const errorMessage = 'Error updating activity closing day';
      jest.spyOn(repository, 'updateActivityClosingDay').mockRejectedValue(new Error(errorMessage));

      await expect(service.update(id, updateDto)).rejects.toThrowError(UnauthorizedException);
      expect(repository.updateActivityClosingDay).toHaveBeenCalledWith(id, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove the activity closing day with the given id', async () => {
      const id = 'example-id';

      const result = await service.remove(id);

      expect(repository.removeActivityClosingDay).toHaveBeenCalledWith(id);
    });

    it('should throw UnauthorizedException if repository throws an error', async () => {
      const id = 'example-id';

      const errorMessage = 'Error removing activity closing day';
      jest.spyOn(repository, 'removeActivityClosingDay').mockRejectedValue(new Error(errorMessage));

      await expect(service.remove(id)).rejects.toThrowError(UnauthorizedException);
      expect(repository.removeActivityClosingDay).toHaveBeenCalledWith(id);
    });
  });
});
