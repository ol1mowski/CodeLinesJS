export const Background = () => (
  <div className="absolute inset-0">
    <div className="absolute top-0 left-0 w-full h-full bg-dark opacity-90" />
    <div className="absolute -top-40 -right-40 w-96 h-96 bg-js rounded-full blur-[150px] opacity-20" />
    <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-js rounded-full blur-[150px] opacity-20" />

    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23f7df1e' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '30px 30px',
      }}
    />

    <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-js rounded-full blur-[100px] opacity-10" />
    <div className="absolute bottom-1/4 left-1/4 w-32 h-32 bg-js rounded-full blur-[100px] opacity-10" />
  </div>
);
