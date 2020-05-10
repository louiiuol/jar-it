import { UserView } from './user-view.model';

/**
 * Represents current User's detailed informations
 * when accessing own  profile
 */
export class UserViewDetails extends UserView {
  public readonly birthDate: Date;
  public readonly email: string;
  public readonly roles: [{ code: string }];
}
