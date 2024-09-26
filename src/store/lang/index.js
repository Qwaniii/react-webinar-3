import { dict } from '../../dict';
import StoreModule from '../module';

class Lang extends StoreModule {
  initState() {
    return {
        language: "ru",
        dict: dict["ru"],
        product: {
          'en': [],
          'ru': []
        }
    };
  }

  changeLang(code) {
    this.setState({
      ...this.getState(),
      language: code, 
      dict: dict[code]})
  }

  async productTranslate(id) {
    const responseEn = await fetch(`api/v1/articles/${id}?fields=title&lang=en`);
    const responseRu = await fetch(`api/v1/articles/${id}?fields=title&lang=ru`);
    const jsonEn = await responseEn.json();
    const jsonRu = await responseRu.json();
    this.setState(
      {
          ...this.getState(),
          product: {
            ...this.getState().product,
            'en': [
              ...this.getState().product['en'],
              jsonEn.result
            ],
            'ru': [
              ...this.getState().product['ru'],
              jsonRu.result
            ],
            
          }
      },
      'Загружены данные о товаре',
      )
      console.log(this.getState().product)
    
  }
  
  getProductTitle(id, lang) {
    const product = this.getState().product
    const title = product[lang].find(item => item._id === id).title
    return title
  }

}

export default Lang;
