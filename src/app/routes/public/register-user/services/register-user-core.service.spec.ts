import { TestBed } from '@angular/core/testing';

import { RegisterUserCoreService } from './register-user-core.service';

describe('RegisterUserCoreService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegisterUserCoreService = TestBed.get(RegisterUserCoreService);
    expect(service).toBeTruthy();
  });
});
