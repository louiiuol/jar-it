import { UserView } from './user-view.model';

describe('User Model', () => {

  let entity: UserView;

  it('should create', () => {
    entity = new UserView(1, 'tester', 'm4');
    expect(entity).toBeTruthy();
  });

});
