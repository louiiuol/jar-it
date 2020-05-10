import { AuthLogin } from './login.model';

describe('Login Model', () => {

  let entity: AuthLogin;

  it('should create', () => {
    entity = new AuthLogin('tester42', 'password');
    expect(entity).toBeTruthy();
  });

});
