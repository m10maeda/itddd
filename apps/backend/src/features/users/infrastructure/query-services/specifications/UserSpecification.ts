import { AbstractSpecification } from '../../../../shared/domain/models';
import { IUserSpecification } from '../../../domain/models/IUserSpecification';
import { User } from '../../../domain/models/User';

export abstract class UserSpecification
  extends AbstractSpecification<User>
  implements IUserSpecification {}
