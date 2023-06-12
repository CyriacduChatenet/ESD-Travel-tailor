import { Test, TestingModule } from '@nestjs/testing'
import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { ActivityScheduleService } from './activity-schedule.service'
import { ActivityScheduleRepository } from './activity-schedule.repository'
import { CreateActivityScheduleDto } from './dto/create-activity-schedule.dto'
import { UpdateActivityScheduleDto } from './dto/update-activity-schedule.dto'
import { ApiLimitResourceQuery } from '@travel-tailor/types'

describe('ActivityScheduleService', () => {
  let service: ActivityScheduleService
  let repository: ActivityScheduleRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityScheduleService,
        {
          provide: ActivityScheduleRepository,
          useValue: {
            createActivitySchedule: jest.fn(),
            findAllActivitySchedule: jest.fn(),
            findOneActivitySchedule: jest.fn(),
            updateActivitySchedule: jest.fn(),
            removeActivitySchedule: jest.fn(),
          },
        },
      ],
    }).compile()

    service = module.get<ActivityScheduleService>(ActivityScheduleService)
    repository = module.get<ActivityScheduleRepository>(
      ActivityScheduleRepository
    )
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('create', () => {
    it('should create an activity schedule', async () => {
      const createDto: CreateActivityScheduleDto = {
        opening_at: '',
        closing_at: '',
      }

      await service.create(createDto)

      expect(repository.createActivitySchedule).toHaveBeenCalledWith(createDto)
    })

    it('should throw UnauthorizedException if repository throws an error', async () => {
      const createDto: CreateActivityScheduleDto = {
        opening_at: '',
        closing_at: '',
      }

      const errorMessage = 'Error creating activity schedule'
      jest
        .spyOn(repository, 'createActivitySchedule')
        .mockRejectedValue(new Error(errorMessage))

      await expect(service.create(createDto)).rejects.toThrowError(
        UnauthorizedException
      )
      expect(repository.createActivitySchedule).toHaveBeenCalledWith(createDto)
    })
  })

  describe('findAll', () => {
    it('should return all activity schedules', async () => {
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
        .spyOn(repository, 'findAllActivitySchedule')
        .mockResolvedValue(expectedResult)

      const result = await service.findAll(queries)

      expect(result).toEqual(expectedResult)
      expect(repository.findAllActivitySchedule).toHaveBeenCalledWith(queries)
    })

    it('should throw NotFoundException if repository throws an error', async () => {
      const queries: ApiLimitResourceQuery = {
        page: 1,
        limit: 10,
      }

      const errorMessage = 'Error finding activity schedules'
      jest
        .spyOn(repository, 'findAllActivitySchedule')
        .mockRejectedValue(new Error(errorMessage))

      await expect(service.findAll(queries)).rejects.toThrowError(
        NotFoundException
      )
      expect(repository.findAllActivitySchedule).toHaveBeenCalledWith(queries)
    })
  })

  describe('findOne', () => {
    it('should return the activity schedule with the given id', async () => {
      const id = 'example-id'

      const expectedResult: any = {
        id: 'example-id',
        opening_at: '',
        closing_at: '',
        activityDetail: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }

      jest
        .spyOn(repository, 'findOneActivitySchedule')
        .mockResolvedValue(expectedResult)

      const result = await service.findOne(id)

      expect(result).toEqual(expectedResult)
      expect(repository.findOneActivitySchedule).toHaveBeenCalledWith(id)
    })

    it('should throw NotFoundException if repository throws an error', async () => {
      const id = 'example-id'

      const errorMessage = 'Error finding activity schedule'
      jest
        .spyOn(repository, 'findOneActivitySchedule')
        .mockRejectedValue(new Error(errorMessage))

      await expect(service.findOne(id)).rejects.toThrowError(NotFoundException)
      expect(repository.findOneActivitySchedule).toHaveBeenCalledWith(id)
    })
  })

  describe('update', () => {
    it('should update the activity schedule with the given id', async () => {
      const id = 'example-id'
      const updateDto: UpdateActivityScheduleDto = {
        opening_at: '',
        closing_at: '',
      }

      const expectedResult: any = {
        id: 'example-id',
        opening_at: '',
        closing_at: '',
        activityDetail: '',
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      }

      jest
        .spyOn(repository, 'updateActivitySchedule')
        .mockResolvedValue(expectedResult)

      const result = await service.update(id, updateDto)

      expect(result).toEqual(expectedResult)
      expect(repository.updateActivitySchedule).toHaveBeenCalledWith(
        id,
        updateDto
      )
    })

    it('should throw UnauthorizedException if repository throws an error', async () => {
      const id = 'example-id'
      const updateDto: UpdateActivityScheduleDto = {
        opening_at: '',
        closing_at: '',
      }

      const errorMessage = 'Error updating activity schedule'
      jest
        .spyOn(repository, 'updateActivitySchedule')
        .mockRejectedValue(new Error(errorMessage))

      await expect(service.update(id, updateDto)).rejects.toThrowError(
        UnauthorizedException
      )
      expect(repository.updateActivitySchedule).toHaveBeenCalledWith(
        id,
        updateDto
      )
    })
  })

  describe('remove', () => {
    it('should remove the activity schedule with the given id', async () => {
      const id = 'example-id'

      await service.remove(id)

      expect(repository.removeActivitySchedule).toHaveBeenCalledWith(id)
    })

    it('should throw UnauthorizedException if repository throws an error', async () => {
      const id = 'example-id'

      const errorMessage = 'Error removing activity schedule'
      jest
        .spyOn(repository, 'removeActivitySchedule')
        .mockRejectedValue(new Error(errorMessage))

      await expect(service.remove(id)).rejects.toThrowError(
        UnauthorizedException
      )
      expect(repository.removeActivitySchedule).toHaveBeenCalledWith(id)
    })
  })
})
