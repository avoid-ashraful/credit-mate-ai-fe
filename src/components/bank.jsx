import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const Bank = () => {
  const [banks, setBanks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get base URL from environment variable and concatenate with path
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const BANKS_ENDPOINT = '/banks';

  useEffect(() => {
    const fetchBanks = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${BASE_URL}${BANKS_ENDPOINT}`);
        setBanks(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch banks data');
        console.error('Error fetching banks:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks();
  }, []);

  if (loading) {
    return <div>Loading banks...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h1>Banks</h1>
      {banks.length === 0 ? (
        <p>No banks found</p>
      ) : (
        <div>
          {banks.map((bank, index) => (
            <div key={bank.id || index} style={{ margin: '10px 0', padding: '10px', border: '1px solid #ccc' }}>
              <pre>{JSON.stringify(bank, null, 2)}</pre>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};