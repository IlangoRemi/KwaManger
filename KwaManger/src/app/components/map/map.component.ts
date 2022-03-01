import { environment } from '../../../environments/environment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit {

  map: mapboxgl.Map;


  style = 'mapbox://styles/mapbox/streets-v11';

  //2 Pl. de la République, 53140 Pré-en-Pail-Saint-Samson
  lat = 48.460749;
  lng = -0.197194;

  constructor() {}
  ngOnInit() {
      this.map = new mapboxgl.Map({
        accessToken: 'pk.eyJ1Ijoic2ltb25nZXNsYWluIiwiYSI6ImNrenptNTZ2dTAyZmMzZG5qdzQ2Z2x5NWIifQ.mVsYk89FQSw3KWbsPRugEQ',
        container: 'map',
        style: this.style,
        zoom: 13,
        center: [this.lng, this.lat]
    });    // Add map controls
    this.map.addControl(
      new mapboxgl.GeolocateControl({
        positionOptions: {
          enableHighAccuracy: true
        },
        // When active the map will receive updates to the device's location as it changes.
        trackUserLocation: true,
        // Draw an arrow next to the location dot to indicate which direction the device is heading.
        showUserHeading: true
      })
    );
  }}
