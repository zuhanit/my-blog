import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NotFound } from "../pages/NotFound";
import { getPosts, IPost } from "../pages/posts/Post";

export type LoadStatus = 'pending' | 'fulfilled' | 'error';

/**
 * 
 * @returns 포스트 페이지
 */
export default function PostPage() {
    const params = useParams();
    const [post, setPost] = useState<IPost | undefined>()
    const [loadStatus, setLoadStatus] = useState<LoadStatus>('pending');

    useEffect(() => {
        async function getMatchedPost() {
            const matchedPost = await (await getPosts()).find(x => x.id === params.id);

            if (matchedPost) {
                setLoadStatus('fulfilled');
                setPost(matchedPost);
            } else {
                setLoadStatus('error');
            }
        }

        getMatchedPost();
    }, [params]);

    switch (loadStatus) {
        case 'fulfilled':
            if (post === undefined) { // await 성공했으나 문서 존재하지 않음
                return (
                    <NotFound />
                );
            }

            return (
                <div className="post">
                    <section className="title">
                        <h1>{post.title}</h1>
                        <small><p>{post.subtitle}</p></small>
                        <span className="grey"><small>Last Modified: {post.date}</small></span>
                    </section>
                    <section className="content">
                        <p dangerouslySetInnerHTML={{__html: post.content}}></p>
                    </section>
                </div>
            );

        case 'error':
            return (
                <NotFound />
            );

        default:
            return (
                <div className="post">
                    <section className="title">
                        <div className="skeleton-title"></div>
                        <div className="skeleton-subtitle"></div>
                    </section>
                    <section className="content">
                        {
                            Array(20).fill(<div className="skeleton-content"></div>)
                        }
                    </section>
                </div>
            )
    }
}