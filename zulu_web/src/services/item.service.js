import request from './http';
import API_ROUTES from '../config/api.routes';

class ItemService {
  hostname;
  port;
  constructor() {
    this.hostname = API_ROUTES.root;
    this.port = API_ROUTES.port;
  }

  SearchItem(value) {
    return request({
      hostname: this.hostname,
      path: API_ROUTES.items.search(value),
      method: 'GET',
      port: this.port
    });
  }

  GetItemDetails(id) {
    return request({
      hostname: this.hostname,
      path: API_ROUTES.items.detail(id),
      method: 'GET',
      port: this.port
    });
  }
}
const itemService = new ItemService();
export default itemService;