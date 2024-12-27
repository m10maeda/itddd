import {
  type CircleRegistered,
  type CircleEvent,
  type CircleId,
  type CircleName,
  type CircleRenamed,
} from '../../../domain/models/circle';

export interface ICircleEventLoader {
  loadAllBy(id: CircleId): Promise<Iterable<CircleEvent>>;
  loadAllRegisteredEvents(): Promise<Iterable<CircleRegistered>>;
  loadRegisteredOrRenamedEventsWith(
    name: CircleName,
  ): Promise<Iterable<CircleRegistered | CircleRenamed>>;
}
