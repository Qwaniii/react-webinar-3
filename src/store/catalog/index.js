import { codeGenerator } from '../../utils';
import StoreModule from '../module';

class Catalog extends StoreModule {
  constructor(store, name) {
    super(store, name);
    this.generateCode = codeGenerator(0);
  }

  initState() {
    return {
      list: [],
      maxPage: 10,
      skip: 0,
      limit: 10,
      page: 1
    };
  }

  async load() {
    const response = await fetch('/capi/v1/articles');
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
      },
      'Загружены товары из АПИ',
    );
  }

  async paginate() {
    const {skip, limit} = this.getState()
    const response = await fetch(`api/v1/articles?limit=${limit}&skip=${skip}&fields=items(_id, title, price),count`);
    const json = await response.json();
    this.setState(
      {
        ...this.getState(),
        list: json.result.items,
        maxPage: Math.ceil(json.result.count/ this.getState().limit),
      },
      'Загружены  товары из АПИ',
    );
  }


  changePage(page) {
    const limit = this.getState().limit
    this.setState({
      ...this.getState(),
      skip: limit * (page - 1),
      page
    })
    this.paginate()
  }



}

export default Catalog;
