var logoutclick = document.getElementById("logoutclick");
		var loginclick = document.getElementById("loginclick");
		var toasthome = document.getElementById("snackbar");
	
		var config = {
			apiKey: "AIzaSyC3XSc2ifCPghMtvkph1sNu4XdEt9Cn78g",
			authDomain: "assignment-nghiapqps03124.firebaseapp.com",
			databaseURL: "https://assignment-nghiapqps03124.firebaseio.com",
			storageBucket: "assignment-nghiapqps03124.appspot.com",
		};
		firebase.initializeApp(config);
	
		function logout(){
			firebase.auth().signOut().then(function() {
			  closeNav();
			}, function(error) {
			  // An error happened.
			});
		}
		
		
		firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
				console.log("Đã đăng nhập");
				loginclick.style.display = "none";
				modal.style.display = "none";
				logoutclick.style.display = "block";
				document.getElementById("usernamehome").value="";
				document.getElementById("passwordhome").value="";
				if(user.uid == "5CZSGjZx4cfMTWeirPr7CKmjLvF3"){
					location = "admin.html";
				}
				console.log(user.uid);
			} else {
				console.log("Không có đăng nhập !");
				logoutclick.style.display = "none";
				loginclick.style.display = "block";
			}
		});
		
		var commentsRef = firebase.database().ref('product');
		var listItem = document.getElementById("showItemProduct");
		
		commentsRef.on('child_added', function(data) {
		  listItem.innerHTML += '<div class="cardarticle">'
				  +'<img src="'+data.val().imagesproduct+'">'
				  +'<div class="container">'
					+'<h4><b>'+data.val().nameproduct+'</b></h4>'
					+'<p>'+data.val().price+' USD</p>'
				  +'</div>'
				  +'<div class="control">'
					+'<input type="button" value="Mua" id="button" onclick="checkLoginBuy();">'
					+'<input type="button" value="Bỏ vào giỏ hàng" id="button" onclick="checkLogin(\''+data.val().idproduct+'\','+'\''+data.val().nameproduct+'\','+'\''+data.val().describe+'\','+'\''+data.val().price+'\','+'\''+data.val().imagesproduct+'\');">'
				  +'</div>'
				+'</div>';
		});
		
		function checkLoginBuy(){
			var user = firebase.auth().currentUser;
		
			if (user) {
				console.log("Đã đăng nhập");
				
			} else {
				console.log("Không có đăng nhập !");
				modal.style.display = "block";
			}
		}
		
		function checkLogin(id,name,des,price,image){
			var user = firebase.auth().currentUser;
		
			if (user) {
				console.log("Đã đăng nhập");
				firebase.database().ref('user-product/'+user.uid).push({
					idproduct: id,
					nameproduct: name,
					describe: des,
					price: price,
					imagesproduct : image
				});
			} else {
				console.log("Không có đăng nhập !");
				modal.style.display = "block";
			}
		}
		
		var modalcart = document.getElementById('myModal');
		
		var spancart = document.getElementsByClassName("closeCart")[0];

		spancart.onclick = function() {
			modalcart.style.display = "none";
		}
		
		function checkLoginCart(){
			var user = firebase.auth().currentUser;
		
			if (user) {
				console.log("Đã đăng nhập");
				modalcart.style.display="block";
				
				var commentsRefCart = firebase.database().ref('user-product/'+user.uid);
				var listItemCart = document.getElementById("listShowItemCart");
				var priceSum = document.getElementById("priceSum");
				var sumPrice = 0;
				
				listItemCart.innerHTML = "";
				
				commentsRefCart.on('child_added', function(data) {
				  listItemCart.innerHTML += '<div class="cardarticle" style="width:200px;">'
						  +'<img src="'+data.val().imagesproduct+'">'
						  +'<div class="container">'
							+'<h4><b>'+data.val().nameproduct+'</b></h4>'
							+'<p>'+data.val().price+' USD</p>'
						  +'</div>'
						  +'<div class="control">'
							+'<input type="button" value="Xóa" id="button" onclick="deleteData(\''+data.key+'\');">'
						  +'</div>'
						+'</div>';
				  sumPrice += parseInt(data.val().price);
				  priceSum.innerHTML = "Tổng tiền: "+sumPrice+" USD";
				});
			} else {
				console.log("Không có đăng nhập !");
				modal.style.display = "block";
			}
		}
		
		function deleteData(datakey){
			var user = firebase.auth().currentUser;
		
			firebase.database().ref('user-product/'+user.uid+'/'+datakey).remove();
			loadItem(user.uid);
		}
		
		function deleteAllDataCart(){
			var user = firebase.auth().currentUser;
			firebase.database().ref('user-product/'+user.uid).remove();
			loadItem(user.uid);
		}
		
		function loadItem(user){
			var commentsRefCart = firebase.database().ref('user-product/'+user);
			var listItemCart = document.getElementById("listShowItemCart");
			var listLoad = "";
			var priceSum = document.getElementById("priceSum");
			var sum = 0;
		
			commentsRefCart.on('child_added', function(data) {
			  listLoad += '<div class="cardarticle" style="width:200px;">'
						  +'<img src="'+data.val().imagesproduct+'">'
						  +'<div class="container">'
							+'<h4><b>'+data.val().nameproduct+'</b></h4>'
							+'<p>'+data.val().price+' USD</p>'
						  +'</div>'
						  +'<div class="control">'
							+'<input type="button" value="Xóa" id="button" onclick="deleteData(\''+data.key+'\');">'
						  +'</div>'
						+'</div>';
			  sum += parseInt(data.val().price);
			});
			
			listItemCart.innerHTML = listLoad;
			priceSum.innerHTML = "Tổng tiền: "+sum+" USD";
		}
		
		function loginhome(){
			var username = document.getElementById("usernamehome").value;
			var pass = document.getElementById("passwordhome").value;
			
			firebase.auth().signInWithEmailAndPassword(username, pass).catch(function(error) {
			  // Handle Errors here.
			  var errorCode = error.code;
			  var errorMessage = error.message;
			  toasthome.className = "show";
			  toasthome.innerHTML = errorMessage;
			  setTimeout(function(){ toasthome.className = toasthome.className.replace("show", ""); }, 3000);
			});
			
		}
	
		var slideIndex = 1;
		showSlides(slideIndex);

		function plusSlides(n) {
		  showSlides(slideIndex += n);
		}

		function currentSlide(n) {
		  showSlides(slideIndex = n);
		}

		function showSlides(n) {
		  var i;
		  var slides = document.getElementsByClassName("mySlides");
		  var dots = document.getElementsByClassName("dot");
		  if (n > slides.length) {slideIndex = 1}
		  if (n < 1) {slideIndex = slides.length}
		  for (i = 0; i < slides.length; i++) {
			  slides[i].style.display = "none";
		  }
		  for (i = 0; i < dots.length; i++) {
			  dots[i].className = dots[i].className.replace(" active", "");
		  }
		  slides[slideIndex-1].style.display = "block";
		  dots[slideIndex-1].className += " active";
		}
		
		function openNav() {
			document.getElementById("myNav").style.width = "300px";
		}

		function closeNav() {
			document.getElementById("myNav").style.width = "0%";
		}
		
		// Get the modal
		var modal = document.getElementById('id01');

		// When the user clicks anywhere outside of the modal, close it
		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
		
		function changeLocation(){
			location = "index.html";
		}
		
		var modalinfo = document.getElementById("myModalUser");
		modalinfo.style.display = "none";
		function InfoModalUser(){
			var user = firebase.auth().currentUser;
			var price = 0;
			
			firebase.database().ref('user-product/'+user.uid).on('child_added', function(data) {
				price += parseInt(data.val().price);
			});
			var priceUser = document.getElementById("priceSumUser");
			modalinfo.style.display = "block";
			modalcart.style.display = "none";
			priceUser.innerHTML = "Tổng tiền: "+price+" USD";
		}
		
		var spanuser = document.getElementsByClassName("closeUser")[0];

		spanuser.onclick = function() {
			modalinfo.style.display = "none";
		}
		
		function SubmitBuy(){
			var user = firebase.auth().currentUser;
			var d = new Date();
			
			var nameuser = document.getElementById("nameuser").value;
			var addressuser = document.getElementById("addressuser").value;
			var phoneuser = document.getElementById("phoneuser").value;
			var time = d.getHours()+":"+d.getMinutes()+":"+d.getSeconds()+" "+d.getDate()+"/"+(d.getMonth()+1)+"/"+d.getFullYear();
			var price = 0;
			
			firebase.database().ref('user-product/'+user.uid).on('child_added', function(data) {
				price += parseInt(data.val().price);
			});
		
			firebase.database().ref('user-bill/'+user.uid).push({
				name: nameuser,
				address: addressuser,
				phone : phoneuser,
				time : time,
				price : price
			});
			
			firebase.database().ref('user-product/'+user.uid).remove();
			
			modalinfo.style.display = "none";
			var priceSum = document.getElementById("priceSum");
			priceSum.innerHTML = "";
			
			toasthome.className = "show";
			toasthome.innerHTML = "Cảm ơn quý khách hàng đã mua sản phẩm!";
			setTimeout(function(){ toasthome.className = toasthome.className.replace("show", ""); }, 3000);
		}