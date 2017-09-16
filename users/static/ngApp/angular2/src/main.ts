import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
// import { platformBrowser }    from '@angular/platform-browser';
// import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';

if (environment.production) {
  enableProdMode();
  console.log('Produc');
}
console.log('Running AOT compiled');
platformBrowserDynamic().bootstrapModule(AppModule);
