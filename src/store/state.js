export default{
	//购物车
	cart:localStorage["cart"]?JSON.parse(localStorage["cart"]): [],
	address:localStorage["address"]?JSON.parse(localStorage["address"]): [],
	deal:localStorage["deal"]?JSON.parse(localStorage["deal"]): [],
	user:localStorage["user"]?JSON.parse(localStorage["user"]): [],
	selectIndex:0,
	dealIndex:localStorage["dealIndex"]?JSON.parse(localStorage["dealIndex"]): [],
	userloginmes:{
		isLogin:false,
		username:"",
	}
	

}
