// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
    firebase: {
    projectId: 'ut-parking-921b5',
    appId: '1:52470088484:web:2100a5fcbbd121771229b1',
    storageBucket: 'ut-parking-921b5.appspot.com',
    locationId: 'us-central',
    apiKey: 'AIzaSyB29KK8DP9aiP5jWzb6NyQROtyE7PYcLRk',
    authDomain: 'ut-parking-921b5.firebaseapp.com',
    messagingSenderId: '52470088484',
  },
  URL_API: "http://localhost:8080/api"
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
