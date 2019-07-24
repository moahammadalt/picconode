import routes from 'config/routes';

export default router => {
	
	router.get(routes.adminApi.register, (req, res) => {
		
		res.send("hiiii");
	});
	  
};