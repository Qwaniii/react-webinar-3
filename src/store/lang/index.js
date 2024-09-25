import { dict } from '../../dict';
import StoreModule from '../module';

class Lang extends StoreModule {
  initState() {
    return {
        language: "ru",
        dict: dict["ru"]
    };
  }

  changeLang(code) {
    this.setState({language: code, dict: dict[code]})
  }
  
}

export default Lang;
