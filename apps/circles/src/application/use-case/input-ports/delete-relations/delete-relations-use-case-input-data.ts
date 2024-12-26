import { UseCaseInputData } from '../use-case-input-data';

export class DeleteRelationsUseCaseInputData extends UseCaseInputData {
  public readonly member: string;

  public constructor(member: string) {
    super();

    this.member = member;
  }
}
