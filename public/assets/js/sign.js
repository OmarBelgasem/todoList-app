// signup
const signupForm = document.getElementById("signup-form");
signupForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = signupForm['name'].value;
    const email = signupForm['email'].value;
    const password = signupForm['password'].value;
    console.log(name, email, password);
    signupForm.reset();
    firebase.auth().createUserWithEmailAndPassword(email, password).then((cred) => {
        // console.log(cred);
        return firebase.firestore().collection('users').doc(cred.user.uid).set({
            Name: name,
            Email: email,
            Password: password
        }).then(() => {
            // console.log('success');
            location = "todo.html";
        }).catch(err => {
            // console.log(err.message);
            const signupError = document.getElementById('signupError');
            signupError.innerText = err.message;
        })
    }).catch(err => {
        // console.log(err.message);
        const signupError2 = document.getElementById('signupError');
        signupError2.innerText = err.message;
    })
})

//login
const loginForm = document.getElementById('signin-form');
loginForm.addEventListener('submit', e => {
    e.preventDefault();
    const loginEmail = loginForm['signin-email'].value;
    const loginPassword = loginForm['signin-password'].value;
    console.log(loginEmail, loginPassword);
    firebase.auth().signInWithEmailAndPassword(loginEmail, loginPassword).then(() => {
        console.log('login success');
            location = "todo.html";
    }).catch(err => {
        const loginError = document.getElementById("signinError");
        loginError.innerText = err.message;
    })
})