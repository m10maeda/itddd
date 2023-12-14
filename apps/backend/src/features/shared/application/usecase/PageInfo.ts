export class PageInfo {
  public readonly page: number;

  public readonly size: number;

  public chunk<T>(items: Iterable<T>): Iterable<T> {
    const start = this.size * (this.page - 1);
    const end = this.size * this.page;

    return Array.from(items).slice(start, end);
  }

  public constructor(page: number, size: number) {
    if (page < 1) throw new RangeError();
    if (!Number.isInteger(page)) throw new RangeError();

    if (size < 1) throw new RangeError();
    if (!Number.isInteger(size)) throw new RangeError();

    this.page = page;
    this.size = size;
  }
}
