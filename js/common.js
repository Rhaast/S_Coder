	(function($, doc, $$) {
				$.init();
				$.ready(function() {
					var cityPicker = new $.PopPicker({
						layer: 2
					});

					$.ajax({
						type: 'POST',
						url: '@Url.Action("GetSelectList","Banji")',
						data: '',
						dataType: 'json',
						success: function(data) {
							cityPicker.setData(data);
						},
						error: function() {
							alert('error');
						}
					});

					var showCityPickerButton = doc.getElementById('showCityPicker');
					var cityResult = doc.getElementById('cityResult');
					var students = doc.getElementById('students');
					showCityPickerButton.addEventListener('tap', function(event) {
						cityPicker.show(function(items) {
							cityResult.innerText = "" + items[0].text + "->" + items[1].text;
							$$('#students').html('');
							$.ajax({
								type: 'POST',
								url: '@Url.Action("GetSelectList","Student")',
								data: { banjiId: items[1].value },
								dataType: 'json',
								success: function(data) {
									console.log(data);
									var str = '';
									data.forEach(function(e) {
										str += '<li class="mui-table-view-cell mui-checkbox mui-left"><input name="checkbox" type="checkbox" value="' + e.value + '">' + e.text + '</li>';
									})
									$$('#students').html(str);
								},
								error: function() {
									alert('error');
								}
							});

							//返回 false 可以阻止选择框的关闭
							//return false;
						});
					}, false);

				});
			})(mui, document, jQuery);

// 获取url中的参数
function getUrlParam (name) {
     var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
     var r = window.location.search.substr(1).match(reg);
     if (r!= null) {
        return unescape(r[2]);
     }else{
        return null;
     }
}  

function ifLogin(){
	var  userId=localStorage.getItem("userId");
				if(userId==null||userId==undefined||userId==''){
						mui.alert('请先登陆！', 'S_Coder', function() {
								//var id = this.getAttribute('href');
								var webview_style = {
									popGesture: "close"
								};
								mui.openWindow({
									id: "login",
									url: "login.html",
									styles: webview_style,
									show: {
										aniShow: true
									},
									waiting: {
										autoShow: true
									}
								});
							});
				}
}

	mui('body').on('tap', 'a', function() {
				var id = this.getAttribute('href');
				var webview_style = {
						popGesture: "close"
					};
					
						mui.openWindow({
							id: id,
							url: this.href,
							styles: webview_style,
							show: {
								aniShow: 'none'
							},
							waiting: {
								autoShow: false
							}
						});
				})
