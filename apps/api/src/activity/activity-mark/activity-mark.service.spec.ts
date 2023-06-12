import { Test, TestingModule } from '@nestjs/testing';
import { ApiLimitResourceQuery } from '@travel-tailor/types';
import { ActivityMarkService } from './activity-mark.service';
import { ActivityMarkRepository } from './activty-mark.repository';
import { CreateActivityMarkDto } from './dto/create-activity-mark.dto';
import { UpdateActivityMarkDto } from './dto/update-activity-mark.dto';
import { CommentMark } from '../../comment/comment-mark/entities/comment-mark.entity';

describe('ActivityMarkService', () => {
  let service: ActivityMarkService;
  let repository: ActivityMarkRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityMarkService,
        {
          provide: ActivityMarkRepository,
          useValue: {
            createActivityMark: jest.fn(),
            findAllActivityMark: jest.fn(),
            findOneActivityMark: jest.fn(),
            updateActivityMark: jest.fn(),
            removeActivityMark: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ActivityMarkService>(ActivityMarkService);
    repository = module.get<ActivityMarkRepository>(ActivityMarkRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an activity mark', async () => {
      const createDto: CreateActivityMarkDto = {
        global: 0,
        rentability: 0,
        place: 0,
        waiting: 0,
        arrival: 0,
        explanation: 0,
        activty: ''
      };

      await service.create(createDto);

      expect(repository.createActivityMark).toHaveBeenCalledWith(createDto);
    });
  });

  describe('findAll', () => {
    it('should return all activity marks', async () => {
      const queries: ApiLimitResourceQuery = {
        page: 1,
        limit: 10,
      };

      const expectedResult = {
        page: 1,
        total: 1,
        limit: 10,
        data: []
      };

      jest.spyOn(repository, 'findAllActivityMark').mockResolvedValue(expectedResult);

      const result = await service.findAll(queries);

      expect(result).toEqual(expectedResult);
      expect(repository.findAllActivityMark).toHaveBeenCalledWith(queries);
    });
  });

  describe('findOne', () => {
    it('should return the activity mark with the given id', async () => {
      const id = 'example-id';

      const expectedResult: any = {
        id: id,
        global: 0,
        rentability: 0,
        place: 0,
        waiting: 0,
        arrival: 0,
        explanation: 0,
        activty: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      jest.spyOn(repository, 'findOneActivityMark').mockResolvedValue(expectedResult);

      const result = await service.findOne(id);

      expect(result).toEqual(expectedResult);
      expect(repository.findOneActivityMark).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update the activity mark with the given id', async () => {
      const id = 'example-id';
      const updateDto: UpdateActivityMarkDto = {
        global: 0,
        rentability: 0,
        place: 0,
        waiting: 0,
        arrival: 0,
        explanation: 0,
        activty: ''
      };

      const expectedResult: any = {
        id: id,
        global: 0,
        rentability: 0,
        place: 0,
        waiting: 0,
        arrival: 0,
        explanation: 0,
        activty: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null
      };

      jest.spyOn(repository, 'updateActivityMark').mockResolvedValue(expectedResult);

      const result = await service.update(id, updateDto);

      expect(result).toEqual(expectedResult);
      expect(repository.updateActivityMark).toHaveBeenCalledWith(id, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove the activity mark with the given id', async () => {
      const id = 'example-id';

      await service.remove(id);

      expect(repository.removeActivityMark).toHaveBeenCalledWith(id);
    });
  });
});
