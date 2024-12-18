import { MemberRepositoryException } from './member-repository.exception';
import {
  IMemberRepository,
  Member,
  MemberId,
} from '../../../domain/models/member';

import type { paths } from '@itddd/profiles-api';
import type { Client } from 'openapi-fetch';

export class MemberRepository implements IMemberRepository {
  private readonly client: Client<paths>;

  public async getAllBy(ids: Iterable<MemberId>): Promise<Iterable<Member>> {
    const { data, error, response } = await this.client.GET('/');

    if (error !== undefined)
      throw new MemberRepositoryException(
        error.status ?? response.status,
        error.title,
      );

    const targetIds = Array.from(ids);

    return Array.from(data)
      .filter((profile) =>
        targetIds.some((targetId) => targetId.toString() === profile.id),
      )
      .map((profile) => new Member(new MemberId(profile.id)));
  }

  public async getBy(id: MemberId): Promise<Member | undefined> {
    const { data, error, response } = await this.client.GET('/{id}', {
      params: { path: { id: id.toString() } },
    });

    if (error !== undefined) {
      if (error.status === 404) return undefined;

      throw new MemberRepositoryException(
        error.status ?? response.status,
        error.title,
      );
    }

    return new Member(new MemberId(data.id));
  }

  public constructor(client: Client<paths>) {
    this.client = client;
  }
}
