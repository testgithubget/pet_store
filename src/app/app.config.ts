import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
<<<<<<< HEAD
  providers: [provideRouter(routes), provideAnimationsAsync(),  provideHttpClient(withFetch()) ,
    provideAnimationsAsync(), provideAnimationsAsync()]
=======
  providers: [provideRouter(routes), provideAnimationsAsync(), provideHttpClient(withFetch()), provideAnimationsAsync()]
>>>>>>> 4e7bd13dcc29959884b181a4ba612b66548c1c45
};


