export interface ISpecification<T> {
  isSatisfiedBy(target: T): boolean;
  and(spec: ISpecification<T>): ISpecification<T>;
  andNot(spec: ISpecification<T>): ISpecification<T>;
  or(spec: ISpecification<T>): ISpecification<T>;
  orNot(spec: ISpecification<T>): ISpecification<T>;
  not(): ISpecification<T>;
}
