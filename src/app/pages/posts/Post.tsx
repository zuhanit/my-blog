import { onAuthStateChanged } from "firebase/auth";
import { collection, doc, DocumentData, getDocs, setDoc } from "firebase/firestore";
import { db } from "../../../firebase";
import { auth } from "../../../service/auth";

/**
 * 포스트 인터페이스.
 */
export interface IPost {
    title: string;
    content: string;
    subtitle: string;
    id: string;
    date: string;
}

/**
 * 포스트 목록을 읽어오는 함수.
 * 
 * Firebase의 Firestore를 사용합니다.
 * 
 * @returns Post
 */
export async function getPosts(): Promise<IPost[]> {
    const response = await getDocs(collection(db, 'posts'));
    
    return response.docs.map(doc => {
        const data = doc.data();

        return {
            title: data.title,
            content: data.content,
            subtitle: data.subtitle,
            id: doc.id,
            date: data.date,
        }
    });
}

/**
 * 포스트를 서버에 올리는 함수.
 * 
 * Firebase의 Firestore를 사용합니다.
 */
export async function uploadPost(post: IPost) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            const id = post.title.toLowerCase().replace(' ', '_');
            
            setDoc(doc(db, 'posts', id), {
                title: post.title,
                content: post.content,
                id: id,
                subtitle: post.subtitle,
                date: post.date,
            });
        } else {
            throw new Error('글을 올리기 위해선 우선 로그인해야합니다!')
        }
    });
}