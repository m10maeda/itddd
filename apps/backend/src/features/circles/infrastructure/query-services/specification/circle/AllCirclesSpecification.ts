import { type Circle, CircleSpecification } from '../../../../domain';

export class AllCiecleSpecification extends CircleSpecification {
  // eslint-disable-next-line class-methods-use-this, @typescript-eslint/no-unused-vars
  public isSatisfiedBy(target: Circle): boolean {
    return true;
  }
}
