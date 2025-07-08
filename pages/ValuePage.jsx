import React, { useState, useEffect } from 'react';

export default function ValuePage() {
  const [cpu, setCpu] = useState('');
  const [gpu, setGpu] = useState('');
  const [euro, setEuro] = useState(1);
  const [cpuSuggestions, setCpuSuggestions] = useState([]);
  const [gpuSuggestions, setGpuSuggestions] = useState([]);
  const [result, setResult] = useState(null);
  const [chosenCpu, setChosenCpu] = useState(null); // store whole CPU object
  const [chosenGpu, setChosenGpu] = useState(null); // store whole GPU object

  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';

  useEffect(() => {
    if (cpu.length > 1) {
      fetch(`${apiUrl}/api/cpus?name=${encodeURIComponent(cpu)}&euro=${euro}`)
        .then((res) => res.json())
        .then((data) => setCpuSuggestions(data || []))
        .catch(() => setCpuSuggestions([]));
    } else {
      setCpuSuggestions([]);
    }
  }, [cpu, euro]);

  useEffect(() => {
    if (gpu.length > 1) {
      fetch(`${apiUrl}/api/gpus?name=${encodeURIComponent(gpu)}&euro=${euro}`)
        .then((res) => res.json())
        .then((data) => setGpuSuggestions(data || []))
        .catch(() => setGpuSuggestions([]));
    } else {
      setGpuSuggestions([]);
    }
  }, [gpu, euro]);

  useEffect(() => {
    if ((chosenCpu || chosenGpu) && euro) {
      const cpuScore = chosenCpu?.multithread || 0;
      const gpuScore = chosenGpu?.benchmark || 0;
      const combinedScore = cpuScore + gpuScore;

      setResult({
        cpu: chosenCpu,
        gpu: chosenGpu,
        combined: combinedScore,
      });
    } else {
      setResult(null);
    }
  }, [chosenCpu, chosenGpu, euro]);

  return (
    <div className="container mt-4">
      <h4 className="mb-3">Performance per Euro Result</h4>

        <div className="mb-4 p-3 border rounded bg-light">
          <div>
            <strong>CPU:</strong>{' '}
            {result?.cpu?.name ? result.cpu.name : '-'}
          </div>
          <div>
            Multi-thread:{' '}
            {result?.cpu?.multithread !== undefined
              ? result.cpu.multithread
              : '-'}
          </div>
          <div>
            <strong>GPU:</strong>{' '}
            {result?.gpu?.name ? result.gpu.name : '-'}
          </div>
          <div>
            Benchmark:{' '}
            {result?.gpu?.benchmark !== undefined
              ? result.gpu.benchmark
              : '-'}
          </div>
          <div>
            <strong>Valuescore:</strong>{' '}
            {result?.combined !== undefined  && parseFloat(euro) > 0 ? (
              <>
                ({result.cpu?.multithread || 0} + {result.gpu?.benchmark || 0}) / {euro} ={' '}
                {(result.combined / euro).toFixed(2)}
              </>
            ) : (
              '-'
            )}
          </div>
        </div>

      <form>
        <div className="row mb-3">
          <div className="col-md-6">
            <label htmlFor="cpuInput" className="form-label">
              CPU Name
            </label>
            <input
              id="cpuInput"
              type="text"
              className="form-control"
              value={cpu}
              onChange={(e) => setCpu(e.target.value)}
              placeholder="Enter CPU name"
              autoComplete="off"
            />
            {cpuSuggestions.length > 0 && (
              <ul className="list-group mt-1">
                {cpuSuggestions.map((cpuItem) => (
                  <li
                    key={cpuItem.id}
                    className="list-group-item list-group-item-action"
                    onClick={() => {
                      setChosenCpu(cpuItem);
                      setCpu('');
                      setCpuSuggestions([]);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {cpuItem.name} — Benchmark: {cpuItem.multithread}
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="col-md-6">
            <label htmlFor="gpuInput" className="form-label">
              GPU Name
            </label>
            <input
              id="gpuInput"
              type="text"
              className="form-control"
              value={gpu}
              onChange={(e) => setGpu(e.target.value)}
              placeholder="Enter GPU name"
              autoComplete="off"
            />
            {gpuSuggestions.length > 0 && (
              <ul className="list-group mt-1">
                {gpuSuggestions.map((gpuItem) => (
                  <li
                    key={gpuItem.id}
                    className="list-group-item list-group-item-action"
                    onClick={() => {
                      setChosenGpu(gpuItem);
                      setGpu('');
                      setGpuSuggestions([]);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {gpuItem.name} — Benchmark: {gpuItem.benchmark}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-md-4">
            <label htmlFor="euroInput" className="form-label">
              Euro (€)
            </label>
            <div className="input-group">
              <input
                id="euroInput"
                type="number"
                className="form-control"
                value={euro}
                onChange={(e) => setEuro(e.target.value)}
                placeholder="1200"
              />
              <span className="input-group-text">€</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
