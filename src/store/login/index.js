import StoreModule from '../module';

class LoginState extends StoreModule {
  /**
   * Начальное состояние
   * @return {Object}
   */
  initState() {
    return {
        profile: {},
        token: "",
        nameData: {},
        error: {},
        auth: {
          login: false,
          profile: false
        }
    };
  }

  setToken() {
    this.setState({
      ...this.getState(),
      token: localStorage.getItem('token') ? localStorage.getItem('token')  : ""
    })
    const existToken = this.getState().token
    if(existToken) this.getUserInfo(existToken)
  }

  async logIn(body) {
    this.setState({
      ...this.getState(),
      auth: {...this.getState().auth, login: false},
      error: {}
    })
    try {
    const response = await fetch('/api/v1/users/sign', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
          },
        body: JSON.stringify(body)
    })
    const res = await response.json()
    
    if(res.result) {
      localStorage.setItem('token', res.result.token)
      this.setState({
        ...this.getState(),
        nameData: res.result.user,
        token: res.result.token,
        profile: res.result.user.profile,
        auth: {...this.getState().auth, login: true},
        error: {}
      })
    } else {
      this.setState({
        ...this.getState(),
        error: {...res.error, type: res.error.data.issues[0].message},
        auth: {...this.getState().auth, login: false},
      })
    }
  } catch(e) {
    console.log(e)
  }
  }

  async logOut() {
    this.setState({
      ...this.getState(),
      auth: {...this.getState().auth, login: true},
      error: {}
    })
    const token = localStorage.getItem('token')
    try {
    const response = await fetch('/api/v1/users/sign', {
        method: "DELETE",
        headers: {
            'X-Token': token,
            'Content-Type': 'application/json',
          },
    })
    const res = await response.json()
    console.log(res)
    if(res.result) {
      localStorage.removeItem('token')
      this.setState({
        ...this.getState(),
        nameData: {},
        token: "",
        profile: {},
        auth: {...this.getState().auth, login: false},
        error: {}
      })
    } else {
      this.setState({
        ...this.getState(),
        error: {...res.error, type: res.error.data.issues[0].message},
        auth: {...this.getState().auth, login: true},
      })
    }
  } catch(e) {
    console.log(e)
  }
  }

  async getUserInfo(token) {
    this.setState({
      ...this.getState(),
      auth: {...this.getState().auth, profile: false},
    })

    const response = await fetch('/api/v1/users/self?fields=*', {
      headers: {
        'X-token': token,
        'Content-Type': 'application/json',
      },
    })
    const res = await response.json()
    this.setState({
      ...this.getState(),
      nameData: res.result,
      profile: res.result.profile,
      auth: {...this.getState().auth, profile: true},
    })
  }
}

export default LoginState
