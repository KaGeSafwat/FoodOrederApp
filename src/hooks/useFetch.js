import { useState, useEffect, useCallback } from 'react';

// send http request function
async function sendHttpRequest(url, config) {
  const response = await fetch(url, config);

  const resData = await response.json();

  if (!response.ok) {
    throw new Error(
      resData.message || 'Something went wrong, failed to send request.'
    );
  }

  return resData;
}

// custom hook for fetching data
export function useFetch(url, config, inputData) {
  const [items, setItems] = useState(inputData);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // clear data function
  function clearData() {
    setItems(inputData);
  }

  const sendRequest = useCallback(
    async function sendRequest(data) {
      setIsLoading(true);
      try {
        const resData = await sendHttpRequest(url, { ...config, body: data });
        setItems(resData);
      } catch (error) {
        setError(error.message || 'Something went wrong!');
      }
      setIsLoading(false);
    },
    [url, config]
  );

  useEffect(() => {
    if ((config && (config.method === 'GET' || !config.method)) || !config) {
      sendRequest();
    }
  }, [sendRequest, config]);

  return {
    items,
    error,
    isLoading,
    sendRequest,
    clearData,
  };
}
