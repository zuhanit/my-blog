import '@toast-ui/editor/dist/toastui-editor.css';
import 'prismjs/themes/prism.css'
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css'
import { Editor as ToastEditor } from '@toast-ui/react-editor';
import codeSyntaxHighlightPlugin from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';
import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { uploadPost } from '../posts/Post';
import { IAccount, login } from '../../../service/auth';

export const Editor = () => {
    const ref = useRef<ToastEditor>(null);
    const [title, setTitle] = useState<string>('');
    const [subtitle, setSubtitle] = useState<string>('');
    const [account, setAccount] = useState<IAccount>({
        id: '',
        password: ''
    });

    const navigate = useNavigate();

    const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setTitle(value);
    };
    
    const onChangeSubTitle = (e: ChangeEvent<HTMLInputElement>) => {
        const {value} = e.target;
        setSubtitle(value);
    };

    const onChangeAccountID = (e: ChangeEvent<HTMLInputElement>) => {
        setAccount({
            ...account,
            id: e.target.value
        })
    }

    const onChangeAccountPassword = (e: ChangeEvent<HTMLInputElement>) => {
        setAccount({
            ...account,
            password: e.target.value
        })
    }

    const onClickLogin = (e: MouseEvent<HTMLButtonElement>) => {
        login(account)
    }

    const upload = () => {
        if (title.length <= 0 || subtitle.length <= 0) {
            console.log('Title === 0');
            return;
        }

        if (ref.current) {
            const html = ref.current?.getInstance().getHTML()
            uploadPost({
                title: title,
                id: title.toLowerCase().replace(' ', '_'),
                content: html,
                subtitle: subtitle,
                date: Date(),
            });
        }
    }

    return (
        <>
            <input type='text' onChange={onChangeTitle}></input>
            <input type='text' onChange={onChangeSubTitle}></input>
            <ToastEditor
                previewStyle='vertical'
                ref={ref}
                plugins={[
                    [codeSyntaxHighlightPlugin, { highlighter: Prism }]
                ]}
                onChange={upload}
            />
            <button onClick={upload}></button>

            <input type='email' placeholder='example@gmail.com' onChange={onChangeAccountID}></input>
            <input type='password' placeholder='password' onChange={onChangeAccountPassword}></input>
            <button onClick={onClickLogin}></button>
        </>
    )
}