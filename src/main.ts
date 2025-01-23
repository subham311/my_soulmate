import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
declare let google: any;

// Google API //
function initMap(): void {
  const input = document.getElementById("location");
    // console.log(new google.maps.places);
    // autoComplete = new google.maps.places.Autocomplete((document.getElementById(id)), {types:['geocode']})
    this.autocomplete = new google.maps.places.Autocomplete(input,{types:['geocode']});
    google.maps.event.addListener(this.autocomplete, 'place_changed', function(){
        var place = this.autocomplete.getPlace()
        console.log(place.name, place.geometry.location.lat(), place.geometry.location.lng());
    })
}
// END //


platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
