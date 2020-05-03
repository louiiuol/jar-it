import { RegisterInfo } from './register.model';

describe('Register Model', () => {

  let entity: RegisterInfo;

  it('should create', () => {
    entity = new RegisterInfo('tester42', 'test@mail.com', 'password', new Date(1995, 11, 17));
    expect(entity).toBeTruthy();
  });

});
