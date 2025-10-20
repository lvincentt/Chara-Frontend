import { motion } from "framer-motion";

export default function Hero() {
  const images = [
    { src: "/image/foto1.jpeg", alt: "Delicious Chocolate Cake" },
    { src: "/image/foto2.jpg", alt: "Freshly Baked Cookies" },
    { src: "/image/foto3.jpeg", alt: "Artisan Pastries" },
    { src: "/image/foto4.jpeg", alt: "Special Cupcakes" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
      },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
    },
  };

  return (
    <section className="relative bg-gradient-to-br from-[#fff7f0] via-[#fff5ed] to-[#fff0e0] py-24 px-6 md:px-16 overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-10 left-10 w-20 h-20 bg-primary/10 rounded-full blur-xl"
          animate={floatingAnimation}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-16 h-16 bg-yellow-200/30 rounded-full blur-lg"
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 1 },
          }}
        />
        <motion.div
          className="absolute top-1/2 right-1/4 w-12 h-12 bg-pink-200/20 rounded-full blur-md"
          animate={{
            ...floatingAnimation,
            transition: { ...floatingAnimation.transition, delay: 2 },
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.div
          className="flex flex-col md:flex-row items-center gap-12 lg:gap-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* TEXT SECTION */}
          <motion.div
            className="text-center md:text-left md:w-1/2 space-y-6"
            variants={textVariants}
          >
            <motion.div
              className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <span className="text-primary font-semibold text-sm uppercase tracking-wide">
                Sweet Delights Await
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 leading-tight">
              Because Every Day{" "}
              <motion.span
                className="block bg-gradient-to-r from-primary to-yellow-500 bg-clip-text text-transparent"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Deserves Sweet.
              </motion.span>
            </h1>

            <motion.p
              className="text-xl text-gray-600 max-w-lg mx-auto md:mx-0 leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Discover our collection of artisanal treats — from limited
              editions to customer favorites, each crafted with love and the
              finest ingredients.
            </motion.p>
          </motion.div>

          {/* IMAGE SECTION */}
          <motion.div
            className="md:w-1/2 grid grid-cols-2 gap-4 lg:gap-6"
            variants={imageVariants}
          >
            {images.map((image, index) => (
              <motion.div
                key={index}
                className={`relative rounded-2xl overflow-hidden shadow-2xl ${
                  index % 3 === 0 ? "mt-8" : index === 1 ? "-mt-4" : ""
                }`}
                whileHover={{
                  scale: 1.05,
                  rotate: index % 2 === 0 ? 2 : -2,
                  transition: { duration: 0.3 },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                  hidden: {
                    opacity: 0,
                    y: 30,
                    rotate: index % 2 === 0 ? -5 : 5,
                  },
                  visible: {
                    opacity: 1,
                    y: 0,
                    rotate: 0,
                    transition: {
                      duration: 0.6,
                      delay: index * 0.1 + 0.3,
                    },
                  },
                }}
              >
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-48 md:h-60 lg:h-72 object-cover hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
