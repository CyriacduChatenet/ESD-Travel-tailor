import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { ActivityDetailService } from './activity-detail.service'
import { ActivityDetailRepository } from './activity-detail.repository'
import { CreateActivityDetailDto } from './dto/create-activity-detail.dto'
import { UpdateActivityDetailDto } from './dto/update-activity-detail.dto'
import { ApiLimitResourceQuery } from '@travel-tailor/types'

describe('ActivityDetailService', () => {
  let service: ActivityDetailService
  let repository: ActivityDetailRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityDetailService,
        {
          provide: ActivityDetailRepository,
          useValue: {
            createActivityDetail: jest.fn(),
            findAllActivityDetail: jest.fn(),
            findOneActivityDetail: jest.fn(),
            updateActivityDetail: jest.fn(),
            removeActivityDetail: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<ActivityDetailService>(ActivityDetailService)
    repository = module.get<ActivityDetailRepository>(ActivityDetailRepository)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create an activity detail', async () => {
      const createDto: CreateActivityDetailDto = {
        duration: 1,
        location: '',
      }

      await service.create(createDto)

      expect(repository.createActivityDetail).toHaveBeenCalledWith(createDto)
    })

    it('should throw UnauthorizedException if repository throws an error', async () => {
      const createDto: CreateActivityDetailDto = {
        duration: 1,
        location: '',
      }

      const errorMessage = 'Error creating activity detail'
      jest
        .spyOn(repository, 'createActivityDetail')
        .mockRejectedValue(new Error(errorMessage))

      await expect(service.create(createDto)).rejects.toThrowError(
        UnauthorizedException
      )
      expect(repository.createActivityDetail).toHaveBeenCalledWith(createDto)
    })
  })

  describe('findAll', () => {
    it('should return all activity details', async () => {
      const queries: ApiLimitResourceQuery = {
        page: 1,
        limit: 10,
      }

      const expectedResult = {
        page: 1,
        limit: 10,
        total: 1,
        data: [],
      }

      jest
        .spyOn(repository, 'findAllActivityDetail')
        .mockResolvedValue(expectedResult)

      const result = await service.findAll(queries)

      expect(result).toEqual(expectedResult)
      expect(repository.findAllActivityDetail).toHaveBeenCalledWith(queries)
    })

    it('should throw NotFoundException if repository throws an error', async () => {
      const queries: ApiLimitResourceQuery = {
        page: 1,
        limit: 10,
      }

      const errorMessage = 'Error finding activity details'
      jest
        .spyOn(repository, 'findAllActivityDetail')
        .mockRejectedValue(new Error(errorMessage))

      await expect(service.findAll(queries)).rejects.toThrowError(
        NotFoundException
      )
      expect(repository.findAllActivityDetail).toHaveBeenCalledWith(queries)
    })
  })

  describe('findOne', () => {
    it('should return the activity detail with the given id', async () => {
      const id = 'example-id'

      const expectedResult: any = {
        id: 'example-id',
        duration: 1,
        location: '',
        activity: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }

      jest
        .spyOn(repository, 'findOneActivityDetail')
        .mockResolvedValue(expectedResult)

      const result = await service.findOne(id)

      expect(result).toEqual(expectedResult)
      expect(repository.findOneActivityDetail).toHaveBeenCalledWith(id)
    })

    it('should throw NotFoundException if repository throws an error', async () => {
      const id = 'example-id'

      const errorMessage = 'Error finding activity detail'
      jest
        .spyOn(repository, 'findOneActivityDetail')
        .mockRejectedValue(new Error(errorMessage))

      await expect(service.findOne(id)).rejects.toThrowError(NotFoundException)
      expect(repository.findOneActivityDetail).toHaveBeenCalledWith(id)
    })
  })

  describe('update', () => {
    it('should update the activity detail with the given id', async () => {
      const id = 'example-id'
      const updateDto: UpdateActivityDetailDto = {
        location: '',
        duration: 1,
      }

      const expectedResult: any = {
        id: 'example-id',
        duration: 1,
        location: '',
        activity: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }

      jest
        .spyOn(repository, 'updateActivityDetail')
        .mockResolvedValue(expectedResult)

      const result = await service.update(id, updateDto)

      expect(result).toEqual(expectedResult)
      expect(repository.updateActivityDetail).toHaveBeenCalledWith(
        id,
        updateDto
      )
    })

    it('should throw UnauthorizedException if repository throws an error', async () => {
      const id = 'example-id'
      const updateDto: UpdateActivityDetailDto = {
        location: '',
        duration: 1,
      }

      const errorMessage = 'Error updating activity detail'
      jest
        .spyOn(repository, 'updateActivityDetail')
        .mockRejectedValue(new Error(errorMessage))

      await expect(service.update(id, updateDto)).rejects.toThrowError(
        UnauthorizedException
      )
      expect(repository.updateActivityDetail).toHaveBeenCalledWith(
        id,
        updateDto
      )
    })
  })

  describe('remove', () => {
    it('should remove the activity detail with the given id', async () => {
      const id = 'example-id'

      await service.remove(id)

      expect(repository.removeActivityDetail).toHaveBeenCalledWith(id)
    })

    it('should throw UnauthorizedException if repository throws an error', async () => {
      const id = 'example-id'

      const errorMessage = 'Error removing activity detail'
      jest
        .spyOn(repository, 'removeActivityDetail')
        .mockRejectedValue(new Error(errorMessage))

      await expect(service.remove(id)).rejects.toThrowError(
        UnauthorizedException
      )
      expect(repository.removeActivityDetail).toHaveBeenCalledWith(id)
    })
  })
})
