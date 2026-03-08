import { useEffect, useState, useCallback } from 'react';
import './assets/styles/global.css';
import { UserList } from "./components/UserList/UserList";
import { Search } from './components/Search/Search';
import { Pagination } from './components/Pagination/Pagination';
import type { User } from './types/types';

function App() {
  const limit = 28;
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [query, setQuery] = useState("");
  const [total, setTotal] = useState(0);
  const [skip, setSkip] = useState(0);

  useEffect(() => {
    const abortController = new AbortController();

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const url = query.trim() 
          ? `https://dummyjson.com/users/search?q=${query}&limit=${limit}&skip=${skip}`
          : `https://dummyjson.com/users?limit=${limit}&skip=${skip}`;
          
        const res = await fetch(url, { signal: abortController.signal });
        if (!res.ok) {
          throw new Error("Something went wrong");
        }
        const jsonData = await res.json();
        setUsers(jsonData.users);
        setTotal(jsonData.total);
        setLoading(false);
      } catch (err: unknown) {
        if (err instanceof Error && err.name === 'AbortError') return;
        setError(err instanceof Error ? err.message : String(err));
        setLoading(false);
      }
    };

    fetchData();

    return () => {
      abortController.abort();
    };
  }, [query, skip]);

  const searchUser = useCallback((searchTerm: string) => {
    setQuery(searchTerm);
    setSkip(0);
  }, []);

  const clearSearch = useCallback(() => {
    setQuery("");
    setSkip(0);
  }, []);

  return (
    <div className="container">
      <Search searchUser={searchUser} clearSearch={clearSearch} />
      <UserList users={users} loading={loading} error={error} />
      {!loading && !error && users.length > 0 && (
        <Pagination 
          total={total} 
          limit={limit} 
          skip={skip} 
          onPageChange={(newSkip) => setSkip(newSkip)} 
        />
      )}
    </div>
  );
}

export default App
