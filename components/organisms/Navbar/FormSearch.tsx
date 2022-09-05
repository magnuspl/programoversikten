import { useRouter } from 'next/dist/client/router';
import { useState } from 'react';

export default function FormSearch() {
  const [keyword, setKeyword] = useState('');
  const router = useRouter();

  const onSubmit = (event: any) => {
    if (!keyword) {
      event.preventDefault();
    } else {
      event.preventDefault();
      router.push(`/search/${keyword}`);
    }
  };

  const onClick = (event: any) => {
    if (!keyword) {
      event.preventDefault();
    } else {
      router.push(`/search/${keyword}`);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="d-flex w-100">
        <input
            style={{
              borderRadius: "30px",
              padding: "20px",
              fontSize: "1rem"
            }}
          className="form-control"
          type="search"
          placeholder="Søk"
          aria-label="Search"
          value={keyword}
          onChange={(event) => setKeyword(event.target.value)}
        />
        <button
          className="btn btn-outline-purple"
          style={{marginLeft: "-50px"}}
          type="button"
          onClick={onClick}
        >
          <i className="fa fa-search" aria-hidden />
        </button>
      </div>
    </form>
  );
}
