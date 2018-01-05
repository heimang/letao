/*
* @Author: 姊佽吘
* @Date:   2017-12-30 11:00:54
* @Last Modified by:   姊佽吘
* @Last Modified time: 2017-12-31 23:36:58
*/

$(function(){
	$('.mui-btn-primary').on('click',function(){
		var username = $('.mui-input-clear').val().trim();
		var password = $('.mui-input-password').val().trim();
		console.log(password);
		console.log(username);
		// name 写成 Name ....
		if(username&&password) {
			$.ajax({
				url: '/user/login',
				type: 'post',
				data: {
					'username': username,
					'password': password,
				},
				success: function(data){					
					console.log(data);
					if(data.error){
						mui.toast('用户名或密码错误',{ duration:3000, type:'div' });
						return; 
					}
					history.go(-1);
				}
			})
		}else {

			 mui.toast('登陆失败',{ duration:3000, type:'div' }) 
		}		
	})
	
})