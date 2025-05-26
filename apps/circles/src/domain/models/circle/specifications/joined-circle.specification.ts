import { Member } from '../../member';
import { Circle } from '../circle';
import { CircleSpecification } from '../circle.specification';

export class JoinedCircleSpecification extends CircleSpecification {
  private readonly member: Member;

  public isSatisfiedBy(target: Circle): boolean {
    return target.joins(this.member);
  }

  public constructor(member: Member) {
    super();

    this.member = member;
  }
}
