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
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const apitoken = import.meta.env.VITE_ACCESS_TOKEN

  const fetchValues = async () => {
    if (!cpuName.trim() && !gpuName.trim()) return;
    setLoading(true);

    try {
      const fetches = [];

      if (cpuName.trim()) {
        fetches.push(
            fetch(`${apiUrl}/api/price/cpu?name=${encodeURIComponent(cpuName)}&euro=${euro}`, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${apitoken}`
              }
            })
              .then(res => {
                if (!res.ok) throw new Error('CPU fetch failed');
                return res.json();
              })
            .then(data => {
              setCpuResults(data);
              if (!data.some(cpu => cpu.id === selectedCpuId)) {
                setSelectedCpuId(data.length === 1 ? data[0].id : null);
              }
            })
        );
      } else {
        setCpuResults([]);
        setSelectedCpuId(null);
      }

      if (gpuName.trim()) {
        fetches.push(
          fetch(`${apiUrl}/api/price/gpu?name=${encodeURIComponent(gpuName)}&euro=${euro}`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${apitoken}`
            }
          })
            .then(res => {
              if (!res.ok) throw new Error('GPU fetch failed');
              return res.json();
            })
            .then(data => {
              setGpuResults(data);
              if (!data.some(gpu => gpu.id === selectedGpuId)) {
                setSelectedGpuId(data.length === 1 ? data[0].id : null);
              }
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
  const totalValueScore = (selectedCpu?.valueScore ?? 0) + (selectedGpu?.valueScore ?? 0);

  return (
    <div className="container my-3" style={{ maxWidth: 1000, minWidth: 320 }}>
      <h2 className="mb-3" style={{ fontWeight: '600', letterSpacing: '0.05em' }}>CPU & GPU Price Value</h2>

      {/* Inputs */}
      <div
        className="d-flex gap-3 align-items-end flex-wrap mb-4"
        style={{ width: '100%' }}
      >
        <div style={{ flex: 1, minWidth: 260 }}>
          <label htmlFor="cpuName" className="form-label small mb-1" style={{ color: '#555' }}>
            CPU Name
          </label>
          <input
            id="cpuName"
            type="text"
            className="form-control form-control-sm"
            placeholder="Enter CPU name"
            value={cpuName}
            onChange={e => setCpuName(e.target.value)}
            autoComplete="off"
            style={{
              height: '2.2rem',
              fontSize: '0.9rem',
              padding: '0 0.6rem',
              borderRadius: 6,
              border: '1.5px solid #ccc',
              boxShadow: '0 1px 4px rgb(0 0 0 / 0.1)',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={e => (e.target.style.borderColor = '#5c7cfa')}
            onBlur={e => (e.target.style.borderColor = '#ccc')}
          />
        </div>

        <div style={{ flex: 1, minWidth: 260 }}>
          <label htmlFor="gpuName" className="form-label small mb-1" style={{ color: '#555' }}>
            GPU Name
          </label>
          <input
            id="gpuName"
            type="text"
            className="form-control form-control-sm"
            placeholder="Enter GPU name"
            value={gpuName}
            onChange={e => setGpuName(e.target.value)}
            autoComplete="off"
            style={{
              height: '2.2rem',
              fontSize: '0.9rem',
              padding: '0 0.6rem',
              borderRadius: 6,
              border: '1.5px solid #ccc',
              boxShadow: '0 1px 4px rgb(0 0 0 / 0.1)',
              transition: 'border-color 0.3s ease',
            }}
            onFocus={e => (e.target.style.borderColor = '#5c7cfa')}
            onBlur={e => (e.target.style.borderColor = '#ccc')}
          />
        </div>

        {/* Euro input smaller and centered text */}
        <div style={{ flex: '0 0 90px', minWidth: 90 }}>
          <label htmlFor="euro" className="form-label small mb-1" style={{ color: '#555', textAlign: 'center', display: 'block' }}>
            Euro
          </label>
          <input
            id="euro"
            type="number"
            className="form-control form-control-sm"
            min={1}
            value={euro}
            onChange={e => setEuro(Number(e.target.value) || 1)}
            style={{
              height: '2.2rem',
              fontSize: '0.85rem',
              padding: '0 0.3rem',
              borderRadius: 6,
              border: '2px solid #5c7cfa',
              backgroundColor: '#f0f5ff',
              textAlign: 'center',
              fontWeight: '600',
              color: '#3b49df',
              boxShadow: '0 0 6px rgb(92 124 250 / 0.4)',
              transition: 'border-color 0.3s ease, box-shadow 0.3s ease',
              userSelect: 'text',
            }}
            onFocus={e => {
              e.target.style.borderColor = '#3b49df';
              e.target.style.boxShadow = '0 0 8px rgb(59 73 223 / 0.6)';
            }}
            onBlur={e => {
              e.target.style.borderColor = '#5c7cfa';
              e.target.style.boxShadow = '0 0 6px rgb(92 124 250 / 0.4)';
            }}
          />
        </div>
      </div>

      {/* Score */}
      {!loading && (
        <div className="mb-3 p-3 border rounded bg-light text-center" style={{ boxShadow: 'inset 0 0 8px rgb(0 0 0 / 0.05)' }}>
          <h5 className="mb-1" style={{ fontWeight: '600', color: '#222' }}>Total Value Score:</h5>
          <p className="fs-4 fw-bold mb-0" style={{ letterSpacing: '0.05em', color: '#3b49df' }}>{totalValueScore}</p>
        </div>
      )}

      {loading && <p className="small">Loading results...</p>}

      {/* Results: Side-by-side layout */}
      {!loading && (
        <div className="d-flex gap-3 flex-wrap" style={{ width: '100%' }}>
          {/* CPU Column */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <h5 className="mb-2" style={{ fontWeight: '600', color: '#444' }}>CPU Results</h5>
            <div
              style={{
                maxHeight: '40vh',
                overflowY: 'auto',
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: '0.6rem',
                backgroundColor: '#fafafa',
                boxShadow: '0 1px 6px rgb(0 0 0 / 0.04)',
              }}
            >
              {cpuResults.length === 0 ? (
                <p className="small text-muted">No CPU results found.</p>
              ) : (
                <div className="row row-cols-1 g-1">
                  {cpuResults.map(cpu => (
                    <div key={cpu.id} className="col">
                      <div
                        className={`card h-100 shadow-sm cursor-pointer ${selectedCpuId === cpu.id ? 'border-primary border-2' : ''}`}
                        onClick={() => setSelectedCpuId(cpu.id)}
                        style={{
                          userSelect: 'none',
                          padding: '0.5rem 0.8rem',
                          fontSize: '0.85rem',
                          lineHeight: 1.2,
                          minHeight: 80,
                          borderRadius: 8,
                          transition: 'box-shadow 0.2s ease, border-color 0.3s ease',
                        }}
                      >
                        <div style={{ fontWeight: '600', color: '#222' }}>{cpu.name}</div>
                        <div className="d-flex justify-content-between mt-1" style={{ fontSize: '0.8rem', color: '#555' }}>

                          <div>Benchmark: {cpu.multithread}</div>
                          <div>Value: {cpu.valueScore}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* GPU Column */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <h5 className="mb-2" style={{ fontWeight: '600', color: '#444' }}>GPU Results</h5>
            <div
              style={{
                maxHeight: '40vh',
                overflowY: 'auto',
                border: '1px solid #ddd',
                borderRadius: 8,
                padding: '0.6rem',
                backgroundColor: '#fafafa',
                boxShadow: '0 1px 6px rgb(0 0 0 / 0.04)',
              }}
            >
              {gpuResults.length === 0 ? (
                <p className="small text-muted">No GPU results found.</p>
              ) : (
                <div className="row row-cols-1 g-1">
                  {gpuResults.map(gpu => (
                    <div key={gpu.id} className="col">
                      <div
                        className={`card h-100 shadow-sm cursor-pointer ${selectedGpuId === gpu.id ? 'border-primary border-2' : ''}`}
                        onClick={() => setSelectedGpuId(gpu.id)}
                        style={{
                          userSelect: 'none',
                          padding: '0.5rem 0.8rem',
                          fontSize: '0.85rem',
                          lineHeight: 1.2,
                          minHeight: 80,
                          borderRadius: 8,
                          transition: 'box-shadow 0.2s ease, border-color 0.3s ease',
                        }}
                      >
                        <div style={{ fontWeight: '600', color: '#222' }}>{gpu.name}</div>
                        <div className="d-flex justify-content-between mt-1" style={{ fontSize: '0.8rem', color: '#555' }}>
                            <div>Benchmark: {gpu.benchmark}</div>
                            <div>Value: {gpu.valueScore}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
