import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';

import { routes } from './app.routes';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatSnackBarModule } from '@angular/material/snack-bar';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions({
        skipInitialTransition: true,
        onViewTransitionCreated: (transition) => console.log('onViewTransitionCreated', transition),
    })),
    importProvidersFrom(HttpClientModule),
    importProvidersFrom(MatSnackBarModule),
    provideAnimations()
],
};
