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
      page: 1,
      loading: false
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

  async paginate(lang) {
    try {
      this.setState({...this.getState(), loading: false});

      const {skip, limit} = this.getState()
      const response = await fetch(`api/v1/articles?limit=${limit}&skip=${skip}&lang=${lang}&fields=items(_id, title, price),count`);
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
    catch (e) {
      console.error(e)
    }
    finally {
      this.setState({...this.getState(), loading: true});
    }
   }


  changePage(page, lang) {
    const limit = this.getState().limit
    this.setState({
      ...this.getState(),
      skip: limit * (page - 1),
      page
    })
    this.paginate(lang)
  }



}

export default Catalog;
