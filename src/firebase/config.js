import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

class Firebase {
  constructor() {
    firebase.initializeApp(config);
    this.auth = firebase.auth();
    this.db = firebase.firestore();
  }

  async signin(email, password) {
    const user = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .catch(error => console.log(error));

    return user;
  }

  async login(email, password) {
    const user = await firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .catch(error => console.log(error));

    return user;
  }

  async logout() {
    await firebase
      .auth()
      .signOut()
      .catch(error => console.log(error));
  }

  async getUserState() {
    return new Promise(resolve => {
      this.auth.onAuthStateChanged(resolve);
    });
  }

  async createPost(post) {
    const storageRef = firebase.storage().ref();
    const storageChild = storageRef.child(post.cover.name);
    const postCover = await storageChild.put(post.cover);
    const downloadURL = await storageChild.getDownloadURL();
    const fileRef = postCover.ref._delegate._location.path_;

    const newPost = {
      title: post.title,
      content: post.content,
      cover: downloadURL,
      fileref: fileRef,
    };

    const firebasePost = await firebase
      .firestore()
      .collection("posts")
      .add(newPost)
      .catch(error => console.log(error));

    return firebasePost;
  }
}

export default new Firebase();
