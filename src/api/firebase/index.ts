import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import { UserLogin } from "../../services/types/UserLogin";

const auth = getAuth();


export async function login(userData: UserLogin){

  signInWithEmailAndPassword(auth, userData.email, userData.password)
  .then((userCredential: any) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error: any) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
}

export async function register(userData: UserLogin){

  createUserWithEmailAndPassword(auth, userData.email, userData.password)
  .then((userCredential: any) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user);
    // ...
  })
  .catch((error: any) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log(errorCode, errorMessage);
  });
}

 
