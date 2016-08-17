// Initialize Firebase
		var config = {
			apiKey: "AIzaSyC3XSc2ifCPghMtvkph1sNu4XdEt9Cn78g",
			authDomain: "assignment-nghiapqps03124.firebaseapp.com",
			databaseURL: "https://assignment-nghiapqps03124.firebaseio.com",
			storageBucket: "assignment-nghiapqps03124.appspot.com",
		};
		firebase.initializeApp(config);
		
		firebase.auth().onAuthStateChanged(function(user) {
		if (user) {
			console.log("Đã đăng nhập");
		} else {
			console.log("Không có đăng nhập !");
			location = "index.html";
		}
	    });
		
		var commentsRef = firebase.database().ref('product');
		var listItem = document.getElementById("list-item");
		
		commentsRef.on('child_added', function(data) {
		  listItem.innerHTML += '<div class="card">'
				  +'<img src="'+data.val().imagesproduct+'">'
				  +'<div class="container">'
					+'<h4><b>'+data.val().nameproduct+'</b></h4>'
					+'<p>'+data.val().price+' USD</p>'
				  +'</div>'
				  +'<div class="control">'
					+'<img src="images/iconview.png" >'
					+'<img src="images/iconedit.png" onclick="openDialogEdit(\''+data.val().idproduct+'\','+'\''+data.val().nameproduct+'\','+'\''+data.val().describe+'\','+'\''+data.val().price+'\','+'\''+data.key+'\');">'
					+'<img src="images/icondelete.png" onclick="deleteData(\''+data.key+'\');" >'
				  +'</div>'
				+'</div>';
		});
		
		function loadItem(){
			var listLoad = "";
		
			commentsRef.on('child_added', function(data) {
			  listLoad += '<div class="card">'
					  +'<img src="'+data.val().imagesproduct+'">'
					  +'<div class="container">'
						+'<h4><b>'+data.val().nameproduct+'</b></h4>'
						+'<p>'+data.val().price+' USD</p>'
					  +'</div>'
					  +'<div class="control">'
						+'<img src="images/iconview.png" >'
						+'<img src="images/iconedit.png" onclick="openDialogEdit(\''+data.val().idproduct+'\','+'\''+data.val().nameproduct+'\','+'\''+data.val().describe+'\','+'\''+data.val().price+'\','+'\''+data.key+'\');">'
						+'<img src="images/icondelete.png" onclick="deleteData(\''+data.key+'\');" >'
					  +'</div>'
					+'</div>';
			});
			listItem.innerHTML = listLoad;
		}
		
		function deleteData(datakey){
			firebase.database().ref('product/'+datakey).remove();
			loadItem();
		}
		
		function logout(){
			firebase.auth().signOut().then(function() {
			  location = "index.html";
			}, function(error) {
			  // An error happened.
			});
		}
		
		function AddData(){
			var elem = document.getElementById("myBar");
		
			var id = document.getElementById("masanpham").value;
			var name = document.getElementById("tensanpham").value;
			var describe = document.getElementById("mota").value;
			var price = document.getElementById("gia").value;
			
			var storageRef = firebase.storage().ref();
			
			// File or Blob named mountains.jpg
			var file = document.getElementById("file").files[0];

			// Create the file metadata
			var metadata = {
			  contentType: 'image/jpeg'
			};

			// Upload file and metadata to the object 'images/mountains.jpg'
			var uploadTask = storageRef.child('images/' + file.name).put(file, metadata);

			// Listen for state changes, errors, and completion of the upload.
			uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
			  function(snapshot) {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
				elem.style.width = progress + '%';
				document.getElementById("label").innerHTML = progress * 1  + '%';
				switch (snapshot.state) {
				  case firebase.storage.TaskState.PAUSED: // or 'paused'
					console.log('Upload is paused');
					break;
				  case firebase.storage.TaskState.RUNNING: // or 'running'
					console.log('Upload is running');
					break;
				}
			  }, function(error) {
			  switch (error.code) {
				case 'storage/unauthorized':
				  // User doesn't have permission to access the object
				  break;

				case 'storage/canceled':
				  // User canceled the upload
				  break;

				case 'storage/unknown':
				  // Unknown error occurred, inspect error.serverResponse
				  break;
			  }
			}, function() {
			  // Upload completed successfully, now we can get the download URL
			  var downloadURL = uploadTask.snapshot.downloadURL;
			  
			  firebase.database().ref('product').push({
				idproduct: id,
				nameproduct: name,
				describe: describe,
				price: price,
				imagesproduct : downloadURL
			  });
			  
			  document.getElementById("masanpham").value="";
			  document.getElementById("tensanpham").value="";
			  document.getElementById("mota").value="";
			  document.getElementById("gia").value="";
			  document.getElementById("file").value="";
			  modal.style.display = "none";
			});
		}
		
		function EditData(){
			var elem = document.getElementById("myBarEdit");
		
			var id = document.getElementById("masanphamedit").value;
			var name = document.getElementById("tensanphamedit").value;
			var describe = document.getElementById("motaedit").value;
			var price = document.getElementById("giaedit").value;
			
			var storageRef = firebase.storage().ref();
			
			// File or Blob named mountains.jpg
			var file = document.getElementById("fileedit").files[0];

			// Create the file metadata
			var metadata = {
			  contentType: 'image/jpeg'
			};

			// Upload file and metadata to the object 'images/mountains.jpg'
			var uploadTask = storageRef.child('imagesedit/' + file.name).put(file, metadata);

			// Listen for state changes, errors, and completion of the upload.
			uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
			  function(snapshot) {
				// Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
				var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				console.log('Upload is ' + progress + '% done');
				elem.style.width = progress + '%';
				document.getElementById("labelEdit").innerHTML = progress * 1  + '%';
				switch (snapshot.state) {
				  case firebase.storage.TaskState.PAUSED: // or 'paused'
					console.log('Upload is paused');
					break;
				  case firebase.storage.TaskState.RUNNING: // or 'running'
					console.log('Upload is running');
					break;
				}
			  }, function(error) {
			  switch (error.code) {
				case 'storage/unauthorized':
				  // User doesn't have permission to access the object
				  break;

				case 'storage/canceled':
				  // User canceled the upload
				  break;

				case 'storage/unknown':
				  // Unknown error occurred, inspect error.serverResponse
				  break;
			  }
			}, function() {
			  // Upload completed successfully, now we can get the download URL
			  var downloadURL = uploadTask.snapshot.downloadURL;
			  
			  var postData = {
				idproduct: id,
				nameproduct: name,
				describe: describe,
				price: price,
				imagesproduct : downloadURL
			  };
			  
			  var updates = {};
			  updates['/product/'+document.getElementById("keysua").value] = postData;
			  
			  firebase.database().ref().update(updates);
			  
			  document.getElementById("masanphamedit").value="";
			  document.getElementById("tensanphamedit").value="";
			  document.getElementById("motaedit").value="";
			  document.getElementById("giaedit").value="";
			  document.getElementById("fileedit").value="";
			  modaledit.style.display = "none";
			  
			  loadItem();
			});
		}
		
		
		//Dialog add
		var modal = document.getElementById('myModal');

		var btn = document.getElementById("buttonadd");

		var span = document.getElementsByClassName("close")[0];

		btn.onclick = function() {
			modal.style.display = "block";
		}

		span.onclick = function() {
			modal.style.display = "none";
		}
		
		//--End Dialog add--
		
		//Dialog edit
		var modaledit = document.getElementById('myModalEdit');

		var spanedit = document.getElementsByClassName("closeEdit")[0];

		spanedit.onclick = function() {
			modaledit.style.display = "none";
		}
		
		function openDialogEdit(id,name,des,price,key){
			modaledit.style.display = "block";
			
			var keyedit = document.getElementById("keysua");
			
			document.getElementById("masanphamedit").value=id;
			document.getElementById("tensanphamedit").value=name;
			document.getElementById("motaedit").value=des;
			document.getElementById("giaedit").value=price;
			keyedit.value=key;
			
			keyedit.style.display = "none";
		}
		
		//--End Dialog edit--