var toast = document.getElementById("snackbar");
	
	  // Initialize Firebase
	  var config = {
		apiKey: "AIzaSyC3XSc2ifCPghMtvkph1sNu4XdEt9Cn78g",
		authDomain: "assignment-nghiapqps03124.firebaseapp.com",
		databaseURL: "https://assignment-nghiapqps03124.firebaseio.com",
		storageBucket: "assignment-nghiapqps03124.appspot.com",
	  };
	  firebase.initializeApp(config);
	  var provider = new firebase.auth.GoogleAuthProvider();
	  
	  provider.addScope('https://www.googleapis.com/auth/plus.login');
	  
	  function loginGoogle(){
		  firebase.auth().signInWithRedirect(provider);
	  }
	  
	  firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log("Ðã đăng nhập");
			if(user.uid == "5CZSGjZx4cfMTWeirPr7CKmjLvF3"){
				location = "admin.html";
			}else{
				location = "home.html";
			}
		} else {
			console.log("Không có đăng nhập !");
		}
	  });
	  
	  function login(){
		var username = document.getElementById("username").value;
		var pass = document.getElementById("password").value;
		
		firebase.auth().signInWithEmailAndPassword(username, pass).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  toast.innerHTML = errorMessage;
		  toast.className = "show";
		  setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
		});
	  }
	  
	  function register(){
		var usernamere = document.getElementById("usernamere").value;
		var passre = document.getElementById("passwordre").value;
		
		firebase.auth().createUserWithEmailAndPassword(usernamere, passre).catch(function(error) {
		  // Handle Errors here.
		  var errorCode = error.code;
		  var errorMessage = error.message;
		  // ...
		  toast.className = "show";
		  toast.innerHTML = errorMessage;
		  setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
		});
		
		toast.innerHTML = "Ðang ký thành công";
		toast.className = "show";
		setTimeout(function(){ toast.className = toast.className.replace("show", ""); }, 3000);
	  }
	  
	  function resetregister(){
		document.getElementById("usernamere").value = "";
		document.getElementById("passwordre").value = "";
	  }
	  
	  //Dialog Register
		var modal = document.getElementById('myModal');

		var btn = document.getElementById("myBtn");

		var span = document.getElementsByClassName("close")[0];

		btn.onclick = function() {
			modal.style.display = "block";
		}

		span.onclick = function() {
			modal.style.display = "none";
		}

		window.onclick = function(event) {
			if (event.target == modal) {
				modal.style.display = "none";
			}
		}
		
		//--End Dialog Register--