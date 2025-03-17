import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';

import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { addCircle, checkmarkCircle, closeCircle, trash } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { provideHttpClient } from '@angular/common/http';

addIcons({
  'add-circle': addCircle,
  'checkmark-circle': checkmarkCircle,
  'close-circle': closeCircle,
  'trash': trash,
  
});

bootstrapApplication(AppComponent, {
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    provideIonicAngular(),
    provideRouter(routes, withPreloading(PreloadAllModules)),
    provideHttpClient(),
  ],
});
