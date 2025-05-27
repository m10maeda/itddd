import { type Member } from './member';

export interface IMemberDeletedHandler {
  onMemberDeleted(member: Member): Promise<void>;
}
