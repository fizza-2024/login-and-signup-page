
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/11.0.1/firebase-analytics.js";

import{ getAuth,createUserWithEmailAndPassword,signinWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-auth.js";
import {getFirestore,setDoc,doc} from "https://www.gstatic.com/firebasejs/11.0.1/firebase-firestore.js"


  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBweAdzYTBxbIs8xGVxFF81UnjZSDsmjMI",
    authDomain: "register-page-1fb55.firebaseapp.com",
    projectId: "register-page-1fb55",
    storageBucket: "register-page-1fb55.firebasestorage.app",
    messagingSenderId: "972371469506",
    appId: "1:972371469506:web:5744557120184050f2c75b",
    measurementId: "G-WPGPB80PGM"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  function showMessage(message,divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        message.style.opacity=0;
    },5000);
  }
  const analytics = getAnalytics(app);
  const signUp=document.getElementById('submitSignUp');
  signUp.addEventListener('click',(event)=>{
    event.preventDefault();
    const email =document.getElementById('rEmail').value ;
    const password = document.getElementById('rPassword').value ;
    const firstName =document.getElementById('fName').value ;
    const lastName = document.getElementById('lName').value ;

    const auth = getAuth();
    const db = getFirestore();


    createUserWithEmailAndPassword(auth,email,password)
    .then((userCredential)=>{
        const user = userCredential.user;
        const userData={
            email:email,
            firstName:firstName,
            lastName:lastName            
        };
        showMessage('Account Created Successfully','signUpMessage');
        const docRef=doc(db,"users",user.uid);
        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='index.html';

     })
     .catch((error)=>{
        console.error("error writing document",error);


     });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use '){
            showMessage('Email Adress Already Exists !!!','signUpMessage');
        }
        else{
            showMessage('Unable To Create User','signUpMessage');
        }

    })
     });
    
