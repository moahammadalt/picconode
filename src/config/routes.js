export default {
  adminApi: {
    registration: {
			url: '/adminAPI/register',
			type: 'POST',
			bodyParams: ['userName', 'password'],
    },
    login: {
			url: '/adminAPI/login',
			type: 'POST',
			bodyParams: ['userName', 'password'],
		},
		categoryCreate: {
			url: '/adminAPI/category/create',
			type: 'POST',
			bodyParams: ['name', 'slug'],
		},
		categoryList: {
			url: '/adminAPI/category',
			type: 'GET',
		},
		categoryItem: {
			url: '/adminAPI/category/:slug',
			type: 'GET',
		},
		categoryUpdate: {
			url: '/adminAPI/category/:slug',
			type: 'POST',
		},
		sizeCreate: {
			url: '/adminAPI/size/create',
			type: 'POST',
			bodyParams: ['name', 'slug'],
		},
		sizeList: {
			url: '/adminAPI/size',
			type: 'GET',
		},
		sizeItem: {
			url: '/adminAPI/size/:slug',
			type: 'GET',
		},
		sizeUpdate: {
			url: '/adminAPI/size/:slug/update',
			type: 'POST',
		},
		sizeDelete: {
			url: '/adminAPI/size/:slug/delete',
			type: 'POST',
		},
		colorCreate: {
			url: '/adminAPI/color/create',
			type: 'POST',
			bodyParams: ['name', 'slug'],
		},
		colorList: {
			url: '/adminAPI/color',
			type: 'GET',
		},
		colorItem: {
			url: '/adminAPI/color/:slug',
			type: 'GET',
		},
		colorUpdate: {
			url: '/adminAPI/color/:slug/update',
			type: 'POST',
		},
		colorDelete: {
			url: '/adminAPI/color/:slug/delete',
			type: 'POST',
		},
		productCreate: {
			url: '/adminAPI/product/create',
			type: 'POST',
			bodyParams: ['name', 'slug', 'category_id', 'category_type_id'],
		},
		productList: {
			url: '/adminAPI/product',
			type: 'GET',
		},
		productItem: {
			url: '/adminAPI/product/:slug',
			type: 'GET',
		},
		productUpdate: {
			url: '/adminAPI/product/:slug/update',
			type: 'POST',
		},
		productDelete: {
			url: '/adminAPI/product/:slug/delete',
			type: 'POST',
		},
		productImageCreate: {
			url: '/adminAPI/productImage/create',
			type: 'POST',
		},
    dashboardInit: {
			url: '/adminAPI/init',
			type: 'GET',
		},
    logout: {
			url: '/adminAPI/logout',
			type: 'POST',
		},
  },
  publicApi: {
    home: {
			url: '/',
			path: '/index.hbs',
			type: 'GET',
		},
		product: {
			url: '/:slug',
			path: '/product.hbs',
			type: 'GET',
		},
		productList: {
			url: '/products',
			path: '/productList.hbs',
			type: 'GET',
		},
		productNotFound: {
			path: '/productNotFound.hbs',
			type: 'GET',
		},
		productUserDemand: {
			url: '/productUserDemand',
			bodyParams: ['email', 'message'],
			type: 'POST',
		},
		wishlistItemCreate: {
			url: '/wishlist/itemCreate',
			bodyParams: ['slug'],
			type: 'POST',
		},
		wishlistItemDelete: {
			url: '/wishlist/itemDelete',
			bodyParams: ['slug'],
			type: 'POST',
		},
		wishlistGet: {
			url: '/wishlist',
			type: 'GET',
		},
		wishlistView: {
			url: '/wishlist-products',
			path: '/wishlistProducts.hbs',
			type: 'GET',
		},
		emailSubscription: {
			url: '/subscription/email-subscribe',
			bodyParams: ['email'],
			type: 'POST',
		},
		about: {
			url: '/about',
			path: '/about.hbs',
			type: 'GET',
		},
		contact: {
			url: '/contact',
			path: '/contact.hbs',
			type: 'GET',
		},
		notFound: {
			url: '/404',
			path: '/notFound.hbs',
			type: 'GET',
		},
		emailUserRegister: {
			url: '/emailRegisteration',
			bodyParams: ['email', 'name', 'password'],
			type: 'POST',
		},
		emailUserLogIn: {
			url: '/emailLogIn',
			bodyParams: ['email', 'password'],
			type: 'POST',
		},
		emailUserLogOut: {
			url: '/emailLogOut',
			type: 'POST',
		},
		emailUserRegisterVerification: {
			url: '/emailUserRegisterVerification/:token',
			path: '/userLoginVerification.hbs',
			type: 'GET',
		},
  }
};
