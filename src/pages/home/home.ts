import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WeatherProvider } from '../../providers/weather/weather';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  weather:any;
  city:string;
  image:string;
  weatherDesc:string;
  temp:string;
  temperature_string:string;
  relative_humidity:string;
  dewpoint_string:string;
  visibility_mi:string;
  heat_index_string:string;
  location:{
    city:string,
    state:string
  }

  constructor(public navCtrl: NavController, 
     private weatherProvider :WeatherProvider,
     private storage:Storage){

  }

  ionViewWillEnter(){
    this.storage.get('location').then((val) => {
      if(val != null){
        this.location = JSON.parse(val);
      } else {
        this.location = {
          city:'Miami', 
          state:'FL'
        }
      }
      
      this.weatherProvider.getWeather(this.location.city, this.location.state).subscribe(weather =>{
            
        this.weather = weather.current_observation;
        this.city = weather.current_observation.display_location.full;
        this.image = weather.current_observation.icon_url;
        this. weatherDesc = weather.current_observation.weather;
        this.temp = weather.current_observation.temp_f;
        this.temperature_string = weather.current_observation.temperature_string;
        this.relative_humidity = weather.current_observation.relative_humidity;
        this.dewpoint_string = weather.current_observation.dewpoint_string;
        this.visibility_mi = weather.current_observation.visibility_mi;
        this.heat_index_string = weather.current_observation.heat_index_string;
        //console.log(this.weather);
      });

    }); 

    
  }
}
