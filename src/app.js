import { User } from './models/user.model';
import { Product } from './models/product.model';
import { appConfig } from './config/app.config';

console.log(`${appConfig.appName}`);

const worker = new User({ 
  name: 'Jon Boy', 
  createdDate: new Date().getTime(),
 });

const bike = new Product({
  name: 'Bike 2x',
  createdDate: new Date().getTime(),
});

const user_info = worker.getInfo();
const product_info = bike.getInfo();

console.log(user_info);
console.log(product_info);