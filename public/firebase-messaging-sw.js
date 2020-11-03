importScripts('https://www.gstatic.com/firebasejs/7.17.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.17.2/firebase-messaging.js');

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzATU_j6vWKfJth5gYzIXC_3XDXBrfFDY",
    authDomain: "poetic-abacus-286008.firebaseapp.com",
    databaseURL: "https://poetic-abacus-286008.firebaseio.com",
    projectId: "poetic-abacus-286008",
    storageBucket: "poetic-abacus-286008.appspot.com",
    messagingSenderId: "1010411771092",
    appId: "1:1010411771092:web:ffbe02cf4ddddd3abfd741",
    measurementId: "G-EZRXX1BB11"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const messaging = firebase.messaging();
  messaging.setBackgroundMessageHandler(function(payload){
  })


  