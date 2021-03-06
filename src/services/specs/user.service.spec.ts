import { container } from '../../ioc.container';
import { expect } from 'chai';
import { StorageServiceType, StorageService } from '../storage.service';
import { UserServiceType, UserServiceInterface } from '../user.service';

const storageService = container.get<StorageService>(StorageServiceType);
const userService = container.get<UserServiceInterface>(UserServiceType);

describe('userService', () => {
  afterEach(async() => {
    await storageService.flushdb();
  });

  describe('#create', () => {
    it('should create new user', async() => {
      const user = { email: 'test', login: 'test', tenant: 'test', password: 'test', sub: '123' };
      const result = await userService.create(user);
      expect(result).to.be.a('object');
    });
  });

  describe('#listForTenant', () => {

    it('should list users by tenant id', async() => {
      const userOne = { email: 'test', login: 'test', tenant: 'test', password: 'test', sub: '123' };
      const userTwo = { email: 'test1', login: 'test1', tenant: 'test', password: 'test', sub: '321' };
      await userService.create(userOne);
      await userService.create(userTwo);
      const result = await userService.listForTenant('test', '0');
      expect(result.users.length).to.be.equal(2);
    });

    it('should return empty list of users if tenant has no users', async() => {
      const result = await userService.listForTenant('test2', '0');
      expect(result).to.deep.equal({ users: [], nextCursor: '0' });
    });
  });

  describe('#get', () => {
    before(async() => {
      const userData = { email: 'test', login: 'test', tenant: 'test', password: 'test', sub: '123' };
      await userService.create(userData);
    });

    it('should return user', async() => {
      const userStr = await userService.get('test:test');
      const user = JSON.parse(userStr);
      expect(user.login).to.equal('test');
    });
  });
});
