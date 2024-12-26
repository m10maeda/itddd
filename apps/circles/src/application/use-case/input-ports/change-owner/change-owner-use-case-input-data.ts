import { UseCaseInputData } from '../use-case-input-data';

export class ChangeOwnerUseCaseInputData extends UseCaseInputData {
  public readonly id: string;

  public readonly owner: string;

  public constructor(id: string, owner: string) {
    super();

    this.id = id;
    this.owner = owner;
  }
}
