// Give the service worker access to Firebase Messaging.
// Note that you can only use Firebase Messaging here. Other Firebase libraries
// are not available in the service worker.
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.6.1/firebase-messaging.js');

// Initialize the Firebase app in the service worker by passing in
// your app's Firebase config object.
// https://firebase.google.com/docs/web/setup#config-object
firebase.initializeApp({
    apiKey: "AIzaSyAsr-sIkUrYu4UKh6-ccIxu0LJlBblvfaQ",
    authDomain: "test-85c71.firebaseapp.com",
    projectId: "test-85c71",
    storageBucket: "test-85c71.appspot.com",
    messagingSenderId: "834514808832",
    appId: "1:834514808832:web:848f606accb645a61628e5",
    measurementId: "G-Q4RN06ZGPL"
})

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();
messaging.onBackgroundMessage((payload) => {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    // Customize notification here
    const notificationTitle = payload?.notification?.title;
    const notificationOptions = {
        body: payload.notification?.body?.message,
        icon: "http://localhost:3000/static/media/memories.d47180b2.jpg"
    };

    self.registration.showNotification(notificationTitle, notificationOptions);
});