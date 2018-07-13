import {
  NgModule,
  ModuleWithProviders,
  InjectionToken,
  APP_INITIALIZER
} from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { Provider } from './provider';

export const URL = new InjectionToken<string>('url');

export function initProvider(provider: Provider, url: string) {
  return  function() {
    return provider.init(url);
  }
}

// @dynamic
@NgModule({
  imports: [HttpClientModule]
})
export class ProviderModule {
  static init(url: string): ModuleWithProviders {
    return {
      ngModule: ProviderModule,
      providers: [
        { provide: Provider, useClass: Provider },
        { provide: URL, useValue: url },
        {
          provide: APP_INITIALIZER,
          useFactory: initProvider,
          multi: true,
          deps: [Provider, URL]
        },
      ]
    };
  };
}
