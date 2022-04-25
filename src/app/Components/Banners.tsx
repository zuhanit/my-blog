import { useEffect, useState } from "react";
import Banner from "./Banner";
import { getPosts, IPost } from "../pages/posts/Post";
import { LoadStatus } from "./PostPage";

/**
 * 
 * @returns 배너 목록
 */
export default function Banners() {
    const [posts, setPosts] = useState<IPost[] | undefined>(undefined);
    const [loadStatus, setLoadStatus] = useState<LoadStatus>('pending')

    useEffect(() => {
        async function readPost() {
            const firebasePosts = await getPosts();

            if (firebasePosts) {
                setPosts(firebasePosts);
                setLoadStatus('fulfilled');
            } else {
                setLoadStatus('error');
            }
        }

        readPost();
    }, []);
    console.log(posts?.map(post =>
        <Banner
            title={post.title}
            subtitle={post.subtitle}
            content={post.content}
            id={post.id}
            key={post.title}
            date={post.date}
        />
    ).reduce((result: JSX.Element[][], item, index) => {
        const currentChunk = Math.floor(index / 4);
        if (!result[currentChunk]) result[currentChunk] = []
        result[currentChunk].push(item);
        return result;
    }, []).map(x => <div>{x}</div>))
    switch (loadStatus) {
        case 'fulfilled':
            if (posts === undefined) {
                return (
                    <></>
                )
            }

            return (
                <>
                    {
                        posts.map(post =>
                            <Banner
                                title={post.title}
                                subtitle={post.subtitle}
                                content={post.content}
                                id={post.id}
                                key={post.title}
                                date={post.date}
                            />
                        ).reduce((result: JSX.Element[][], item, index) => {
                            const currentChunk = Math.floor(index / 4);
                            if (!result[currentChunk]) result[currentChunk] = []
                            result[currentChunk].push(item);
                            return result;
                        }, []).map(x => <div className="banners">{x}</div>)
                    }
                </>
            )
        
        case 'error':
            return (
                <></>
            )

        default:
            return (
                <>
                    <div className="banners">
                        {
                            Array(4).fill('').map((_v, i) => <div className="skeleton-banner" key={i}></div>)
                        }
                    </div>
                </>
            )
    }
}