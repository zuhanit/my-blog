import fuzzysort from "fuzzysort";
import { useState } from "react";
import { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import { getPosts } from "../pages/posts/Post";
import { IPost } from '../pages/posts/Post';

interface SearchProps {
  result: Fuzzysort.KeysResult<IPost>[];
  status: boolean;
}

interface SearchResultItemProps {
  result: Fuzzysort.KeysResult<IPost>;
  index: number;
}

function SearchResultItem({result, index}: SearchResultItemProps) {
  const [hover, setHover] = useState<boolean>(false);
  const onMouseOverItem = () => {
    setHover(true)
  };

  const onMouseOutItem = () => {
    setHover(false)
  };

  return (
    <Link to={'/posts/' + result.obj.id} key={result.obj.id}>
      <div 
        className="result-item"
        role='option'
        aria-selected={hover}
        key={'result-item-' + index}
        onMouseOver={onMouseOverItem}
        onMouseOut={onMouseOutItem}
      >
          { result[0] ? fuzzysort.highlight(result[0], (m, index) => <mark>{m}</mark>) : result.obj.title }
          <br></br>
          <small>
            { result[1] ? fuzzysort.highlight(result[1], (m, index) => <mark>{m}</mark>) : result.obj.subtitle }
          </small>
      </div>
    </Link>
  )
}

function SearchResult({result , status}: SearchProps) {
  if (status === false) return <></>;

  return (
    <div className="search-result">
      {
        result.map((x, i) => {
          return (
            <SearchResultItem result={x} index={i} />
          )
        })
      }
    </div>
  );
}

export function Navigator() {
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResult, setSearchResult] = useState<Fuzzysort.KeysResult<IPost>[]>([]);

  const onChangeSearch = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length !== 0) {
      setIsSearching(true);
      const posts = await getPosts();

      let results = [
        ...fuzzysort.go(e.target.value, posts, {
          keys: ['title', 'subtitle', 'id', 'content'],
          scoreFn: x => Math.max(x[0] ? x[0].score : -1000, x[1] ? x[1].score : -1000),
          threshold: -999
        }),
      ]

      setSearchResult(results);
    } else {
      setIsSearching(false);
    }
  }

  return (
    <>
      <div className="top-navigation-logo">
        <Link to="/" className="logo">
          HAMJOOHAN.
        </Link>
      </div>
      <div className="top-navigation-main">
        <div className="search">
          <form className="search-form">
            <input type="search" className="search-input" onChange={onChangeSearch}></input>
            <button type="submit" className="search-button">
            </button>
            <SearchResult result={searchResult} status={isSearching} />
          </form>
        </div>
      </div>
    </>
  );
}
