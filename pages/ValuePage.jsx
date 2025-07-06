import React, { useState, useEffect } from 'react';

export default function ValuePage() {
  const [searchName, setSearchName] = useState('');
  const [euro, setEuro] = useState(500); // default price to calculate value for
  const [cpuResults, setCpuResults] = useState([]);
  const [gpuResults, setGpuResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchValues = async () => {
    if (!searchName) return; // don't fetch without name

    setLoading(true);
    try {
      const cpuRes = await fetch(
        `http://localhost:3000/api/price/cpu?name=${encodeURIComponent(searchName)}&euro=${euro}`
      );
      const cpuData = await cpuRes.json();

      const gpuRes = await fetch(
        `http://localhost:3000/api/price/gpu?name=${encodeURIComponent(searchName)}&euro=${euro}`
      );
      const gpuData = await gpuRes.json();

      setCpuResults(cpuData);
      setGpuResults(gpuData);
    } catch (error) {
      console.error('Error fetching value data:', error);
      setCpuResults([]);
      setGpuResults([]);
    } finally {
      setLoading(false);
    }
  };

  // Optionally, fetch automatically when euro or searchName changes:
  useEffect(() => {
    if (searchName) {
      fetchValues();
    }
  }, [searchName, euro]);

  return (
    <div className="container">
      <h2>CPU & GPU Price Value</h2>

      <div className="mb-3">
        <label htmlFor="searchName" className="form-label">Search Name</label>
        <input
          id="searchName"
          type="text"
          className="form-control"
          placeholder="Enter CPU or GPU name substring"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
        />
      </div>

      <div className="mb-3">
        <label htmlFor="euro" className="form-label">Euro Amount</label>
        <input
          id="euro"
          type="number"
          className="form-control"
          value={euro}
          onChange={(e) => setEuro(Number(e.target.value))}
          min={1}
        />
      </div>

      {loading && <p>Loading...</p>}

      <h3>CPU Results</h3>
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {cpuResults.map(cpu => (
          <div key={cpu.id} className="col">
            <div className="card p-2">
              <div><strong>{cpu.name}</strong></div>
              <div>Single-thread: {cpu.singlethread}</div>
              <div>Multi-thread: {cpu.multithread}</div>
              <div>Value Score: {cpu.valueScore}</div>
            </div>
          </div>
        ))}
      </div>

      <h3 className="mt-5">GPU Results</h3>
      <div className="row row-cols-1 row-cols-md-3 g-3">
        {gpuResults.map(gpu => (
          <div key={gpu.id} className="col">
            <div className="card p-2">
              <div><strong>{gpu.name}</strong></div>
              <div>Benchmark: {gpu.benchmark || 'N/A'}</div>
              <div>Value Score: {gpu.valueScore}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
