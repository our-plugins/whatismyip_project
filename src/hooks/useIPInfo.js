import { useState, useEffect } from 'react';
import { fetchIPInfo } from '../services/api';

export const useIPInfo = () => {
  const [state, setState] = useState({
    ipInfo: null,
    loading: true,
    error: null
  });

  const fetchData = async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      const data = await fetchIPInfo();
      setState({ ipInfo: data, loading: false, error: null });
    } catch (error) {
      setState({
        ipInfo: null,
        loading: false,
        error: 'Unable to fetch IP information. Please try again later.'
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    ...state,
    refetch: fetchData
  };
};