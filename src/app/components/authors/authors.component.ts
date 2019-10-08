import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { Component, ElementRef, ViewChild, OnInit, Input } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  MatAutocompleteSelectedEvent,
  MatAutocomplete
} from "@angular/material/autocomplete";
import { MatChipInputEvent } from "@angular/material/chips";
import { Observable } from "rxjs";
import { map, startWith } from "rxjs/operators";

import { Author } from "../../models/Author";
import { AppState, selectAuthors } from "src/app/store/selectors/app.selector";
import { Store, select } from "@ngrx/store";
import { getAuthorlist } from "src/app/store/actions/courses.actions";

@Component({
  selector: "app-authors",
  templateUrl: "./authors.component.html",
  styleUrls: ["./authors.component.css"]
})
export class AuthorsComponent implements OnInit {
  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;

  separatorKeysCodes: number[] = [ENTER, COMMA];

  authorsControl = new FormControl();

  @Input() courseAuthors: Author[] = [];

  authorsFull$: Observable<Author[]>;
  authorsFull: Author[];

  authorsFiltered$: Observable<Author[]>;

  @ViewChild("authorInput", { static: false }) authorInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("auto", { static: false }) matAutocomplete: MatAutocomplete;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(getAuthorlist());
    this.authorsFull$ = this.store.pipe(select(selectAuthors));
    this.authorsFull$.subscribe(authors => (this.authorsFull = authors));
  }

  ngOnInit() {
    this.authorsFiltered$ = this.authorsControl.valueChanges.pipe(
      startWith(null),
      map((authorName: string | null) =>
        authorName ? this.filterAuthor(authorName) : this.courseAuthors.slice()
      )
    );
  }

  private filterAuthor(value: string): Author[] {
    const filterValues = value.toLowerCase().split(" ");

    return this.authorsFull.filter(
      author =>
        author.firstName.toLowerCase().indexOf(filterValues[0]) === 0 &&
        author.lastName.toLowerCase().indexOf(filterValues[1]) === 0
    );
  }

  add(event: MatChipInputEvent): void {
    if (!this.matAutocomplete.isOpen) {
      const input = event.input;
      const value = event.value;

      // Add author
      if ((value || "").trim()) {
      }

      // Reset the input value
      if (input) {
        input.value = "";
      }

      this.authorsControl.setValue(null);
    }
  }

  remove(author: Author): void {
    const index = this.courseAuthors.indexOf(author);

    if (index >= 0) {
      // remove
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    // this.authors.push(event.option.viewValue);
    this.authorInput.nativeElement.value = "";
    this.authorsControl.setValue(null);
  }
}
