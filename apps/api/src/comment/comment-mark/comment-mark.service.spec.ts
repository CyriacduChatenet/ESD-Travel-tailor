import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommentMarkService } from './comment-mark.service';
import { CommentMarkRepository } from './comment-mark.repository';
import { CreateCommentMarkDto } from './dto/create-comment-mark.dto';
import { UpdateCommentMarkDto } from './dto/update-comment-mark.dto';
import { ApiLimitResourceQuery } from '@travel-tailor/types';

describe('CommentMarkService', () => {
  let service: CommentMarkService;
  let repository: CommentMarkRepository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentMarkService,
        {
          provide: CommentMarkRepository,
          useValue: {
            createCommentMark: jest.fn(),
            findAllCommentMark: jest.fn(),
            findOneCommentMark: jest.fn(),
            updateCommentMark: jest.fn(),
            removeCommentMark: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CommentMarkService>(CommentMarkService);
    repository = module.get<CommentMarkRepository>(CommentMarkRepository);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a comment mark', async () => {
      const createDto: CreateCommentMarkDto = {
        explanation: 4,
        place: 5,
        arrival: 3,
        rentability: 2,
        waiting: 1,
      };

      await service.create(createDto);

      expect(repository.createCommentMark).toHaveBeenCalledWith({
        ...createDto,
        global: 3.0,
      });
    });

    it('should throw UnauthorizedException if repository throws an error', async () => {
      const createDto: CreateCommentMarkDto = {
        explanation: 4,
        place: 5,
        arrival: 3,
        rentability: 2,
        waiting: 1,
      };

      const errorMessage = 'Error creating comment mark';
      jest
        .spyOn(repository, 'createCommentMark')
        .mockRejectedValue(new Error(errorMessage));

      await expect(service.create(createDto)).rejects.toThrowError(
        UnauthorizedException
      );
      expect(repository.createCommentMark).toHaveBeenCalledWith({
        ...createDto,
        global: 3.0,
      });
    });
  });

  describe('findAll', () => {
    it('should return all comment marks', async () => {
      const queries: ApiLimitResourceQuery = {
        page: 1,
        limit: 10,
      };

      const expectedResult = {
        page: 1,
        limit: 10,
        total: 1,
        data: [],
      };

      jest
        .spyOn(repository, 'findAllCommentMark')
        .mockResolvedValue(expectedResult);

      const result = await service.findAll(queries);

      expect(result).toEqual(expectedResult);
      expect(repository.findAllCommentMark).toHaveBeenCalledWith(queries);
    });

    it('should throw NotFoundException if repository throws an error', async () => {
      const queries: ApiLimitResourceQuery = {
        page: 1,
        limit: 10,
      };

      const errorMessage = 'Error finding comment marks';
      jest
        .spyOn(repository, 'findAllCommentMark')
        .mockRejectedValue(new Error(errorMessage));

      await expect(service.findAll(queries)).rejects.toThrowError(
        NotFoundException
      );
      expect(repository.findAllCommentMark).toHaveBeenCalledWith(queries);
    });
  });

  describe('findOne', () => {
    it('should return the comment mark with the given id', async () => {
      const id = 'example-id';

      const expectedResult: any = {
        id: 'example-id',
        explanation: 4,
        place: 5,
        arrival: 3,
        rentability: 2,
        waiting: 1,
        global: 3.0,
      };

      jest
        .spyOn(repository, 'findOneCommentMark')
        .mockResolvedValue(expectedResult);

      const result = await service.findOne(id);

      expect(result).toEqual(expectedResult);
      expect(repository.findOneCommentMark).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if repository throws an error', async () => {
      const id = 'example-id';

      const errorMessage = 'Error finding comment mark';
      jest
        .spyOn(repository, 'findOneCommentMark')
        .mockRejectedValue(new Error(errorMessage));

      await expect(service.findOne(id)).rejects.toThrowError(
        NotFoundException
      );
      expect(repository.findOneCommentMark).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update the comment mark with the given id', async () => {
      const id = 'example-id';
      const updateDto: UpdateCommentMarkDto = {
        explanation: 3,
        place: 4,
        arrival: 5,
        rentability: 2,
        waiting: 1,
      };

      const expectedResult: any = {
        id: 'example-id',
        explanation: 3,
        place: 4,
        arrival: 5,
        rentability: 2,
        waiting: 1,
        global: 3.0,
      };

      jest
        .spyOn(repository, 'updateCommentMark')
        .mockResolvedValue(expectedResult);

      const result = await service.update(id, updateDto);

      expect(result).toEqual(expectedResult);
      expect(repository.updateCommentMark).toHaveBeenCalledWith(id, {
        ...updateDto,
        global: 3.0,
      });
    });

    it('should throw UnauthorizedException if repository throws an error', async () => {
      const id = 'example-id';
      const updateDto: UpdateCommentMarkDto = {
        explanation: 3,
        place: 4,
        arrival: 5,
        rentability: 2,
        waiting: 1,
      };

      const errorMessage = 'Error updating comment mark';
      jest
        .spyOn(repository, 'updateCommentMark')
        .mockRejectedValue(new Error(errorMessage));

      await expect(service.update(id, updateDto)).rejects.toThrowError(
        UnauthorizedException
      );
      expect(repository.updateCommentMark).toHaveBeenCalledWith(id, {
        ...updateDto,
        global: 3.0,
      });
    });
  });

  describe('remove', () => {
    it('should remove the comment mark with the given id', async () => {
      const id = 'example-id';

      await service.remove(id);

      expect(repository.removeCommentMark).toHaveBeenCalledWith(id);
    });

    it('should throw UnauthorizedException if repository throws an error', async () => {
      const id = 'example-id';

      const errorMessage = 'Error removing comment mark';
      jest
        .spyOn(repository, 'removeCommentMark')
        .mockRejectedValue(new Error(errorMessage));

      await expect(service.remove(id)).rejects.toThrowError(
        UnauthorizedException
      );
      expect(repository.removeCommentMark).toHaveBeenCalledWith(id);
    });
  });
});
