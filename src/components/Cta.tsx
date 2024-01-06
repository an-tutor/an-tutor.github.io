function Cta() {
  return (
    <section className="py-20 my-10 w-full bg-red-700 relative z-10 overflow-hidden">
      <div className="max-w-screen-xl mx-auto flex flex-col xl:flex-row justify-between align-middle">
        <div>
          <h3 className="text-3xl">Заинтересовало мое предложение?</h3>
          <h3 className="text-4xl font-bold">Свяжитесь со мной!</h3>
        </div>
        <div className="flex mt-4 gap-3 justify-between md:justify-center">
          <button className="btn btn-circle btn-outline">X</button>
          <button className="btn btn-circle btn-outline">X</button>
          <button className="btn btn-circle btn-outline">X</button>
          <button className="btn btn-circle btn-outline">X</button>
        </div>
      </div>
      <div>
        <span className="absolute top-0 left-0 z-[-1]">
          <svg
            width="189"
            height="162"
            viewBox="0 0 189 162"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="16"
              cy="-16.5"
              rx="173"
              ry="178.5"
              transform="rotate(180 16 -16.5)"
              fill="url(#paint0_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="-157"
                y1="-107.754"
                x2="98.5011"
                y2="-106.425"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" stop-opacity="0.07" />
                <stop offset="1" stop-color="white" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </span>
        <span className="absolute bottom-0 right-0 z-[-1]">
          <svg
            width="191"
            height="208"
            viewBox="0 0 191 208"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <ellipse
              cx="173"
              cy="178.5"
              rx="173"
              ry="178.5"
              fill="url(#paint0_linear)"
            />
            <defs>
              <linearGradient
                id="paint0_linear"
                x1="-3.27832e-05"
                y1="87.2457"
                x2="255.501"
                y2="88.5747"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" stop-opacity="0.07" />
                <stop offset="1" stop-color="white" stop-opacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </span>
      </div>
    </section>
  );
}

export default Cta;
