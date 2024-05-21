import { ApplicationConfig, Injectable, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { HAMMER_GESTURE_CONFIG, HammerGestureConfig, HammerModule } from '@angular/platform-browser';

import 'hammerjs';
@Injectable()
export class HammerConfig extends HammerGestureConfig {
  override overrides = <any>{
    swipe: { direction: Hammer.DIRECTION_ALL },
    pan: { direction: Hammer.DIRECTION_ALL, pointers: 2, taps: 2 }
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    // { provide: HAMMER_GESTURE_CONFIG, useClass: HammerConfig },
    importProvidersFrom(HammerModule)
  ]
};
