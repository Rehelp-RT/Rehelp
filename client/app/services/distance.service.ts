import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DistanceService {

  constructor() { }

    // this function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    public calcCrow(lat1, lon1, lat2, lon2) : number
    {
      var R = 6371; // Radius of the earth in km
      var dLat = this.toRad(lat2-lat1);
      var dLon = this.toRad(lon2-lon1);
      var latitude1 = this.toRad(lat1);
      var latitude2 = this.toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(latitude1) * Math.cos(latitude2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // converts numeric degrees to radians
    public toRad(value) : number
    {
        return value * Math.PI / 180;
    }
}
