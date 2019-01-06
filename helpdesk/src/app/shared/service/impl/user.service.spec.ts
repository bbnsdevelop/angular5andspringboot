import { TestBed } from '@angular/core/testing';

import { UserServiceImpl } from './user.service';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: UserServiceImpl = TestBed.get(UserServiceImpl);
    expect(service).toBeTruthy();
  });
});
