import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../api/AxiosInterceptor";
import ProductCard from "../components/ProductCard";
import Hero from "../components/Hero";
import Footer from "../components/Footer";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState("limited");

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        let endpoint = "products/";
        if (filter === "best") endpoint += "?is_best_seller=true";
        else if (filter === "limited") endpoint += "?is_limited_edition=true";
        else if (filter === "staff") endpoint += "?is_staff_picks=true";

        const response = await api.get(endpoint);
        setProducts(response.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
      setLoading(false);
    }
    fetchProducts();
  }, [filter]);

  const filterOptions = [
    { label: "Limited Edition", value: "limited" },
    { label: "Best Sellers", value: "best" },
    { label: "Staff Picks", value: "staff" },
  ];

  return (
    <div>
      <Hero />
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-semibold text-gray-900">Our Products</h2>
          <div className="mt-6 flex justify-center gap-3 flex-wrap">
            {filterOptions.map((option) => (
              <button
                key={option.value}
                className={`px-4 py-2 rounded-full text-sm border transition duration-200 ${
                  filter === option.value
                    ? "bg-primary text-white border-primary"
                    : "border-gray-300 text-gray-700 hover:border-black hover:text-black"
                }`}
                onClick={() => setFilter(option.value)}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading products...</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <Link to={`/${product.id}`} key={product.id}>
                <ProductCard product={product} />
              </Link>
            ))}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
