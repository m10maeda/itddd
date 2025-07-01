import { IMemberDeletedHandler, Member } from '../../domain/models/member';
import {
  CircleRelationshipSpecification,
  type IRelationshipRepository,
  MemberRelationshipSpecification,
  Role,
  RoleRelationshipSpecification,
} from '../../domain/models/relationship';
import { OwnerCandidateRelationshipChoicer } from '../../domain/services';
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

  private readonly deleteCircleUseCase: IDeleteCircleUseCaseInputPort;

  private readonly relationshipRepository: IRelationshipRepository;

  private readonly removeMemberUseCase: IRemoveMemberUseCaseInputPort;

  public async onMemberDeleted(member: Member): Promise<void> {
    await this.removeIfNeeded(member);

    await this.changeOwnerOrDeleteCircleIfNeeded(member);
  }

  private async changeOwnerOrDeleteCircleIfNeeded(
    member: Member,
  ): Promise<void> {
    const spec = new MemberRelationshipSpecification(member.id).and(
      new RoleRelationshipSpecification(Role.Owner),
    );
    const relationships = await this.relationshipRepository.getAllBy(spec);

    for (const relationship of relationships) {
      const memberRelations = await this.relationshipRepository.getAllBy(
        new CircleRelationshipSpecification(relationship.circleId).and(
          new RoleRelationshipSpecification(Role.Member),
        ),
      );

      if (Array.from(memberRelations).length === 0) {
        await this.deleteCircleUseCase.handle(
          new DeleteCircleUseCaseInputData(relationship.circleId.toString()),
        );
      } else {
        const candidate = await new OwnerCandidateRelationshipChoicer(
          relationship.circleId,
          this.relationshipRepository,
        ).choice();

        await this.changeOwnerUseCase.handle(
          new ChangeOwnerUseCaseInputData(
            candidate.circleId.toString(),
            candidate.memberId.toString(),
          ),
        );
      }
    }
  }

  private async removeIfNeeded(member: Member): Promise<void> {
    const spec = new MemberRelationshipSpecification(member.id).and(
      new RoleRelationshipSpecification(Role.Member),
    );
    const relationships = await this.relationshipRepository.getAllBy(spec);

    for (const relationship of relationships) {
      await this.removeMemberUseCase.handle(
        new RemoveMemberUseCaseInputData(
          relationship.circleId.toString(),
          relationship.memberId.toString(),
        ),
      );
    }
  }

  public constructor(
    relationshipRepository: IRelationshipRepository,
    removeMemberUseCase: IRemoveMemberUseCaseInputPort,
    changeOwnerUseCase: IChangeOwnerUseCaseInputPort,
    deleteCircleUseCase: IDeleteCircleUseCaseInputPort,
  ) {
    this.relationshipRepository = relationshipRepository;
    this.removeMemberUseCase = removeMemberUseCase;
    this.changeOwnerUseCase = changeOwnerUseCase;
    this.deleteCircleUseCase = deleteCircleUseCase;
  }
}
