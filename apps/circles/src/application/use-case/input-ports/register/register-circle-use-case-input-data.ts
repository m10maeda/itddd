import { UseCaseInputData } from '../use-case-input-data';

export class RegisterCircleUseCaseInputData extends UseCaseInputData {
  public readonly name: string;

  public readonly owner: string;

  public constructor(name: string, owner: string) {
    super();

    this.name = name;
    this.owner = owner;
  }
}
