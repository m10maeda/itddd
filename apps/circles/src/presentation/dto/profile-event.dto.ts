import { IsString } from 'class-validator';

export enum EventType {
  registered = 'registered',
  renamed = 'renamed',
  deleted = 'deleted',
}

export class ProfileEventDto {
  @IsString()
  public readonly id: string;

  @IsString()
  public readonly type: EventType;

  public constructor(id: string, type: EventType) {
    this.id = id;
    this.type = type;
  }
}
