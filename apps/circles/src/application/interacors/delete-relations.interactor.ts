import { MemberId } from '../../domain/models/member';
import {
  DeleteRelation,
  IRelationEventPublisher,
  IRelationRepository,
} from '../../domain/models/relation';
import {
  DeleteCircleUseCaseOutputData,
  type DeleteRelationsUseCaseInputData,
  DeleteRelationsUseCaseOutputData,
  IDeleteRelationsUseCaseInputPort,
} from '../use-case/input-ports';

export class DeleteRelationsInteractor
  implements IDeleteRelationsUseCaseInputPort
{
  private readonly eventPublisher: IRelationEventPublisher;

  private readonly relationRepository: IRelationRepository;

  public async handle(
    input: DeleteRelationsUseCaseInputData,
  ): Promise<DeleteRelationsUseCaseOutputData> {
    const memberId = new MemberId(input.member);
    const relations = await this.relationRepository.getAllBy(memberId);

    await Promise.all(
      Array.from(relations).map(async (relation) => {
        const command = new DeleteRelation(relation, this.eventPublisher);

        await command.execute();
      }),
    );

    return new DeleteCircleUseCaseOutputData();
  }

  public constructor(
    eventPublisher: IRelationEventPublisher,
    relationRepository: IRelationRepository,
  ) {
    this.eventPublisher = eventPublisher;
    this.relationRepository = relationRepository;
  }
}
