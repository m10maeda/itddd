import { MemberExistenceException } from './member-existence.exception';
import { IMemberExistenceService, Member } from '../../../domain/models/member';

import type { paths } from '@itddd/profiles-api';
import type { Client } from 'openapi-fetch';

export class MemberExistenceService implements IMemberExistenceService {
  private readonly client: Client<paths>;

  public async exists(member: Member): Promise<boolean> {
    const { error, response } = await this.client.GET('/{id}', {
      params: { path: { id: member.id.toString() } },
    });

    if (error !== undefined) {
      if (error.status === 404) return false;

      throw new MemberExistenceException(
        error.status ?? response.status,
        error.title,
      );
    }

    return true;
  }

  public constructor(client: Client<paths>) {
    this.client = client;
  }
}
