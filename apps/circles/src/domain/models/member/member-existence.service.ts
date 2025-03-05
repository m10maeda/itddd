import { type Member } from './member';

export interface IMemberExistenceService {
  exists(member: Member): Promise<boolean>;
}
