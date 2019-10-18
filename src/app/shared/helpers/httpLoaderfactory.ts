import { TranslateHttpLoader } from "@ngx-translate/http-loader";
import { HttpClient, HttpBackend } from "@angular/common/http";

export function HttpLoaderFactory(httpBackend: HttpBackend) {
  return new TranslateHttpLoader(
    new HttpClient(httpBackend),
    "src/assets/i18n/",
    ".json"
  );
}
