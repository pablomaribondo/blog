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

  async indexPost() {
    const posts = await firebase.firestore().collection("posts").get();
    const postsArray = [];
    posts.forEach(doc => postsArray.push({ id: doc.id, data: doc.data() }));

    return postsArray;
  }

  async showPost(postId) {
    const post = await firebase
      .firestore()
      .collection("posts")
      .doc(postId)
      .get();
    const postData = post.data();

    return postData;
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

  async updatePost(postId, post) {
    if (post["cover"]) {
      const storageRef = firebase.storage().ref();
      const storageChild = storageRef.child(post.cover.name);
      const postCover = await storageChild.put(post.cover);
      const downloadURL = await storageChild.getDownloadURL();
      const fileRef = postCover.ref._delegate._location.path_;

      await storageRef
        .child(post["oldcover"])
        .delete()
        .catch(error => console.log(error));

      const updatePost = {
        title: post.title,
        content: post.content,
        cover: downloadURL,
        fileref: fileRef,
      };

      const firebasePost = await firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .set(updatePost, { merge: true })
        .catch(error => console.log(error));

      return firebasePost;
    } else {
      const firebasePost = await firebase
        .firestore()
        .collection("posts")
        .doc(postId)
        .set(post, { merge: true })
        .catch(error => console.log(error));

      return firebasePost;
    }
  }

  async deletePost(postId, fileRef) {
    const storageRef = firebase.storage().ref();
    await storageRef
      .child(fileRef)
      .delete()
      .catch(error => console.log(error));

    const post = await firebase
      .firestore()
      .collection("posts")
      .dic(postId)
      .delete()
      .catch(error => console.log(error));

    return post;
  }
}

export default new Firebase();
