import { TestBed } from '@angular/core/testing'

import { BtnPageBackMobileService } from './btn-page-back-mobile.service'

describe('BtnPageBackMobileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: BtnPageBackMobileService = TestBed.get(BtnPageBackMobileService)
    expect(service).toBeTruthy()
  })
})
