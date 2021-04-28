//const functions = require("firebase-functions");


















































// const admin = require("firebase-admin");
// admin.initializeApp(functions.config().firebase);
// // https://firebasestorage.googleapis.com/v0/b/tutorialfirst-4844b.appspot.com/o/mypic.jpeg?alt=media
// // https://firebasestorage.googleapis.com/v0/b/tutorialfirst-4844b.appspot.com/o/horse1.jpg?alt=media
// //https://firebasestorage.googleapis.com/v0/b/tutorialfirst-4844b.appspot.com/o/test%2Fmypic.jpeg?alt=media

// exports.sendMessage = functions.firestore
//     .document("products/{productId}")
//     .onCreate((event, context) => {
//       const docId = context.params.productId;

//       const name = event.data().name;

//       const productRef = admin.firestore().collection("products").doc(docId);

//       return productRef.update({message: `Nice ${name}!-Love cloud functions`});
//     });


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
