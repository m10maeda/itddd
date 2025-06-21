import {
  CircleDeleted,
  CircleId,
  ICircleEventPublisher,
  type ICircleRepository,
} from '../../domain/models/circle';
import {
  CircleRelationshipSpecification,
  IRelationshipEventPublisher,
  IRelationshipRepository,
  RelationshipDeleted,
} from '../../domain/models/relationship';
import { CircleNotFoundException } from '../use-case/exceptions';
import {
  type DeleteCircleUseCaseInputData,
  DeleteCircleUseCaseOutputData,
  IDeleteCircleUseCaseInputPort,
} from '../use-case/input-ports';

export class DeleteCircleInteractor implements IDeleteCircleUseCaseInputPort {
  private readonly circleEventPublisher: ICircleEventPublisher;

  private readonly circleRepository: ICircleRepository;

  private readonly relationEventPublisher: IRelationshipEventPublisher;

  private readonly relationshipRepository: IRelationshipRepository;

  public async handle(
    input: DeleteCircleUseCaseInputData,
  ): Promise<DeleteCircleUseCaseOutputData> {
    const circle = await this.circleRepository.getBy(new CircleId(input.id));

    if (circle === undefined) throw new CircleNotFoundException(input.id);

    await this.circleEventPublisher.publish(new CircleDeleted(circle.id));

    const spec = new CircleRelationshipSpecification(circle.id);
    const relationships = await this.relationshipRepository.getAllBy(spec);

    await Promise.all(
      Array.from(relationships).map(async (relationship) => {
        await this.relationEventPublisher.publish(
          new RelationshipDeleted(relationship.circleId, relationship.memberId),
        );
      }),
    );

    return new DeleteCircleUseCaseOutputData();
  }

  public constructor(
    circleRepository: ICircleRepository,
    relationshipRepository: IRelationshipRepository,
    circleEventPublisher: ICircleEventPublisher,
    relationEventPublisher: IRelationshipEventPublisher,
  ) {
    this.circleRepository = circleRepository;
    this.relationshipRepository = relationshipRepository;
    this.circleEventPublisher = circleEventPublisher;
    this.relationEventPublisher = relationEventPublisher;
  }
}
