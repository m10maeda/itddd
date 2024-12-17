import {
  Body,
  ConflictException,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';

import { CircleService } from './circle.service';
import {
  AddMemberDto,
  ChangeOwnerDto,
  PageInfoDto,
  RegisterCircleDto,
  RenameCircleDto,
} from './dto';
import { Circle, Member } from './entities';
import {
  CanNotRegisterCircleException,
  CanNotRenameCircleException,
  CircleNotFoundException,
  RelationNotFoundException,
} from '../application/use-case/exceptions';

import type { Response } from 'express';

@Controller()
export class CircleController {
  private readonly service: CircleService;

  @Post(':id/members')
  public async addMember(
    @Param('id') id: string,
    @Body() acceptMemberDto: AddMemberDto,
  ): Promise<void> {
    try {
      await this.service.addMember(id, acceptMemberDto.id);
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException();

      throw error;
    }
  }

  @Put(':id/owner')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async changeOwner(
    @Param('id') id: string,
    @Body() { id: ownerId }: ChangeOwnerDto,
  ) {
    try {
      await this.service.changeOwner(id, ownerId);
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException();

      throw error;
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async delete(@Param('id') id: string): Promise<void> {
    try {
      await this.service.delete(id);
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException();

      throw error;
    }
  }

  @Get()
  public async findAllBy(
    @Query() { page, size }: PageInfoDto,
  ): Promise<Iterable<Circle>> {
    const circles = await this.service.findAllBy(page, size);

    return Array.from(circles).map((circle) => Circle.create(circle));
  }

  @Get(':id')
  public async getBy(@Param('id') id: string): Promise<Circle> {
    try {
      const circle = await this.service.getBy(id);

      return Circle.create(circle);
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException();

      throw error;
    }
  }

  @Get(':id/candidates')
  public async getCandidatesBy(@Param('id') id: string): Promise<Member[]> {
    try {
      const candidates = await this.service.getCandidates(id);

      return Array.from(candidates).map(
        (candidate) => new Member(candidate.id),
      );
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException();

      throw error;
    }
  }

  @Post()
  public async register(
    @Body() registerCircleDto: RegisterCircleDto,
    @Res() response: Response,
  ): Promise<Response> {
    try {
      const registeredId = await this.service.register(
        registerCircleDto.name,
        registerCircleDto.owner,
      );

      response.set('Location', `/${registeredId}`);

      return response.send();
    } catch (error) {
      if (error instanceof CanNotRegisterCircleException)
        throw new ConflictException();

      throw error;
    }
  }

  @Delete(':id/members/:memberId')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async removeMember(
    @Param('id') id: string,
    @Param('memberId') memberId: string,
  ): Promise<void> {
    try {
      await this.service.removeMember(id, memberId);
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException();
      if (error instanceof RelationNotFoundException)
        throw new NotFoundException();

      throw error;
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async update(
    @Param('id') id: string,
    @Body() renameCircleDto: RenameCircleDto,
  ): Promise<void> {
    try {
      await this.service.rename(id, renameCircleDto.name);
    } catch (error) {
      if (error instanceof CircleNotFoundException)
        throw new NotFoundException();
      if (error instanceof CanNotRenameCircleException)
        throw new ConflictException();

      throw error;
    }
  }

  public constructor(service: CircleService) {
    this.service = service;
  }
}
