import { CircleRenamed } from './event';
import { type CircleId } from './id/circle-id';
import { type CircleName } from './name/circle-name';

export class Circle {
  public readonly id: CircleId;

  private _name: CircleName;

  public get name(): CircleName {
    return this._name;
  }

  public renameTo(name: CircleName): CircleRenamed {
    const event = new CircleRenamed(this.id, name, this.name);

    this._name = name;

    return event;
  }

  public constructor(id: CircleId, name: CircleName) {
    this.id = id;
    this._name = name;
  }
}
