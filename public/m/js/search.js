
/** @Author: lt
* @Date:   2017-12-27 21:46:28
* @Last Modified by:   lt
* @Last Modified time: 2017-12-28 11:25:55
*/

/*$(function(){
	historyData();
	getData();
	deleteData();
	clearData();
})
function getData(){
	$('.search button').on('click',function(){
		var str = $(this).prev().val();
		$(this).prev().val('');
		var history = localStorage.getItem('history');
		if(history){
			history = JSON.parse(history + '');
			if(history.indexOf(str) == -1){
				history.push(str);
			}
		}else {
			history = history || [];
			history.push(str);
		}
		history = history.reverse();
		var html = template('historyTmp',history);
		$('.history .searchList ul').html(html);
		history = JSON.stringify(history);
		localStorage.setItem('history',history);
	})
}
function deleteData(){
	$('.history .searchList ul').on('click','li a i',function(){
		var str = $(this).prev().text();
		var history = localStorage.getItem('history');
		history = JSON.parse(history + '');
		var num = history.indexOf(str);
		history.splice(num,1);
		history = history.length == 0 ? '' : JSON.stringify(history);
		localStorage.setItem('history',history);
		historyData();
	})
}
function clearData(){
	$('.history p i').on('click',function(){
		localStorage.setItem('history','');
		historyData();
	})
}
function historyData(){
	var history = localStorage.getItem('history');
	if(history){
		history = JSON.parse(history  + '');
		history = history.reverse();
		var html = template('historyTmp',history);
		$('.history .searchList ul').html(html);
	}else {
		$('.history .searchList ul').html('没有历史纪录');
	}
}*/
// 获取值 查询记录 对比 渲染页面
/*$(function(){
	var history = localStorage.getItem('history');
	if(history) {
		history = JSON.parse(history + '');
		var html = template('historyTmp',history);
		$('.searchList ul').html(html);
	}
	else $('.searchList ul').html('没有历史纪录');
	$('.search button').on('click',function(){
		var str = $(this).prev().val();
		if(str){
			history = localStorage.getItem('history');
			history = history ? JSON.parse(history + '') : [];
			if(history.indexOf(str) == -1) {
				//history.push(str);
				//history.reverse();
				//每新加一次就反转一次，有问题，直接每次加在第一位
				history.unshift(str);
				// history = JSON.stringify(history); // 转成串
				// localStorage.setItem('history',history);				
			}
			var html = template('historyTmp',history);
			$('.searchList ul').html(html);
			history = JSON.stringify(history);
			localStorage.setItem('history',history);
			$(this).prev().val('');
		}
	})
	$('.history p i').on('click',function(){
		localStorage.setItem('history','');
		$('.searchList ul').html('没有历史纪录');
	})
	$('.searchList ul').on('click','li a i',function(){
		var str = $(this).prev().text();
		history = localStorage.getItem('history')
		history = JSON.parse(history + '');
		var index = history.indexOf(str);
		//splice 返回值。。。
		history.splice(index,1);
		if(history.length != 0){
			var html = template('historyTmp',history);
			$('.searchList ul').html(html);
		}else {
			$('.searchList ul').html('没有历史纪录');
		}
		//不能少 空数组 就为空串要判断  类名要加点写对。。。
		history = history.length == 0 ? '' : JSON.stringify(history);
		localStorage.setItem('history',history);
	})

})*/
$(function(){
	var history = localStorage.getItem('history');
	if(history){
		history = JSON.parse(history);
		var html = template('historyTmp',history);
		$('.searchList ul').html(html);
	}else {
		$('.searchList ul').html('没有搜索记录');
	}
	$('.search button').on('click',function(){
		// 空文本判断
		var str = $(this).prev().val().trim();
		// console.log(str);是字符串
		if(str){		
			$(this).prev().val('');
			history = localStorage.getItem('history');
			history = history ? JSON.parse(history) : [];
			// console.log(history);是字符串数组
			if(history.indexOf(str) == -1) history.unshift(str);
			var html = template('historyTmp',history);
			$('.searchList ul').html(html);
			history = JSON.stringify(history);
			localStorage.setItem('history',history);
		}
	})
	$('.history p i').on('click',function(){
		localStorage.setItem('history','');
		$('.searchList ul').html('没有搜索记录');
	})
	$('.searchList ul').on('click','li a i',function(){
		var str = $(this).prev().text();
		// console.log(str); 是字符串
		// $(this).parent().parent().remove(); 不行还要判断空
		history = localStorage.getItem('history');
		history = JSON.parse(history);
		// console.log(history);是字符串数组
		var index = history.indexOf(str);
		history.splice(index,1);
		if(history.length != 0){
			var html = template('historyTmp',history);
			$('.searchList ul').html(html);
		}else {
			$('.searchList ul').html('没有搜索记录');
		}
		history = history.length == 0 ? '' : JSON.stringify(history);
		localStorage.setItem('history',history);

	})
})