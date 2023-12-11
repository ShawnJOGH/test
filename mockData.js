let Mock = require('mockjs');

var Random = Mock.Random;

module.exports = function(){
	let data=[];
	for(var i=1; i<=15; i++){
		data.push(
			Mock.mock({
				'id':i,
				'studentId':/522251116[0-9]{3}/,
				'name':'@cname',
				'pic':Random.image('400x400',Random.color()),
				'gentle|1':['男','女'],
				'classname':/软件工程[1-5]{1}班/,
				'address':'@province' + '@city' + '@county'
			})
		)
	}
	return data;
}