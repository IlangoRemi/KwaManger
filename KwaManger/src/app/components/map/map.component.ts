import { environment } from '../../../environments/environment.prod';
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
      accessToken: environment.accessTokenMap,
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


  }
}
