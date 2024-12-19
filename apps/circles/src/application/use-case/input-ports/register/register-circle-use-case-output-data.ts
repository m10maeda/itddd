import { UseCaseOutputData } from '../use-case-output-data';

export class RegisterCircleUseCaseOutputData extends UseCaseOutputData {
  public readonly registeredId: string;

  public constructor(registeredId: string) {
    super();

    this.registeredId = registeredId;
  }
}
