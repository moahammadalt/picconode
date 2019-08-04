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
			path: '/index.hbs'
		},
		notFound: {
			url: '/404',
		},
  }
};
