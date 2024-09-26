import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Typography } from '@mui/material';

import { usersErrorSelector, usersLoadingSelector } from './store/users.selectors';
import { generateUsers } from './store/users.actions';
import { Random } from 'random-js';
import UserFilters from './components/UserFilters';
import UserTable from './components/UserTable';

const UsersPage: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(usersLoadingSelector);
  const error = useSelector(usersErrorSelector);
  const random = new Random();

  const [region, setRegion] = useState('CA');
  const [errorCount, setErrorCount] = useState(0);
  const [seed, setSeed] = useState(0);
  const [page, setPage] = useState(1);
  const [allUsers, setAllUsers] = useState<any[]>([]);

  const fetchUsers = useCallback(async () => {
    const action = await dispatch<any>(generateUsers({ region, errorCount, seed, page }));
    if (action.meta.requestStatus === 'fulfilled') {
      setAllUsers((prev) => [...prev, ...action.payload]);
    }
  }, [dispatch, region, errorCount, seed, page]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers, page]);

  useEffect(() => {
    setAllUsers([]);
    setPage(1);
  }, [region, errorCount, seed]);

  const loadMore = (event: React.UIEvent<HTMLElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = event.currentTarget;
    if (scrollHeight - scrollTop <= clientHeight + 50 && !loading) {
      setPage((prev) => prev + 1);
    }
  };

  const handleSeedRandom = () => {
    setSeed(random.integer(0, 9999));
  };

  const uniqueUsers = Array.from(new Set(allUsers.map(user => user.id)))
    .map(id => allUsers.find(user => user.id === id));

  return (
    <Box sx={{ padding: 2, height: '80vh', overflow: 'auto' }} onScroll={loadMore}>
      <Typography variant="h4">User Generation</Typography>
      <UserFilters
        region={region}
        setRegion={setRegion}
        errorCount={errorCount}
        setErrorCount={setErrorCount}
        seed={seed}
        setSeed={setSeed}
        handleSeedRandom={handleSeedRandom}
      />
      <UserTable uniqueUsers={uniqueUsers} loading={loading} error={error} />
    </Box>
  );
};

export default UsersPage;
