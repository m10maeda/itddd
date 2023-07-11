export class InMemorySerialNumberAssigner {
  public next(): number {
    const { current } = this;

    this.current += 1;

    return current;
  }

  public constructor(initialize = 0) {
    this.current = initialize;
  }

  private current: number;
}
