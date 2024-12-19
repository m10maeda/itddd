// import { AndSpecification } from './and-specification';
// import { NotSpecification } from './not-specification';
// import { OrSpecification } from './or-specification';

export interface ISpecification<T> {
  and(spec: ISpecification<T>): ISpecification<T>;
  andNot(spec: ISpecification<T>): ISpecification<T>;
  isSatisfiedBy(target: T): boolean | Promise<boolean>;
  not(): ISpecification<T>;
  or(spec: ISpecification<T>): ISpecification<T>;
  orNot(spec: ISpecification<T>): ISpecification<T>;
}

export abstract class Specification<T> implements ISpecification<T> {
  public abstract isSatisfiedBy(target: T): boolean | Promise<boolean>;

  public and(spec: ISpecification<T>): ISpecification<T> {
    return new AndSpecification(this, spec);
  }

  public andNot(spec: ISpecification<T>): ISpecification<T> {
    return new AndSpecification(this, spec.not());
  }

  public not(): ISpecification<T> {
    return new NotSpecification(this);
  }

  public or(spec: ISpecification<T>): ISpecification<T> {
    return new OrSpecification(this, spec);
  }

  public orNot(spec: ISpecification<T>): ISpecification<T> {
    return new OrSpecification(this, spec.not());
  }
}

export abstract class CompositeSpecification<T> extends Specification<T> {
  protected readonly left: ISpecification<T>;

  protected readonly right: ISpecification<T>;

  public constructor(left: ISpecification<T>, right: ISpecification<T>) {
    super();

    this.left = left;
    this.right = right;
  }
}

export class AndSpecification<T> extends CompositeSpecification<T> {
  public isSatisfiedBy(target: T): boolean | Promise<boolean> {
    return this.left.isSatisfiedBy(target) && this.right.isSatisfiedBy(target);
  }
}

export class OrSpecification<T> extends CompositeSpecification<T> {
  public isSatisfiedBy(target: T): boolean | Promise<boolean> {
    return this.left.isSatisfiedBy(target) || this.right.isSatisfiedBy(target);
  }
}

export class NotSpecification<T> extends Specification<T> {
  private readonly spec: ISpecification<T>;

  public isSatisfiedBy(target: T): boolean | Promise<boolean> {
    return !this.spec.isSatisfiedBy(target);
  }

  public constructor(spec: ISpecification<T>) {
    super();

    this.spec = spec;
  }
}
