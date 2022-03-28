import { environment } from '../../../environments/environment';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit {



  style = "mapbox://styles/mapbox/dark-v10";


  lat = 48.460749;
  lng = -0.197194;

 map: mapboxgl.Map;

  constructor() {}

  ngOnInit() {

    //2 Pl. de la République, 53140 Pré-en-Pail-Saint-Samson
    
    this.map = new mapboxgl.Map({
      accessToken: 'pk.eyJ1Ijoic2ltb25nZXNsYWluIiwiYSI6ImNrenptNTZ2dTAyZmMzZG5qdzQ2Z2x5NWIifQ.mVsYk89FQSw3KWbsPRugEQ',
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
    });   

    const geolocate = new mapboxgl.GeolocateControl({
     positionOptions: {
        enableHighAccuracy: true
      },

      trackUserLocation: true
    });

    this.map.addControl(geolocate);

    this.map.on('load', function(){
      geolocate.trigger();
    });

    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });


    /*const marker = new mapboxgl.Marker() // Initialize a new marker
    .setLngLat([this.lng, this.lat]) // Marker [lng, lat] coordinates
    .addTo(this.map);*/


  }

  requeteApi = async(url: string) => {
  
    return fetch(url).then(response => {
      if(response.status >=200 && response.status < 300){
        return response.json();
      }else{
        return new Error('Erreur serveur');
      }
    })
    .catch(error => {
      alert(error);
      throw new Error('Erreur chargement');
    });
  };


  trouverLocalisation = async (lieux: string) => {
    let token = "pk.eyJ1Ijoic2ltb25nZXNsYWluIiwiYSI6ImNrenptNTZ2dTAyZmMzZG5qdzQ2Z2x5NWIifQ.mVsYk89FQSw3KWbsPRugEQ";
    let rayon = 5
    let R = 6371; // Rayon de la terre
    let x1 = this.lng-(rayon/R/Math.cos(this.lat));
    let x2 = this.lng-(rayon/R/Math.cos(this.lat));
    let y1 = this.lat+(rayon/R);
    let y2 = this.lat-(rayon/R);

    let bbox = "&bbox="+x1.toString()+","+x2.toString()+","+y1.toString()+","+y2.toString();
    console.log("Lat :  " + this.lat.toString() + ", Lng : " + this.lng.toString());

    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + lieux + ".json?proximity=" + this.lng.toString()  + "," + this.lat.toString() + bbox + "&access_token=" + token;
    console.log("Lat :  " + this.lat.toString() + ", Lng : " + this.lng.toString());
    console.log("Voici l'url : " + url);
    let reponse = this.requeteApi(url);
    console.log(reponse);

    
    reponse.then(data => {
      for(const localisation of data.features){

        const el = document.createElement('div');
        /* Assign a unique `id` to the marker. */
        el.id = `marker-${localisation.properties.id}`;
        /* Assign the `marker` class to each marker for styling. */
        el.className = 'marker';

        
        let marker = new mapboxgl.Marker()
        .setLngLat(localisation.geometry.coordinates)
        .addTo(this.map);

        new mapboxgl.Popup()
          .setLngLat(localisation.geometry.coordinates)
          .setHTML(
            `<h3>${localisation.text}</h3><h4>${localisation.properties.address}</h4>`
          )
          .addTo(this.map);

        el.addEventListener('click',(e) => {
          this.map.flyTo({
            center: localisation.geometry.coordinates,
            zoom: 15
          });
          const activeItem = document.getElementsByClassName('active');
          e.stopPropagation();
          
          const listing = document.getElementById(
            `listing-${localisation.properties.id}`
          );
          if(listing != null){
            listing.classList.add('active');
          }
        });
        

      }


    });
  };


  trouverToutesLesLocalisations(){
    this.map.addLayer({
      'id': 'places',
      'type': 'symbol',
      'source': 'places', // Your Geojson, added as a [Source][4]
      'layout': {
        'icon-image': '{icon}-15',
        'icon-allow-overlap': true
      }
    });
    this.trouverLocalisation("Carrefour");
    this.trouverLocalisation("Leclerc");
    this.trouverLocalisation("Super U");
    this.trouverLocalisation("Intermarche");
    this.trouverLocalisation("Lidl");
    this.trouverLocalisation("supermarket");   
    
  };
}
