// eslint-disable-next-line max-classes-per-file
import { ISpecification } from './ISpecification';

export abstract class AbstractSpecification<T> implements ISpecification<T> {
  public abstract isSatisfiedBy(target: T): boolean;

  public and(spec: ISpecification<T>): ISpecification<T> {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return new AndSpecification(this, spec);
  }

  public andNot(spec: ISpecification<T>): ISpecification<T> {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return new AndSpecification(this, spec.not());
  }

  public or(spec: ISpecification<T>): ISpecification<T> {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return new OrSpecification(this, spec);
  }

  public orNot(spec: ISpecification<T>): ISpecification<T> {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return new OrSpecification(this, spec.not());
  }

  public not(): ISpecification<T> {
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    return new NotSpecification(this);
  }
}

export abstract class CompositeSpecification<
  T,
> extends AbstractSpecification<T> {
  public constructor(left: ISpecification<T>, right: ISpecification<T>) {
    super();

    this.left = left;
    this.right = right;
  }

  protected readonly left: ISpecification<T>;

  protected readonly right: ISpecification<T>;
}

export class AndSpecification<T> extends CompositeSpecification<T> {
  public isSatisfiedBy(target: T): boolean {
    return this.left.isSatisfiedBy(target) && this.right.isSatisfiedBy(target);
  }
}

export class OrSpecification<T> extends CompositeSpecification<T> {
  public isSatisfiedBy(target: T): boolean {
    return this.left.isSatisfiedBy(target) || this.right.isSatisfiedBy(target);
  }
}

export class NotSpecification<T> extends AbstractSpecification<T> {
  public isSatisfiedBy(target: T): boolean {
    return !this.spec.isSatisfiedBy(target);
  }

  public constructor(spec: ISpecification<T>) {
    super();

    this.spec = spec;
  }

  private readonly spec: ISpecification<T>;
}
