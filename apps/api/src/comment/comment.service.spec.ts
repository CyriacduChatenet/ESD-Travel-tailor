import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentRepository } from './comment.repository';
import { CommentMarkService } from './comment-mark/comment-mark.service';
import { ActivityMarkService } from '../activity/activity-mark/activity-mark.service';
import { ActivityService } from '../activity/activity.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from './entities/comment.entity';

describe('CommentService', () => {
  let service: CommentService;
  let commentRepository: CommentRepository;
  let commentMarkService: CommentMarkService;
  let activityMarkService: ActivityMarkService;
  let activityService: ActivityService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: CommentRepository,
          useValue: {
            createComment: jest.fn(),
            findAllComment: jest.fn(),
            findAllCommentByActivityId: jest.fn(),
            findOneComment: jest.fn(),
            updateComment: jest.fn(),
            removeComment: jest.fn(),
          },
        },
        {
          provide: CommentMarkService,
          useValue: {
            create: jest.fn(),
          },
        },
        {
          provide: ActivityMarkService,
          useValue: {
            calculateActivityMarks: jest.fn(),
          },
        },
        {
          provide: ActivityService,
          useValue: {
            findOne: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
    commentRepository = module.get<CommentRepository>(CommentRepository);
    commentMarkService = module.get<CommentMarkService>(CommentMarkService);
    activityMarkService = module.get<ActivityMarkService>(ActivityMarkService);
    activityService = module.get<ActivityService>(ActivityService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return all comments', async () => {
      const queries = { page: 1, limit: 10 };
      const expectedResult: any = {
        page: 1,
        limit: 10,
        total: 1,
        data: [{ /* mocked comment */ }],
      };

      jest
        .spyOn(commentRepository, 'findAllComment')
        .mockResolvedValue(expectedResult);

      const result = await service.findAll(queries);

      expect(result).toEqual(expectedResult);
      expect(commentRepository.findAllComment).toHaveBeenCalledWith(queries);
    });

    it('should throw NotFoundException if an error occurs', async () => {
      const queries = { page: 1, limit: 10 };

      const errorMessage = 'Error finding comments';
      jest
        .spyOn(commentRepository, 'findAllComment')
        .mockRejectedValue(new Error(errorMessage));

      await expect(service.findAll(queries)).rejects.toThrowError(
        NotFoundException
      );
      expect(commentRepository.findAllComment).toHaveBeenCalledWith(queries);
    });
  });

  describe('findAllByActivityId', () => {
    it('should return all comments by activity id', async () => {
      const queries = { page: 1, limit: 10 };
      const activityId = 'example-activity-id';
      const expectedResult: any = { 
        comments: [],
      };

      jest
        .spyOn(commentRepository, 'findAllCommentByActivityId')
        .mockResolvedValue(expectedResult);

      const result = await service.findAllByActivityId(queries, activityId);

      expect(result).toEqual(expectedResult);
      expect(commentRepository.findAllCommentByActivityId).toHaveBeenCalledWith(
        queries,
        activityId
      );
    });

    it('should throw NotFoundException if an error occurs', async () => {
      const queries = { page: 1, limit: 10 };
      const activityId = 'example-activity-id';

      const errorMessage = 'Error finding comments by activity id';
      jest
        .spyOn(commentRepository, 'findAllCommentByActivityId')
        .mockRejectedValue(new Error(errorMessage));

      await expect(service.findAllByActivityId(queries, activityId)).rejects.toThrowError(
        NotFoundException
      );
      expect(commentRepository.findAllCommentByActivityId).toHaveBeenCalledWith(
        queries,
        activityId
      );
    });
  });

  describe('findOne', () => {
    it('should return the comment with the given id', async () => {
      const id = 'example-id';
      const expectedResult: any = { 
        id: 'example-id',
        content: '',
        likes: 0,
        marks: { explanation: 4, place: 5, arrival: 3, rentability: 2, waiting: 1 },
        activity: { /* mocked activity */ },
       };

      jest
        .spyOn(commentRepository, 'findOneComment')
        .mockResolvedValue(expectedResult);

      const result = await service.findOne(id);

      expect(result).toEqual(expectedResult);
      expect(commentRepository.findOneComment).toHaveBeenCalledWith(id);
    });

    it('should throw NotFoundException if an error occurs', async () => {
      const id = 'example-id';

      const errorMessage = 'Error finding comment';
      jest
        .spyOn(commentRepository, 'findOneComment')
        .mockRejectedValue(new Error(errorMessage));

      await expect(service.findOne(id)).rejects.toThrowError(
        NotFoundException
      );
      expect(commentRepository.findOneComment).toHaveBeenCalledWith(id);
    });
  });

  describe('update', () => {
    it('should update the comment with the given id', async () => {
      const id = 'example-id';
      const updateDto: UpdateCommentDto = {
          content: '',
          likes: 0
      };
      const expectedResult: any = {
        id,
        ...updateDto,
       };

      jest
        .spyOn(commentRepository, 'updateComment')
        .mockResolvedValue(expectedResult);

      const result = await service.update(id, updateDto);

      expect(result).toEqual(expectedResult);
      expect(commentRepository.updateComment).toHaveBeenCalledWith(id, updateDto);
    });
  });

  describe('remove', () => {
    it('should remove the comment with the given id', async () => {
      const id = 'example-id';

      await service.remove(id);

      expect(commentRepository.removeComment).toHaveBeenCalledWith(id);
    });

    it('should throw UnauthorizedException if an error occurs', async () => {
      const id = 'example-id';

      const errorMessage = 'Error removing comment';
      jest
        .spyOn(commentRepository, 'removeComment')
        .mockRejectedValue(new Error(errorMessage));

      await expect(service.remove(id)).rejects.toThrowError(
        UnauthorizedException
      );
      expect(commentRepository.removeComment).toHaveBeenCalledWith(id);
    });
  });
});
