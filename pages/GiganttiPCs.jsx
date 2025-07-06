import { useEffect, useState } from 'react';
import Spinner from '../components/Spinner';

export default function GiganttiPCs() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  const apitoken = import.meta.env.VITE_ACCESS_TOKEN

  useEffect(() => {
    fetch(`${apiUrl}/api/gigantti`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${apitoken}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to fetch products');
        return res.json();
      })
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  if (loading) return <Spinner />;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div
      className="container"
      style={{ maxWidth: '100%', paddingLeft: '0.5rem', paddingRight: '0.5rem' }}
    >
      <h1
        className="mb-4"
        style={{
          lineHeight: '1.2',
          paddingBottom: '4px',
          fontSize: '1.8rem',
          fontWeight: '700',
          background: 'linear-gradient(90deg, #ff5722, #ff9800)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          letterSpacing: '1.5px',
          textShadow: '0 2px 4px rgba(0,0,0,0.15)',
          userSelect: 'none',
          whiteSpace: 'normal',
          overflowWrap: 'break-word',
          maxWidth: '100%',
          boxSizing: 'border-box',
        }}
      >
        Gigantti PCs
      </h1>

      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {products.map((product, index) => (
          <div className="col" key={product.id} style={{ position: 'relative' }}>
            {/* Ranking badge */}
            <div
              style={{
                position: 'absolute',
                top: '8px',
                left: '8px',
                backgroundColor: index === 0 ? '#ffd700' : '#007bff',
                color: index === 0 ? '#333' : '#fff',
                padding: '4px 8px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '0.85rem',
                display: 'flex',
                alignItems: 'center',
                boxShadow: '0 2px 6px rgba(0,0,0,0.15)',
                userSelect: 'none',
                zIndex: 10,
              }}
              title={`Rank #${index + 1}`}
            >
              #{index + 1} {index === 0 && <span style={{ marginLeft: '4px' }}>👑</span>}
            </div>

            <a
              href={product.link}
              target="_blank"
              rel="noopener noreferrer"
              style={{ textDecoration: 'none', color: 'inherit' }}
            >
              <div
                className="card h-100"
                style={{
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease, boxShadow 0.2s ease',
                  fontSize: '0.9rem',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.03)';
                  e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <img
                  src={product.imageUrl}
                  className="card-img-top img-fluid"
                  alt={product.name}
                  style={{ objectFit: 'contain', maxHeight: '140px', maxWidth: '100%', backgroundColor: '#f0f0f0' }}
                />
                <div className="card-body p-3">
                  <h5 className="card-title" style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>
                    {product.name}
                  </h5>
                  <p className="card-text mb-1" style={{ fontWeight: '600', fontSize: '1.1rem' }}>
                    {product.price} €
                  </p>
                  <p className="text-success mb-2" style={{ fontSize: '0.8rem' }}>
                    {product.availability}
                  </p>
                  <ul className="list-unstyled small mb-2" style={{ fontSize: '0.8rem' }}>
                    {product.specs?.map((spec, i) => (
                      <li key={i}>• {spec}</li>
                    ))}
                  </ul>
                  <p
                    className="mb-1"
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      borderLeft: '4px solid #007bff',
                      paddingLeft: '8px',
                      color: '#0056b3',
                      marginBottom: '0.3rem',
                    }}
                  >
                    CPU Model: {product.cpuPerformance?.name} <br />
                    (Single-thread: {product.cpuPerformance?.singlethread}, Multi-thread:{' '}
                    {product.cpuPerformance?.multithread}, Value:{' '}
                    {product.cpuPerformance?.valueScore?.toFixed(2)})
                  </p>

                  <p
                    style={{
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      borderLeft: '4px solid #007bff',
                      paddingLeft: '8px',
                      color: '#0056b3',
                    }}
                  >
                    GPU Model: {product.gpuPerformance?.name} <br />
                    (Benchmark: {product.gpuPerformance?.benchmark}, Value:{' '}
                    {product.gpuPerformance?.valueScore?.toFixed(2)})
                  </p>
                </div>
                <div
                  className="card-footer d-flex justify-content-center align-items-center"
                  style={{ padding: '0.4rem 0' }}
                >
                  <span
                    style={{
                      fontSize: '1.3rem',
                      fontWeight: '700',
                      color: '#ff5722',
                      backgroundColor: 'rgba(255, 87, 34, 0.1)',
                      padding: '4px 10px',
                      borderRadius: '12px',
                      boxShadow: '0 0 6px rgba(255, 87, 34, 0.6)',
                      minWidth: 'fit-content',
                      userSelect: 'none',
                    }}
                    title="Combined performance per euro score"
                  >
                    Score: {product.combinedValueScore?.toFixed(2)}
                  </span>
                </div>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}