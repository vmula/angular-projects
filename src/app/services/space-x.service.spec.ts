import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { SpaceXService } from './space-x.service';

describe('SpaceXService', () => {
  let service: SpaceXService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
      ],
    });
    service = TestBed.inject(SpaceXService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
