export default {
  adminApi: {
    registration: {
			url: '/adminAPI/register',
			bodyParams: ['userName', 'password'],
    },
    login: {
			url: '/adminAPI/login',
			bodyParams: ['userName', 'password'],
		},
		productCreate: {
			url: '/adminAPI/product/create',
			bodyParams: ['productName'],
		},
    dashboardInit: {
			url: '/adminAPI/init'
		},
    logout: {
			url: '/adminAPI/logout'
		},
  },
  public: {
    home: {
			url: '/',
			QueryParams: ['posts', 'bla'],
		},
		home: {
			url: '/404',
		},
  }
};
