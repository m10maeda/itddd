import { type UseCaseInputData } from './use-case-input-data';
import { type UseCaseOutputData } from './use-case-output-data';

export interface IUseCaseInputPort<
  TInput extends UseCaseInputData,
  TOutput extends UseCaseOutputData,
> {
  handle(input: TInput): Promise<TOutput>;
}
