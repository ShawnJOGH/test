
export default {
	setUserInfo(state, user) {
		state.userloginmes.username = user.username;
		state.userloginmes.isLogin = user.islogin;
	},
	//添加购物车
	addCart(state, goods) {
		//如果已经有该产品,增加数量
		let hasExist = state.cart.some((item) => {
			if (item.id == goods.id) {
				item.num++;
				return true;
			}
		});
		if (!hasExist) {
			state.cart.push({
				id: goods.id,
				name: goods.name,
				price: goods.price,
				desc: goods.desc,
				num: 1,
				pic: goods.pic_list[0].pic,
				selected: true,
				pic_list: goods.pic_list
			});
		}

		//保存到本地存储
		localStorage.setItem('cart', JSON.stringify(state.cart));

	},

	addAddress(state, e) {
		let index = localStorage.getItem("selectIndex")
		if (index == null) {
			index = 0
		} else { index++ }
		if (e.isDefault) {
			state.address.forEach(element => {
				element.isDefault = false
			});
		}
		let concatAddress = e.province + e.city + e.county
		state.address.push({
			id: index,
			name: e.name,
			tel: e.tel,
			address: concatAddress,
			addressDetail: e.addressDetail,
			isDefault: e.isDefault,
			province: e.province,
			city: e.city,
			county: e.county,
		})
		// state.address.push(e)
		console.log(e)
		console.log(state.address);
		//保存到本地存储
		localStorage.setItem('address', JSON.stringify(state.address));
		localStorage.setItem('selectIndex', index);
	},
	addDeal(state, dealmessage) {
		state.deal.push(dealmessage.data)
		state.dealIndex.push(dealmessage.data2)
		//保存到本地存储
		localStorage.setItem('deal', JSON.stringify(state.deal))
		localStorage.setItem('dealIndex', JSON.stringify(state.dealIndex));
	},
	addUser(state,usermessage){
		state.user.push(usermessage)
		console.log(usermessage);
		localStorage.setItem('user', JSON.stringify(state.user))
	},
	removeDeal(state,index1) {
		state.deal.splice(index1, 1)
		state.dealIndex.splice(index1, 1)
		localStorage.setItem('deal', JSON.stringify(state.deal));
		localStorage.setItem('dealIndex', JSON.stringify(state.dealIndex));
	},
	updataAddress(state, updataContent) {
		if (updataContent.data.isDefault) {
			state.address.forEach(element => {
				element.isDefault = false
			});
			updataContent.data.isDefault = true
		}
		state.address[updataContent.index] = updataContent.data
		localStorage.setItem('address', JSON.stringify(state.address));
	},
	removeCart(state) {
		state.cart = state.cart.filter(todo => !todo.selected)
		//保存到本地存储
		localStorage.setItem('cart', JSON.stringify(state.cart));
	},
	removeAddress(state,Deletaddressmes){
		console.log(Deletaddressmes);
		
		state.address.splice(Deletaddressmes.index,1)
		localStorage.setItem('address', JSON.stringify(state.address));
	},
	inc(state, goods) {
		let hasExist = state.cart.some((item) => {
			if (item.id == goods.id) {
				item.num++;
				return true;
			}
		});
		localStorage.setItem('cart', JSON.stringify(state.cart));
	},
	dec(state, goods) {
		let saveFlag = state.cart.some((item) => {
			if (item.id == goods.id) {
				if (item.num <= 0) return false;
				item.num--;
				if (item.num == 0)
					item.selected = false;
				return true;
			}
		});
		if (saveFlag)
			localStorage.setItem('cart', JSON.stringify(state.cart));
	},

	checkAll(state, checked) {
		state.cart.forEach((item) => {
			item.selected = checked
		})


		localStorage.setItem('cart', JSON.stringify(state.cart));
	},

	checkOne(state, goods) {
		// var allcheckedflag=true
		let saveFlag = state.cart.some((item) => {
			if (item.id == goods.id) {
				item.selected = !goods.selected;
				return true;
			}
		});
		localStorage.setItem('cart', JSON.stringify(state.cart));
	}
}
