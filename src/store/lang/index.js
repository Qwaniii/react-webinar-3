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
        },
        langLoading: false
    };
  }

  changeLang(code) {
    this.setState({
      ...this.getState(),
      language: code, 
      dict: dict[code]})
  }

  async productTranslate(id) {
    try {
    this.setState({...this.getState(), langLoading: false});
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
    catch (e) {
      console.error(e)
    }
    finally {
      this.setState({...this.getState(), langLoading: true});
    }
  }
  
  getProductTitle(id, lang) {
    const product = this.getState().product
    let title
    let item=  product[lang]?.find(item => item._id === id)
    if (item) {
      title = item.title
    } else {
      title = this.getState().dict.loading
      if (this.getState().langLoading) {
        title=  item.title
      }
    }
    return title
  }
}

export default Lang;
