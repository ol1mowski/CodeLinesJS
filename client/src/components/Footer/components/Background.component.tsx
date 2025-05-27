export const Background = () => (
  <div className="absolute inset-0">
    {/* Base background overlay */}
    <div className="absolute inset-0 bg-[#1a1a1a] opacity-95" />

    {/* Geometric shapes with clipPath - reduced opacity */}
    <div
      className="absolute left-0 top-0 w-1/4 h-full bg-[#f7df1e] opacity-30"
      style={{
        clipPath: 'polygon(0 0, 80% 0, 60% 100%, 0 100%)'
      }}
    />

    <div
      className="absolute right-0 bottom-0 w-1/5 h-1/2 bg-[#f7df1e] opacity-25"
      style={{
        clipPath: 'polygon(40% 0, 100% 0, 100% 100%, 0 100%)'
      }}
    />

    {/* Small triangular shapes - reduced opacity */}
    <div
      className="absolute top-1/4 right-1/4 w-6 h-6 bg-[#f7df1e] opacity-20"
      style={{
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
      }}
    />
    <div
      className="absolute bottom-1/3 left-1/3 w-4 h-4 bg-[#f7df1e] opacity-20"
      style={{
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
      }}
    />
    <div
      className="absolute top-1/2 right-1/3 w-3 h-3 bg-[#f7df1e] opacity-20"
      style={{
        clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
      }}
    />

    {/* Glowing orbs - reduced opacity */}
    <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-10" />
    <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-[#f7df1e] rounded-full blur-[150px] opacity-10" />
    
    {/* Additional smaller glows - reduced opacity */}
    <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-[#f7df1e] rounded-full blur-[100px] opacity-5" />
    <div className="absolute bottom-1/4 right-1/4 w-32 h-32 bg-[#f7df1e] rounded-full blur-[100px] opacity-5" />

    {/* Shadow in top-right corner */}
    <div 
      className="absolute top-0 right-0 w-64 h-64 opacity-20 pointer-events-none"
      style={{
        background: 'radial-gradient(circle at center, rgba(26, 26, 26, 0.8) 0%, transparent 70%)',
        filter: 'blur(20px)'
      }}
    />

    {/* Grid pattern overlay */}
    <div
      className="absolute inset-0 opacity-[0.01]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f7df1e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px',
      }}
    />
  </div>
);
