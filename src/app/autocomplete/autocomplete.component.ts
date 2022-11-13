import { Component, ElementRef, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { fromEvent, Observable, of } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { CitiesService } from './cities.service';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss']
})
export class AutocompleteComponent implements OnInit {
  @ViewChild('citySearchInput')  citySearchInput!: ElementRef;
  @Output() setCityNameEvent = new EventEmitter<{ name: string }>();

  cityQuantityToShow: number = 15;
  cities: any = [];
  showSearches: boolean = false;
  isSearching: boolean = false;
  searchedCities: any = [];

  constructor(private citiesService: CitiesService) {

  }

  ngOnInit() {
    this.getCitiesFromServer();
  }

  getCitiesFromServer()
  {
    this.citiesService.getCities().subscribe( res=> {
      this.cities = res;
      this.searchedCities = this.cities.slice(0, this.cityQuantityToShow);
    });

  }

  getCities(name: string): Observable<any> {
    return of(this.filterCities(name));
  }

  filterCities(name: string) {
    return this.cities.filter((X: string | string[])  => { return X.toString().toLowerCase().includes(name.toLowerCase()) }).slice(0, this.cityQuantityToShow);
  }

  citySearch() {
    const search$ = fromEvent(this.citySearchInput.nativeElement, 'keyup').pipe(
      map((event: any) => event.target.value),
      distinctUntilChanged(),
      tap(() => this.isSearching = true),
      switchMap((term) => term ? this.getCities(term) : of<any>(this.cities.slice(0, this.cityQuantityToShow))),
      tap(() => {
        this.isSearching = false;
          this.showSearches = true;
      }));

    search$.subscribe(data => {
      this.isSearching = false;
      this.searchedCities = data;
    });
  }

  setObjectName(name: string) {
    this.searchedCities = this.filterCities(name);
    this.setCityNameEvent.emit({ name });
    this.citySearchInput.nativeElement.value = name;
    this.showSearches = false;
  }

  trackById(index:number, item: string): string {
    return item;
  }

  closeDropDown(): void {
    this.showSearches = false;
  }

  startSearch() {
    this.citySearch();
    this.showSearches = true;
  }
}

