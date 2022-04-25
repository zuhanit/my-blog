import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

export interface IAccount {
    id: string;
    password: string;
}

export const auth = getAuth();

export async function login({id, password}: IAccount) {
    const credential = await signInWithEmailAndPassword(auth, id, password)
    
    return credential;
}