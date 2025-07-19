import { useState } from 'react';
export const useRefresh = () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 2000);
  };
  return { refreshing, onRefresh };
};