import { Token } from './token.model';
import { tokenMock } from './mocks/token.mock';

describe('Token Model', () => {

  let entity: Token;

  it('should create', () => {
    entity = new Token(tokenMock);
    expect(entity).toBeTruthy();
  });

});
