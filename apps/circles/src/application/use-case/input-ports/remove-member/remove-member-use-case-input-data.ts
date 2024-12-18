import { UseCaseInputData } from '../use-case-input-data';

export class RemoveMemberUseCaseInputData extends UseCaseInputData {
  public readonly id: string;

  public readonly member: string;

  public constructor(id: string, member: string) {
    super();

    this.id = id;
    this.member = member;
  }
}
