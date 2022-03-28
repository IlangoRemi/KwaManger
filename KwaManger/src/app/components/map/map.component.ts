import { environment } from '../../../environments/environment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit {



  style = 'mapbox://styles/mapbox/streets-v11';


  constructor() {}

  ngOnInit() {

    //2 Pl. de la République, 53140 Pré-en-Pail-Saint-Samson
    let lat = 48.460749;
    let lng = -0.197194;
    let map;
    map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1Ijoic2ltb25nZXNsYWluIiwiYSI6ImNrenptNTZ2dTAyZmMzZG5qdzQ2Z2x5NWIifQ.mVsYk89FQSw3KWbsPRugEQ',
      container: 'map',
      style: this.style,
      zoom: 13,
    });   

    const geolocate = new mapboxgl.GeolocateControl({
     positionOptions: {
        enableHighAccuracy: true
      },

      trackUserLocation: true
    });

    map.addControl(geolocate);

    map.on('load', function(){
      geolocate.trigger();
    });

    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
    });

    /*const marker = new mapboxgl.Marker() // Initialize a new marker
    .setLngLat([this.lng, this.lat]) // Marker [lng, lat] coordinates
    .addTo(this.map);*/


  }


  //https://api.mapbox.com/geocoding/v5/mapbox.places/coffee.json?proximity=-122.25948,37.87221&bbox=-122.30937,37.84214,-122.23715,37.89838&access_token=pk.eyJ1Ijoic2ltb25nZXNsYWluIiwiYSI6ImNrenptNTZ2dTAyZmMzZG5qdzQ2Z2x5NWIifQ.mVsYk89FQSw3KWbsPRugEQ

  /*chercherSupermarche(){
    navigator.geolocation.getCurrentPosition(position => {
      const userCoordinates = [position.coords.longitude, position.coords.latitude];
      this.map.addSource("user-coordinates", {
        type: "geojson",
        data: {
          type: "Feature",
          geometry: {
            type: "Point",
            coordinates: userCoordinates
          }
        }
      });
      this.map.addLayer({
        id: "user-coordinates",
        source: "user-coordinates",
        type: "circle"
      });
      this.map.flyTo({
        center: userCoordinates,
        zoom: 14
      });
    });
  }*/
}
