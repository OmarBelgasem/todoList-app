var firebaseConfig = {
    apiKey: "AIzaSyC6dlp1bbehINN8yKPB2t5PGucNn9C0UjY",
    authDomain: "todo-list-8fa28.firebaseapp.com",
    databaseURL: "https://todo-list-8fa28.firebaseio.com",
    projectId: "todo-list-8fa28",
    storageBucket: "todo-list-8fa28.appspot.com",
    messagingSenderId: "813506424443",
    appId: "1:813506424443:web:46342d4684d8518578bcde",
    measurementId: "G-T2SXBPK423"
  };


  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log('user is signed in at users.html');
    }
    else {
        alert('your login session has expired or you have logged out, login again to continue');
        location = "index.html";
    }
  })
  
  

  const todoItems = [];
  const todoList = document.getElementById("element");
  const todoContainer = document.getElementById("containe");
  const today = new Date();
  let dd = today.getDate();
  let mm = today.getMonth() + 1;
  let yyyy = today.getFullYear();
  let hour = today.getUTCHours();
  let minutes = today.getUTCMinutes().toString();
  let timeOfDay;

    if (dd < 10) {
      dd = 0 + dd;
    } 

    if (mm < 10) {
      mm = 0 + mm;
    } 
    
    if (today.getUTCMinutes() < 10) {
      minutes = "0" + minutes;
    }

    if (hour < 12) {
      timeOfDay = "AM";
    } else {
      timeOfDay = "PM";
    }

  let currentDate = `${mm}/${dd}/${yyyy} at ${hour}:${minutes} ${timeOfDay} UTC`;

  let date = new Date();
  let time = date.getTime();
  var counter = time;
  var ide = counter +1;
  
  
  $("#input").keypress( function (e) {
    var vala = $(this).val();
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        if(e.keyCode === 13) {
          firebase.firestore().collection(user.uid).add({
            id: Date.now(),
            name: vala,
            currentTime: currentDate,
            done: false
          }).then(() => {
              console.log('todo added');
            }).catch(err => {
                console.log(err.message);
              })
              $(this).val('');
         }
      } else {
          console.log('user is not signed in to add todos');
    }})
  })
  
  
  function renderTodos(doc) {
    
    
    let li = document.createElement('li');
    let pi = document.createElement('div');
    let span = document.createElement('span');
    
    
    li.setAttribute("data-id", doc.id);
    span.innerHTML = " X ";
    pi.textContent = doc.data().currentTime;
    
    
    li.appendChild(span);
    li.append(doc.data().name);
    li.appendChild(pi);
    
    
    todoList.appendChild(li);
  }
  
  
  $("ul").on("click", "span",  e => {
    e.stopPropagation()
    let id = e.target.parentElement.getAttribute('data-id');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(id);
        firebase.firestore().collection(user.uid).doc(id).delete();
      }
    })
  })
  
  
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      firebase.firestore().collection(user.uid).onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach(change => {
          if(change.type == 'added') {
            renderTodos(change.doc);
            todoItems.push(change.doc.data());
          } else if (change.type == 'removed') {
            let lia = todoList.querySelector("[data-id=" + change.doc.id + "]");
            console.log("lia", lia);
            todoList.removeChild(lia);
          } else if(change.type == 'changed') {
          }
        })
        console.log(changes);
      })
    }
  })

  $("#element").on("click", "li",  e => {
    e.stopPropagation()
    let id = e.target.parentElement.getAttribute('data-id');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        console.log(id);
        this.firebase.firestore().collection(user.uid).doc(id).update({
          done: false
        }
        )
        .catch(this.Error);
      }
    })
  })


  $("#li").on("click", () => {
    firebase.auth().signOut();
    location = '/';
  })

  
  console.log(todoItems);

  $("#search").keyup(function () {
    var valThis = this.value.toLowerCase();

    if(valThis == "") {
      $("#element > li").show();
    } else {
          $("#element>li").each(function () {
            var text  = $(this).text(),
                textL = text.toLowerCase();
            (textL.indexOf(valThis) >= 0) ? $(this).show() : $(this).hide();
        });
    }
});
