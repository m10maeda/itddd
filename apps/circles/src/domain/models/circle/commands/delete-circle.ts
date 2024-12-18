import { Command } from '../../shared';
import { type Circle } from '../circle';
import { CircleDeleted, ICircleEventPublisher } from '../event';

export class DeleteCircle extends Command {
  private readonly eventPublisher: ICircleEventPublisher;

  private readonly target: Circle;

  public async execute(): Promise<void> {
    const event = new CircleDeleted(this.target.id);

    await this.eventPublisher.publish(event);
  }

  public constructor(target: Circle, eventPublisher: ICircleEventPublisher) {
    super();

    this.target = target;
    this.eventPublisher = eventPublisher;
  }
}
