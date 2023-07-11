import { UseCaseRequest } from './UseCaseRequest';
import { UseCaseResponse } from './UseCaseResponse';

export interface IUseCase<
  TRequest extends UseCaseRequest,
  TResponse extends UseCaseResponse,
> {
  handle(request: TRequest): Promise<TResponse>;
}
