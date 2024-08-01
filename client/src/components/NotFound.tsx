const NotFound = () => {
  return (
    <div className="relative h-screen overflow-hidden bg-indigo-900">
      <img
        src="https://img.freepik.com/free-vector/cute-man-working-laptop-with-coffee-cartoon-vector-icon-illustration-people-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3869.jpg?t=st=1722424847~exp=1722428447~hmac=5fe654d3bca94cdccc778d7c9582087ae6f1a12a6598242c38bf9fc29b2bc5f4&w=740"
        className="absolute object-fill w-full h-full"
      />
      <div className="absolute inset-0 bg-black opacity-25"></div>
      <div className="container relative z-10 flex items-center px-6 py-32 mx-auto md:px-12 xl:py-40">
        <div className="relative z-10 flex flex-col items-center w-full font-mono">
          <h1 className="mt-4 text-5xl max-[450px]:text-4xl font-extrabold leading-tight text-center text-white">
            You&#x27;re alone here
          </h1>
          <p className="font-extrabold text-white text-8xl my-44 animate-bounce">
            404
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
