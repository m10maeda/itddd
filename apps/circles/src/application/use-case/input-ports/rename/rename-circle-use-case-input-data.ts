import { UseCaseInputData } from '../use-case-input-data';

export class RenameCircleUseCaseInputData extends UseCaseInputData {
  public readonly id: string;

  public readonly name: string;

  public constructor(id: string, name: string) {
    super();

    this.id = id;
    this.name = name;
  }
}
