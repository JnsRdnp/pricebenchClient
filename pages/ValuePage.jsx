import React, { useState, useEffect } from 'react';

export default function ValuePage() {
  const [cpuName, setCpuName] = useState('');
  const [gpuName, setGpuName] = useState('');
  const [euro, setEuro] = useState(500);
  const [cpuResults, setCpuResults] = useState([]);
  const [gpuResults, setGpuResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const [selectedCpuId, setSelectedCpuId] = useState(null);
  const [selectedGpuId, setSelectedGpuId] = useState(null);

  const fetchValues = async () => {
    if (!cpuName.trim() && !gpuName.trim()) return;

    setLoading(true);
    try {
      const fetches = [];

      if (cpuName.trim()) {
        fetches.push(
          fetch(`http://localhost:3000/api/price/cpu?name=${encodeURIComponent(cpuName)}&euro=${euro}`)
            .then(res => {
              if (!res.ok) throw new Error('CPU fetch failed');
              return res.json();
            })
            .then(data => {
              setCpuResults(data);
              setSelectedCpuId(data.length === 1 ? data[0].id : null);
            })
        );
      } else {
        setCpuResults([]);
        setSelectedCpuId(null);
      }

      if (gpuName.trim()) {
        fetches.push(
          fetch(`http://localhost:3000/api/price/gpu?name=${encodeURIComponent(gpuName)}&euro=${euro}`)
            .then(res => {
              if (!res.ok) throw new Error('GPU fetch failed');
              return res.json();
            })
            .then(data => {
              setGpuResults(data);
              setSelectedGpuId(data.length === 1 ? data[0].id : null);
            })
        );
      } else {
        setGpuResults([]);
        setSelectedGpuId(null);
      }

      await Promise.all(fetches);
    } catch (error) {
      console.error('Error fetching value data:', error);
      setCpuResults([]);
      setGpuResults([]);
      setSelectedCpuId(null);
      setSelectedGpuId(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchValues();
  }, [cpuName, gpuName, euro]);

  const selectedCpu = cpuResults.find(cpu => cpu.id === selectedCpuId);
  const selectedGpu = gpuResults.find(gpu => gpu.id === selectedGpuId);

  const totalValueScore =
    (selectedCpu?.valueScore ?? 0) + (selectedGpu?.valueScore ?? 0);

  return (
    <div className="container my-3" style={{ maxWidth: 900 }}>
      <h2 className="mb-3">CPU & GPU Price Value</h2>

      {/* Inputs in a row */}
      <div className="d-flex gap-2 align-items-end flex-wrap" style={{ marginBottom: '0.5rem' }}>
        <div style={{ flex: '1 1 30%', minWidth: 160 }}>
          <label htmlFor="cpuName" className="form-label small mb-0">CPU Name</label>
          <input
            id="cpuName"
            type="text"
            className="form-control form-control-sm"
            placeholder="Enter CPU name"
            value={cpuName}
            onChange={e => setCpuName(e.target.value)}
            autoComplete="off"
            style={{ height: '1.7rem', fontSize: '0.8rem', padding: '0 0.4rem' }}
          />
        </div>

        <div style={{ flex: '1 1 30%', minWidth: 160 }}>
          <label htmlFor="gpuName" className="form-label small mb-0">GPU Name</label>
          <input
            id="gpuName"
            type="text"
            className="form-control form-control-sm"
            placeholder="Enter GPU name"
            value={gpuName}
            onChange={e => setGpuName(e.target.value)}
            autoComplete="off"
            style={{ height: '1.7rem', fontSize: '0.8rem', padding: '0 0.4rem' }}
          />
        </div>

        <div style={{ flex: '0 0 100px' }}>
          <label htmlFor="euro" className="form-label small mb-0">Euro</label>
          <input
            id="euro"
            type="number"
            className="form-control form-control-sm"
            min={1}
            value={euro}
            onChange={e => setEuro(Number(e.target.value) || 1)}
            style={{ height: '1.7rem', fontSize: '0.8rem', padding: '0 0.4rem' }}
          />
        </div>
      </div>

      {loading && <p className="small">Loading results...</p>}

      {!loading && (
        <>
          {/* CPU Results scrollable container */}
                      <div className="mt-3 p-2 border rounded bg-light text-center">
            <h5 className="mb-1">Total Value Score:</h5>
            <p className="fs-5 fw-bold mb-0">{totalValueScore}</p>
          </div>
          <div
            style={{
              maxHeight: '40vh',
              overflowY: 'auto',
              paddingRight: '0.5rem',
              marginBottom: '1rem',
              border: '1px solid #ddd',
              borderRadius: 4,
              padding: '0.5rem',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h4 className="mb-2">CPU Results</h4>
            {cpuResults.length === 0 ? (
              <p className="small">No CPU results found.</p>
            ) : (
              <div className="row row-cols-1 row-cols-sm-1 row-cols-md-4 g-1">
                {cpuResults.map(cpu => (
                  <div key={cpu.id} className="col">
                    <div
                      className={`card h-100 shadow-sm cursor-pointer ${
                        selectedCpuId === cpu.id ? 'border-primary border-2' : ''
                      }`}
                      onClick={() => setSelectedCpuId(cpu.id)}
                      style={{
                        userSelect: 'none',
                        padding: '0.4rem 0.6rem',
                        fontSize: '0.75rem',
                        lineHeight: 1.1,
                        minHeight: 75,
                      }}
                    >
                      <h6 className="card-title mb-1">{cpu.name}</h6>
                      <p className="mb-0">Single-thread: {cpu.singlethread}</p>
                      <p className="mb-0">Multi-thread: {cpu.multithread}</p>
                      <p className="mb-0 fw-semibold">Value: {cpu.valueScore}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* GPU Results scrollable container */}

          <div
            style={{
              maxHeight: '40vh',
              overflowY: 'auto',
              paddingRight: '0.5rem',
              marginBottom: '1rem',
              border: '1px solid #ddd',
              borderRadius: 4,
              padding: '0.5rem',
              backgroundColor: '#f9f9f9',
            }}
          >
            <h4 className="mb-2">GPU Results</h4>
            {gpuResults.length === 0 ? (
              <p className="small">No GPU results found.</p>
            ) : (
              <div className="row row-cols-1 row-cols-sm-1 row-cols-md-4 g-1">
                {gpuResults.map(gpu => (
                  <div key={gpu.id} className="col">
                    <div
                      className={`card h-100 shadow-sm cursor-pointer ${
                        selectedGpuId === gpu.id ? 'border-primary border-2' : ''
                      }`}
                      onClick={() => setSelectedGpuId(gpu.id)}
                      style={{
                        userSelect: 'none',
                        padding: '0.4rem 0.6rem',
                        fontSize: '0.75rem',
                        lineHeight: 1.1,
                        minHeight: 75,
                      }}
                    >
                      <h6 className="card-title mb-1">{gpu.name}</h6>
                      <p className="mb-0">Benchmark: {gpu.benchmark ?? 'N/A'}</p>
                      <p className="mb-0 fw-semibold">Value: {gpu.valueScore}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>


        </>
      )}
    </div>
  );
}
