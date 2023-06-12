import {
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ApiLimitResourceQuery } from '@travel-tailor/types'
import { AdvertiserRepository } from './advertiser.repository'
import { AdvertiserService } from './advertiser.service'
import { CreateAdvertiserDto } from './dto/create-advertiser.dto'
import { UpdateAdvertiserDto } from './dto/update-advertiser.dto'
import { Test, TestingModule } from '@nestjs/testing'

describe('AdvertiserService', () => {
    let service: AdvertiserService
    let advertiserRepository: AdvertiserRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
        providers: [
            AdvertiserService,
            {
                provide: AdvertiserRepository,
                useValue: {
                    createAdvertiser: jest.fn(),
                    save: jest.fn(),
                    findAllAdvertiser: jest.fn(),
                    findOneAdvertiser: jest.fn(),
                    updateAdvertiser: jest.fn(),
                    deleteAdvertiser: jest.fn(),
                },
            }
        ],
    }).compile();

    advertiserRepository = module.get<AdvertiserRepository>(AdvertiserRepository)
    service = module.get<AdvertiserService>(AdvertiserService)
  })

  describe('create', () => {
    it('should create an advertiser', async () => {
      const createDto: CreateAdvertiserDto = {
          name: '',
          location: ''
      }
      const expectedResult: any = {
        name: '',
        location: ''
      }

      jest
        .spyOn(advertiserRepository, 'createAdvertiser')
        .mockResolvedValue(expectedResult)

      const result = await service.create(createDto)

      expect(result).toEqual(expectedResult)
      expect(advertiserRepository.createAdvertiser).toHaveBeenCalledWith(
        createDto
      )
    })

    it('should throw UnauthorizedException if an error occurs', async () => {
      const createDto: CreateAdvertiserDto = {
          name: '',
          location: ''
      }

      const errorMessage = 'Error creating advertiser'
      jest
        .spyOn(advertiserRepository, 'createAdvertiser')
        .mockRejectedValue(new Error(errorMessage))

      await expect(service.create(createDto)).rejects.toThrowError(
        UnauthorizedException
      )
      expect(advertiserRepository.createAdvertiser).toHaveBeenCalledWith(
        createDto
      )
    })
  })

  describe('save', () => {
    it('should save an advertiser', async () => {
      const advertiser: CreateAdvertiserDto = {
          name: '',
          location: ''
      }
      const expectedResult: any = {
        name: '',
        location: ''
      }

      jest.spyOn(advertiserRepository, 'save').mockResolvedValue(expectedResult)

      const result = await service.save(advertiser)

      expect(result).toEqual(expectedResult)
      expect(advertiserRepository.save).toHaveBeenCalledWith(advertiser)
    })

    it('should throw BadRequestException if an error occurs', async () => {
      const advertiser: CreateAdvertiserDto = {
          name: '',
          location: ''
      }

      const errorMessage = 'Error saving advertiser'
      jest
        .spyOn(advertiserRepository, 'save')
        .mockRejectedValue(new Error(errorMessage))

      await expect(service.save(advertiser)).rejects.toThrowError(
        BadRequestException
      )
      expect(advertiserRepository.save).toHaveBeenCalledWith(advertiser)
    })
  })

  describe('findAll', () => {
    it('should return all advertisers', async () => {
      const queries: ApiLimitResourceQuery = {
        page: 1,
        limit: 10,
      }
      const expectedResult: any = {
        page:1,
        limit: 10,
        total: 1,
        data: [],
      }

      jest
        .spyOn(advertiserRepository, 'findAllAdvertiser')
        .mockResolvedValue(expectedResult)

      const result = await service.findAll(queries)

      expect(result).toEqual(expectedResult)
      expect(advertiserRepository.findAllAdvertiser).toHaveBeenCalledWith(
        queries
      )
    })

    it('should throw NotFoundException if an error occurs', async () => {
      const queries: ApiLimitResourceQuery = {
        page: 1,
        limit: 10,
      }

      const errorMessage = 'Error finding advertisers'
      jest
        .spyOn(advertiserRepository, 'findAllAdvertiser')
        .mockRejectedValue(new Error(errorMessage))

      await expect(service.findAll(queries)).rejects.toThrowError(
        NotFoundException
      )
      expect(advertiserRepository.findAllAdvertiser).toHaveBeenCalledWith(
        queries
      )
    })
  })

  describe('findOne', () => {
    it('should find an advertiser by ID', async () => {
      const id = '123'
      const expectedResult: any = {
        id: '',
        name: '',
        location: '',
        user: {},
        activities: [],
      }

      jest
        .spyOn(advertiserRepository, 'findOneAdvertiser')
        .mockResolvedValue(expectedResult)

      const result = await service.findOne(id)

      expect(result).toEqual(expectedResult)
      expect(advertiserRepository.findOneAdvertiser).toHaveBeenCalledWith(id)
    })

    it('should throw NotFoundException if advertiser is not found', async () => {
      const id = '123'

      const errorMessage = 'Advertiser not found'
      jest
        .spyOn(advertiserRepository, 'findOneAdvertiser')
        .mockRejectedValue(new Error(errorMessage))

      await expect(service.findOne(id)).rejects.toThrowError(NotFoundException)
      expect(advertiserRepository.findOneAdvertiser).toHaveBeenCalledWith(id)
    })
  })

  describe('update', () => {
    it('should update an advertiser', async () => {
      const id = '123'
      const updateDto: any = {
          name: '',
          location: '',
          activities: [],
          user: {},
      }
      const expectedResult: any = {
        id: '',
        name: '',
        location: '',
        user: {},
        activities: [],
      }

      jest
        .spyOn(advertiserRepository, 'updateAdvertiser')
        .mockResolvedValue(expectedResult)

      const result = await service.update(id, updateDto)

      expect(result).toEqual(expectedResult)
      expect(advertiserRepository.updateAdvertiser).toHaveBeenCalledWith(
        id,
        updateDto
      )
    })

    it('should throw UnauthorizedException if an error occurs', async () => {
      const id = '123'
      const updateDto: any = {
          name: '',
          location: '',
          activities: [],
          user: {},
      }

      const errorMessage = 'Error updating advertiser'
      jest
        .spyOn(advertiserRepository, 'updateAdvertiser')
        .mockRejectedValue(new Error(errorMessage))

      await expect(service.update(id, updateDto)).rejects.toThrowError(
        UnauthorizedException
      )
      expect(advertiserRepository.updateAdvertiser).toHaveBeenCalledWith(
        id,
        updateDto
      )
    })
  })
})
