import { TestBed, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { SpaceXService, Space } from './services/space-x.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { AppModule } from './app.module';
import { of, throwError } from 'rxjs';


describe('AppComponent', () => {
  let httpTestingController = HttpTestingController;
  let spaceXService: SpaceXService;
  let baseUrl = 'https://api.spaceXdata.com/v3/launches?limit=10';
  let fixture: any;
  const spaceXMockData = [
    {
      flight_number: 1,
      mission_name: 'FalconSat',
      mission_id: [],
      upcoming: false,
      launch_year: '2006',
      links: {
        mission_patch: 'https://images2.imgbox.com/40/e3/GypSkayF_o.png',
        mission_patch_small: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png',
      },
      launch_success: true,
      launch_landing: true,
    },
    {
      flight_number: 1,
      mission_name: 'FalconSat',
      mission_id: [],
      upcoming: false,
      launch_year: '2006',
      links: {
        mission_patch: 'https://images2.imgbox.com/40/e3/GypSkayF_o.png',
        mission_patch_small: 'https://images2.imgbox.com/3c/0e/T8iJcSN3_o.png',
      },
      launch_success: true,
      launch_landing: true,
    },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        AppModule,
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    spaceXService = TestBed.inject(SpaceXService);
    httpTestingController = TestBed.get(HttpTestingController);

    fixture = TestBed.createComponent(AppComponent);
  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it("should return space X data", () => {
    spyOn(spaceXService, 'getSpaceX').and.returnValue(of(spaceXMockData));

    const app = fixture.componentInstance;

    app.getSpaceXData();

    fixture.detectChanges();

    const element = fixture.debugElement.nativeElement;

    const cardElements = element.querySelectorAll('.card');
    expect(cardElements.length).toEqual(2);

  });

  it("should return space X data with filter value", () => {
    spyOn(spaceXService, 'getSpaceX').and.returnValue(of(spaceXMockData));
    const app = fixture.componentInstance;

    app.getSpaceXByFilter('launch_year', '2006');

    fixture.detectChanges();

    expect(spaceXService.getSpaceX).toHaveBeenCalledWith({ limit: app.parameters.limit, launch_year: '2006' })

  });

  it("should return space X data failed", () => {
    const errorMsg = 'The API is not responding.';
    spyOn(spaceXService, 'getSpaceX').and.returnValue(throwError({}));

    const app = fixture.componentInstance;

    app.getSpaceXData();
    app.hasError = true;

    fixture.detectChanges();

    const element = fixture.debugElement.nativeElement;

    const errorElement = element.querySelector('.error-msg');

    expect(errorElement.textContent).toEqual(errorMsg);

  });


});
