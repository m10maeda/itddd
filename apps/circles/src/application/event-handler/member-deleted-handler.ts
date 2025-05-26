import { type ICircleRepository } from '../../domain/models/circle';
import {
  JoinedCircleSpecification,
  NoMembersCircleSpecification,
  OwnedCircleSpecification,
} from '../../domain/models/circle/specifications';
import { IMemberDeletedHandler, Member } from '../../domain/models/member';
import { OwnerCandidateChoicer } from '../../domain/services';
import {
  ChangeOwnerUseCaseInputData,
  DeleteCircleUseCaseInputData,
  type IChangeOwnerUseCaseInputPort,
  type IDeleteCircleUseCaseInputPort,
  type IRemoveMemberUseCaseInputPort,
  RemoveMemberUseCaseInputData,
} from '../use-case/input-ports';

export class MemberDeletedHandler implements IMemberDeletedHandler {
  private readonly changeOwnerUseCase: IChangeOwnerUseCaseInputPort;

  private readonly circleRepository: ICircleRepository;

  private readonly deleteCircleUseCase: IDeleteCircleUseCaseInputPort;

  private readonly removeMemberUseCase: IRemoveMemberUseCaseInputPort;

  public async onMemberDeleted(member: Member): Promise<void> {
    await this.changeOwnerIfNeeded(member);
    await this.deleteCircleIfNeeded(member);
    await this.removeIfNeeded(member);
  }

  private async changeOwnerIfNeeded(member: Member): Promise<void> {
    const spec = new OwnedCircleSpecification(member).andNot(
      new NoMembersCircleSpecification(),
    );

    const circles = await this.circleRepository.findAllBy(spec);

    for (const circle of circles) {
      const candidate = new OwnerCandidateChoicer(circle).choose();

      await this.changeOwnerUseCase.handle(
        new ChangeOwnerUseCaseInputData(
          circle.id.toString(),
          candidate.id.toString(),
        ),
      );
    }
  }

  private async deleteCircleIfNeeded(member: Member): Promise<void> {
    const spec = new OwnedCircleSpecification(member).and(
      new NoMembersCircleSpecification(),
    );

    const circles = await this.circleRepository.findAllBy(spec);

    for (const circle of circles) {
      await this.deleteCircleUseCase.handle(
        new DeleteCircleUseCaseInputData(circle.id.toString()),
      );
    }
  }

  private async removeIfNeeded(member: Member): Promise<void> {
    const spec = new JoinedCircleSpecification(member);
    const circles = await this.circleRepository.findAllBy(spec);

    for (const circle of circles) {
      await this.removeMemberUseCase.handle(
        new RemoveMemberUseCaseInputData(
          circle.id.toString(),
          member.id.toString(),
        ),
      );
    }
  }

  public constructor(
    circleRepository: ICircleRepository,
    removeMemberUseCase: IRemoveMemberUseCaseInputPort,
    changeOwnerUseCase: IChangeOwnerUseCaseInputPort,
    deleteCircleUseCase: IDeleteCircleUseCaseInputPort,
  ) {
    this.circleRepository = circleRepository;
    this.removeMemberUseCase = removeMemberUseCase;
    this.changeOwnerUseCase = changeOwnerUseCase;
    this.deleteCircleUseCase = deleteCircleUseCase;
  }
}
