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
      center: [this.lng, this.lat]
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


  trouverLocalisation = async () => {
    let lieux="Carrefour";
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
        new mapboxgl.Marker().setLngLat(localisation.geometry.coordinates).addTo(this.map);
      }


    });



 
  };


  /*
  recipes.then(data => {
      for(const recette of data.hits){
        const componentFactory = this.resolver.resolveComponentFactory(RecetteComponent);
        const component = this.placeholder.createComponent(componentFactory);
        component.instance.titre = recette.recipe.label;
        component.instance.image = recette.recipe.image;
      }
    });
    */

  //https://api.mapbox.com/geocoding/v5/mapbox.places/coffee.json?proximity=-122.25948,37.87221&access_token=pk.eyJ1Ijoic2ltb25nZXNsYWluIiwiYSI6ImNrenptNTZ2dTAyZmMzZG5qdzQ2Z2x5NWIifQ.mVsYk89FQSw3KWbsPRugEQ

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
