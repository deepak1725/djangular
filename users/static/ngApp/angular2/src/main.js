"use strict";
exports.__esModule = true;
var core_1 = require("@angular/core");
var environment_1 = require("./environments/environment");
var app_module_ngfactory_1 = require("../aot/src/app/app.module.ngfactory");
var platform_browser_1 = require("@angular/platform-browser");
if (environment_1.environment.production) {
    core_1.enableProdMode();
}
platform_browser_1.platformBrowser().bootstrapModuleFactory(app_module_ngfactory_1.AppModuleNgFactory);
