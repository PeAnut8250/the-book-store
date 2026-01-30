// ============================================
// FIREBASE CONFIGURATION
// ============================================

// Firebase Configuration Object
// IMPORTANT: Replace these values with your actual Firebase project credentials
// Get these from Firebase Console > Project Settings > Your Apps > Web App

const firebaseConfig = {
    apiKey: "YOUR_API_KEY_HERE",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    databaseURL: "https://YOUR_PROJECT_ID-default-rtdb.firebaseio.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID" // Optional
};

// Initialize Firebase
try {
    firebase.initializeApp(firebaseConfig);
    console.log('Firebase initialized successfully');
} catch (error) {
    console.error('Firebase initialization error:', error);
}

// Firebase Services
const auth = firebase.auth();
const database = firebase.database();

// Export for use in other files
window.firebaseAuth = auth;
window.firebaseDB = database;