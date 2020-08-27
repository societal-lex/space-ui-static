import { TestBed } from '@angular/core/testing'

import { ContentFeedbackService } from './content-feedback.service'

describe('ContentFeedbackService', () => {
  beforeEach(() => TestBed.configureTestingModule({}))

  it('should be created', () => {
    const service: ContentFeedbackService = TestBed.get(ContentFeedbackService)
    expect(service).toBeTruthy()
  })
})
