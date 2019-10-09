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

  @Input() courseAuthors: Author[];

  authorsFull$: Observable<Author[]>;
  authorsFull: Author[];

  authorsFiltered$: Observable<Author[]>;

  authors: Author[] = [];

  @ViewChild("authorInput", { static: false }) authorInput: ElementRef<
    HTMLInputElement
  >;
  @ViewChild("auto", { static: false }) matAutocomplete: MatAutocomplete;

  constructor(private store: Store<AppState>) {
    if (this.courseAuthors !== undefined) {
      this.authors = this.courseAuthors.splice(0);
    }
    this.store.dispatch(getAuthorlist());
    this.authorsFull$ = this.store.pipe(select(selectAuthors));
    this.authorsFull$.subscribe(authors => {
      this.authorsFull = authors;
      this.authorsFiltered$ = this.authorsControl.valueChanges.pipe(
        startWith(null),
        map(author => (author ? this.filterAuthor(author) : this.authorsFull))
      );
    });
  }

  ngOnInit() {}

  ngOnChanges() {}

  private filterAuthor(value: Author): Author[] {
    const filterValue = value.name.toLowerCase();

    return this.authorsFull.filter(
      author => author.name.toLowerCase().indexOf(filterValue) === 0
    );
  }

  remove(author: Author): void {
    const index = this.authors.indexOf(author);

    if (index >= 0) {
      this.authors.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.authors.push(event.option.value);
    console.log(this.authors);
    this.authorInput.nativeElement.value = "";
    this.authorsControl.setValue(null);
  }
}
