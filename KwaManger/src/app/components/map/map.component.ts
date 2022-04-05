import { environment } from '../../../environments/environment.prod';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})


export class MapComponent implements OnInit {

  style = "mapbox://styles/mapbox/dark-v10";

  //l'adresse par defaut est 2 Pl. de la République, 53140 Pré-en-Pail-Saint-Samson
  lat = 48.460749;
  lng = -0.197194;

 map!: mapboxgl.Map;

  constructor() {}

  ngOnInit() {
    
    //Creation de la carte
    this.map = new mapboxgl.Map({
      accessToken: environment.accessTokenMap,
      container: 'map',
      style: this.style,
      zoom: 13,
      center: [this.lng, this.lat],
    });   
    //Creation d'un geolocate qui tracke la position de l'utilisateur
    const geolocate = new mapboxgl.GeolocateControl({
     positionOptions: {
        enableHighAccuracy: true
      },

      trackUserLocation: true
    });
    //L'ajoute a la map
    this.map.addControl(geolocate);
    //L'active lorsque la map est charge
    this.map.on('load', function(){
      geolocate.trigger();
    });
    //Update les coordonees a celles de l'utilisateur
    navigator.geolocation.getCurrentPosition((position) => {
      this.lat = position.coords.latitude;
      this.lng = position.coords.longitude;
    });

  }
  /**
   * Fonction qui envoie une requette d'api
   * @param url = url de la requette
   * @returns json avec les resultats de la requette
   */
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

  /**
   * Fonction qui renvoie les 5 meilleures resultats correspondant a un lieux donnee autour de la localisation de l'utilisateur puis place un marker sur la carte sur le lieux et un popup sur ce marker avec le nom du lieux et son addresse
   * @param lieux = nom des lieux a rechercher
   */
  trouverLocalisation = async (lieux: string, flyto: boolean) => {
    let token = environment.accessTokenMap;
    let rayon = 5 // Rayon en km autour du quel on limite la recherche
    let R = 6371; // Rayon en km de la terre
    // Calcul des coordonnees de la bbox
    let x1 = this.lng-(rayon/R/Math.cos(this.lat));
    let x2 = this.lng-(rayon/R/Math.cos(this.lat));
    let y1 = this.lat+(rayon/R);
    let y2 = this.lat-(rayon/R);
    // Creation de la bbox en string
    let bbox = "&bbox="+x1.toString()+","+x2.toString()+","+y1.toString()+","+y2.toString();
    console.log("Lat :  " + this.lat.toString() + ", Lng : " + this.lng.toString());
    //Construction de l'url
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + lieux + ".json?proximity=" + this.lng.toString()  + "," + this.lat.toString() + bbox + "&access_token=" + token;
    //Affichage de l'url pour debug, clickable depuis la console
    console.log("Voici l'url : " + url);
    let reponse = this.requeteApi(url);

    
    //Interpretation de toutes les reponses
    reponse.then(data => {
      let resultat = data.features;
      
      if(flyto){
        this.map.flyTo({
          center: resultat[0].geometry.coordinates,
          zoom: 15
        });
      }
      
      for(const localisation of resultat){
        //Creation d'un element
        const el = document.createElement('div');
        el.id = `marker-${localisation.properties.id}`;
        el.className = 'marker';

        //Creation du marker
        new mapboxgl.Marker()
        .setLngLat(localisation.geometry.coordinates)
        .addTo(this.map);

        //Creation du popup
        new mapboxgl.Popup()
          .setLngLat(localisation.geometry.coordinates)
          .setHTML(
            `<h3>${localisation.text}</h3><h4>${localisation.properties.address}</h4>`
          )
          .addTo(this.map);


          

        //Ajout de l'evenement de click permetant d'afficher le popup du marker selectionne
        /*
        el.addEventListener('click',(e) => {
          if(flyto){
            this.map.flyTo({
              center: localisation.geometry.coordinates,
              zoom: 15
            });
          }
          const activeItem = document.getElementsByClassName('active');
          e.stopPropagation();
          
          const listing = document.getElementById(
            `listing-${localisation.properties.id}`
          );
          if(listing != null){
            listing.classList.add('active');
          }
        });
        */

      }

      
    });
    
  };

  /**
   * Cherche la localisation des supermarches les plus connus
   */
  trouverToutesLesLocalisations(){
    this.map.addLayer({
      'id': 'places',
      'type': 'symbol',
      'source': 'places', 
      'layout': {
        'icon-image': '{icon}-15',
        'icon-allow-overlap': true
      }
    });

    this.trouverLocalisation("Lidl",false);
    this.trouverLocalisation("Leclerc",false);
    this.trouverLocalisation("Super U",false);
    this.trouverLocalisation("Intermarche",false);
    this.trouverLocalisation("Carrefour",true);
    
  };
}
