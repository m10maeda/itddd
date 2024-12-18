import { createMock } from '@golevelup/ts-jest';

import { members } from './mocks';
import { IMemberRepository, MemberId } from '../../src/domain/models/member';

export const stubMemberRepository = createMock<IMemberRepository>({
  getAllBy: async (ids: Iterable<MemberId>) =>
    Promise.resolve(
      members.filter((member) =>
        Array.from(ids).some((id) => id.equals(member.id)),
      ),
    ),
  getBy: async (id: MemberId) =>
    Promise.resolve(members.find((member) => member.id.equals(id))),
});
