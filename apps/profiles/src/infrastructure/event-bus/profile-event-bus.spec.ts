import { createMock } from '@golevelup/ts-jest';

import { ProfileEventBus } from './profile-event-bus';
import {
  ProfileDeleted,
  IProfileEventSubscriber,
  ProfileRegistered,
  ProfileId,
  ProfileName,
} from '../../domain/models';

describe('ProfileEventBus', () => {
  const mockProfileRegisteredSubscriber =
    createMock<IProfileEventSubscriber<ProfileRegistered>>();
  const mockProfileDeletedSubscriber =
    createMock<IProfileEventSubscriber<ProfileDeleted>>();

  it('should invoke subscriber when publish subscribed event', async () => {
    const sut = new ProfileEventBus();

    sut.subscribe(ProfileRegistered, mockProfileRegisteredSubscriber);

    await sut.publish(
      new ProfileRegistered(new ProfileId('1'), new ProfileName('Alice')),
    );

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockProfileRegisteredSubscriber.handle).toHaveBeenCalledOnce();
  });

  it('should not invoke subscriber when publish unsubscribed event', async () => {
    const sut = new ProfileEventBus();

    sut.subscribe(ProfileRegistered, mockProfileRegisteredSubscriber);

    await sut.publish(
      new ProfileRegistered(new ProfileId('1'), new ProfileName('Alice')),
    );

    // eslint-disable-next-line @typescript-eslint/unbound-method
    expect(mockProfileDeletedSubscriber.handle).not.toHaveBeenCalled();
  });
});
