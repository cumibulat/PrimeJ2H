import axios from 'axios';


export class CarService {

  getCarsSmall() {
    return axios.get('./cars-small.json')
              .then((res) => {
                console.log('cek lagi gan !! ', res.data);
                return res.data.data;
              });
  }

  getCarsMedium() {
    return axios.get('./cars-medium.json')
              .then((res) => res.data.data);
  }

  getCarsLarge() {
    return axios.get('./cars-large.json')
              .then((res) => res.data.data);
  }
}

export function getCarsSmall() {
  return new Promise((resolve) => {
    axios.get('./cars-small.json')
    .then((res) => {
      console.log('cek ombak :: ', res.data);
      resolve(res.data.data);
    });
  });
}

export function getCarsMedium() {
  return axios.get('./cars-medium.json')
              .then((res) => res.data.data);
}

export function getCarsLarge() {
  return axios.get('./cars-large.json')
              .then((res) => res.data.data);
}
