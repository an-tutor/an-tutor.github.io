function Hero() {
  return (
    <div className="hero min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="max-w-s md:max-w-md">
          <img
            src="https://images.unsplash.com/photo-1508921912186-1d1a45ebb3c1?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            className="rounded-lg"
          />
          <div className="flex mt-4 gap-3 justify-between md:justify-center">
            <button className="btn btn-circle btn-outline">X</button>
            <button className="btn btn-circle btn-outline">X</button>
            <button className="btn btn-circle btn-outline">X</button>
            <button className="btn btn-circle btn-outline">X</button>
          </div>
        </div>
        <div>
          <h1 className="text-5xl font-bold">Мясина Анастасия</h1>
          <p className="py-5">Докажу, что география - это просто</p>
          <button className="btn ">Get Started</button>
        </div>
      </div>
    </div>
  );
}

export default Hero;
