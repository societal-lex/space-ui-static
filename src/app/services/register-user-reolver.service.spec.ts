import { TestBed } from '@angular/core/testing'

import { RegisterUserReolverService } from './register-user-reolver.service'

describe('RegisterUserReolverService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: RegisterUserReolverService = TestBed.get(RegisterUserReolverService)
    expect(service).toBeTruthy()
  })
})
