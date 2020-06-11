import { UserViewDetails } from './user-view-details.model';

describe('User Details Model', () => {

  let entity: UserViewDetails;

  it('should create', () => {
    entity = new UserViewDetails(1, 'tester', 'm4');
    expect(entity).toBeTruthy();
  });

});
