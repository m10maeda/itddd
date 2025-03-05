import { createMock } from '@golevelup/ts-jest';

import { IMemberExistenceService } from '../../src/domain/models/member';

export const stubMemberRepository = createMock<IMemberExistenceService>({
  exists: () => Promise.resolve(true),
});
