export default function Hero() {
  return (
    <section className="bg-[#fff7f0] py-20 px-6 md:px-16">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-16">
        {/* TEXT SECTION */}
        <div className="text-center md:text-left md:w-1/2">
          <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 leading-tight">
            Because Every Day <br />
            Deserves Something <span className="text-primary">Sweet.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-700 max-w-md mx-auto md:mx-0">
            Explore our collection of delightful treats — limited editions, best
            sellers, and staff picks waiting just for you.
          </p>
        </div>

        {/* IMAGE SECTION */}
        <div className="md:w-1/2 grid grid-cols-2 gap-6">
          <img
            src="/image/1.webp"
            alt="Sweet 1"
            className="rounded-xl shadow-lg object-cover w-full h-52 md:h-64"
          />
          <img
            src="/image/2.heic"
            alt="Sweet 2"
            className="rounded-xl shadow-lg object-cover w-full h-52 md:h-64"
          />
          <img
            src="/image/3.heic"
            alt="Sweet 3"
            className="rounded-xl shadow-lg object-cover w-full h-52 md:h-64"
          />
          <img
            src="/image/4.heic"
            alt="Sweet 4"
            className="rounded-xl shadow-lg object-cover w-full h-52 md:h-64"
          />
        </div>
      </div>
    </section>
  );
}
