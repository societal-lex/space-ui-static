import { TestBed } from '@angular/core/testing'

import { QnaService } from './qna.service'

describe('QnaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: QnaService = TestBed.get(QnaService)
    expect(service).toBeTruthy()
  })
})
