import axios from 'axios';

// hapus komen ga penting
// export class CarService {

//   getCarsSmall() {
//     return axios.get('public/data/cars-small.json')
//               .then((res) => {
//                 console.log('cek lagi gan !! ', res.data);
//                 return res.data.data;
//               });
//   }

//   getCarsMedium() {
//     return axios.get('public/data/cars-medium.json')
//               .then((res) => res.data.data);
//   }

//   getCarsLarge() {
//     return axios.get('public/data/cars-large.json')
//               .then((res) => res.data.data);
//   }
// }

export function getCarsSmall() {
  return new Promise((resolve) => {
    axios.get('public/data/cars-small.json')
    .then((res) => {
      resolve(res.data.data);
    });
  });
}

export function getCarsMedium() {
  return axios.get('public/data/cars-medium.json')
              .then((res) => res.data.data);
}

export function getCarsLarge() {
  return axios.get('public/data/cars-large.json')
              .then((res) => res.data.data);
}

export function getPagingCarsLarge(param) {
  const page = param.data.page;
  const pageSize = param.data.pageSize;

  return new Promise((resolve) => {
    setTimeout(() => {
      axios.get('public/data/cars-large.json')
      .then((res) => {
        const xx = {
          data: res.data.data.slice((page * pageSize), ((page + 1) * pageSize)),
          status: 200,
        };
        resolve(xx);
      });
    }, 3000);
  });
}
