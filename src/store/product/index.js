import StoreModule from '../module';

class Product extends StoreModule {
  initState() {
    return {
        goods: {},
        loading: false
    };
  }

  async getProduct(id, lang) {
        try {
            this.setState({...this.getState(), loading: false});
            const response = await fetch(`api/v1/articles/${id}?fields=*,madeIn(title,code),category(title)&lang=${lang}`);
            const json = await response.json();
            console.log(json)
            this.setState(
                    {
                        ...this.getState(),
                        goods: json.result,
                    },
                    'Загружены данные о товаре',
                    )
        } 
        catch (e) {
            console.error(e);
        } 
        finally {
            this.setState({...this.getState(), loading: true});
        }
    }

    initialState() {
        this.setState(
            {
                ...this.getState(),
                goods: {},
                loading: false
            },
            'Очистка',
            )
    }
}

export default Product;
