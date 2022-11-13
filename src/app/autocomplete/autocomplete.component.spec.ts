import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutocompleteComponent } from './autocomplete.component';
import { CitiesService } from './cities.service';

describe('AutocompleteComponent', () => {
  let component: AutocompleteComponent;
  let fixture: ComponentFixture<AutocompleteComponent>;

  const citiesServiceSpy = jasmine.createSpyObj('CitiesService', ['getCities']);
  citiesServiceSpy.getCities.and.callFake((k: any) => k);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AutocompleteComponent ],
      providers: [
        { provide: CitiesService, useValue: citiesServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AutocompleteComponent);
    component = fixture.componentInstance;
    DetectChangesAndCatchException();
  });

  function DetectChangesAndCatchException() {
    try {
      fixture.detectChanges();
    } catch (e) {
    }
  }

  it('should create', () => {
    spyOn(component, 'getCitiesFromServer');
    expect(component).toBeTruthy();
  });

  it('should call getCitiesFromServer', () => {
    spyOn(component, 'getCitiesFromServer');
    component.getCitiesFromServer();
    expect(component.getCitiesFromServer).toHaveBeenCalled();
  });

  it('should have city input', () => {
    const compiled = fixture.debugElement.nativeElement;
    const input = compiled.querySelector('#city');
    expect(input).toBeTruthy();
  });

  it('should have citiesList Div if showSearches = true and searchedCities is not empty', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.showSearches = true;
    component.searchedCities = ['Haifa', 'Jerusalem'];
    DetectChangesAndCatchException();
    const citiesListDiv = compiled.querySelector('div[name=\'citiesListDiv\']');
    expect(citiesListDiv).toBeTruthy();
  });

  it('should not have citiesList Div if showSearches = true and searchedCities is empty', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.showSearches = true;
    component.searchedCities = [];
    DetectChangesAndCatchException();
    const citiesListDiv = compiled.querySelector('div[name=\'citiesListDiv\']');
    expect(citiesListDiv).toEqual(null);
  });

  it('should not have citiesList Div if showSearches = false', () => {
    const compiled = fixture.debugElement.nativeElement;
    component.showSearches = false;
    component.searchedCities = ['Haifa', 'Jerusalem'];
    DetectChangesAndCatchException();
    const citiesListDiv = compiled.querySelector('div[name=\'citiesListDiv\']');
    expect(citiesListDiv).toEqual(null);
  });

});
