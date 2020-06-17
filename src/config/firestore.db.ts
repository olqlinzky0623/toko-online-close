import admin, { ServiceAccount } from 'firebase-admin'
//es-lint disable until next line
const serviceAccount:ServiceAccount = require("../../access.json")

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://todo-7e0ac.firebaseio.com"
})

const db:FirebaseFirestore.Firestore = admin.firestore()
db.settings({Timestamp: true})

export default db
