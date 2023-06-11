import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { ActivityTagService } from './activity-tag.service';
import { ActivityTagRepository } from './activity-tag.repository';
import { CreateActivityTagDto } from './dto/create-activity-tag.dto';
import { UpdateActivityTagDto } from './dto/update-activity-tag.dto';
import { ActivityTagQuery } from '@travel-tailor/types';

describe('ActivityTagService', () => {
  let service: ActivityTagService;
  let repository: ActivityTagRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityTagService,
        {
          provide: ActivityTagRepository,
          useValue: {
            createActivityTag: jest.fn(),
            findAllActivityTag: jest.fn(),
            findOneActivityTag: jest.fn(),
            updateActivityTag: jest.fn(),
            removeActivityTag: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<ActivityTagService>(ActivityTagService);
    repository = module.get<ActivityTagRepository>(ActivityTagRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an activity tag', async () => {
      const createDto: CreateActivityTagDto = {
        name: '',
      };

      await service.create(createDto);

      expect(repository.createActivityTag).toHaveBeenCalledWith(createDto);
    });

    it('should throw an UnauthorizedException when an error occurs', async () => {
      const createDto: CreateActivityTagDto = {
        name: '',
      };

      jest.spyOn(repository, 'createActivityTag').mockRejectedValue(new Error('Unauthorized'));

      await expect(service.create(createDto)).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('findAll', () => {
    it('should return all activity tags', async () => {
      const queries: ActivityTagQuery = {
        page: 1,
        limit: 10
      };

      const expectedResult = {
        page: 1,
        limit: 10,
        total: 1,
        data: []
      };

      jest.spyOn(repository, 'findAllActivityTag').mockResolvedValue(expectedResult);

      const result = await service.findAll(queries);

      expect(result).toEqual(expectedResult);
      expect(repository.findAllActivityTag).toHaveBeenCalledWith(queries);
    });

    it('should throw a NotFoundException when an error occurs', async () => {
      const queries: ActivityTagQuery = {
        page: 1,
        limit: 10
      };

      jest.spyOn(repository, 'findAllActivityTag').mockRejectedValue(new Error('Not found'));

      await expect(service.findAll(queries)).rejects.toThrow(NotFoundException);
    });
  });

//   describe('findOne', () => {
//     it('should return the activity tag with the given name', async () => {
//       const name = 'example-name';

//       const expectedResult = {
//         id: '',
//         name: '',
//         activities: [],
//         createdAt: new Date(),
//         updatedAt: new Date(),
//         deletedAt: null
//       };

//       jest.spyOn(repository, 'findOneActivityTag').mockResolvedValue(expectedResult);

//       const result = await service.findOne(name);

//       expect(result).toEqual(expectedResult);
//       expect(repository.findOneActivityTag).toHaveBeenCalledWith(name);
//     });

//     it('should throw a NotFoundException when an error occurs', async () => {
//       const name = 'example-name';

//       jest.spyOn(repository, 'findOneActivityTag').mockRejectedValue(new Error('Not found'));

//       await expect(service.findOne(name)).rejects.toThrow(NotFoundException);
//     });
//   });

  describe('update', () => {
    it('should update the activity tag with the given id', async () => {
      const id = 'example-id';
      const updateDto: UpdateActivityTagDto = {
        name: '',
        activities: []
      };

      await service.update(id, updateDto);

      expect(repository.updateActivityTag).toHaveBeenCalledWith(id, updateDto);
    });

    it('should throw an UnauthorizedException when an error occurs', async () => {
      const id = 'example-id';
      const updateDto: UpdateActivityTagDto = {
        name: '',
        activities: [],
      };

      jest.spyOn(repository, 'updateActivityTag').mockRejectedValue(new Error('Unauthorized'));

      await expect(service.update(id, updateDto)).rejects.toThrow(UnauthorizedException);
    });
  });

//   describe('remove', () => {
//     it('should remove the activity tag with the given id', async () => {
//       const id = 'example-id';

//       await service.remove(id);

//       expect(repository.removeActivityTag).toHaveBeenCalledWith(id);
//     });

//     it('should throw an UnauthorizedException when an error occurs', async () => {
//       const id = 'example-id';

//       jest.spyOn(repository, 'removeActivityTag').mockRejectedValue(new Error('Unauthorized'));

//       await expect(service.remove(id)).rejects.toThrow(UnauthorizedException);
//     });
//   });
});
