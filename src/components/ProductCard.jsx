import { useContext } from "react";
import { CartContext } from "../context/CartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useContext(CartContext);

  const hasDiscount =
    product.discounted_price &&
    parseFloat(product.discounted_price) < parseFloat(product.price);

  const handleCart = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Mencegah event bubbling ke parent card

    const success = await addToCart(product.id, 1);
    if (success) {
      alert("Berhasil ditambahkan ke keranjang!");
    } else {
      alert("Gagal menambahkan ke keranjang.");
    }
  };

  return (
    <div className="group cursor-pointer bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100">
      {/* Image Container */}
      <div className="relative w-full aspect-square bg-gray-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded-full">
            SALE
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <h3 className="font-medium text-gray-900 text-sm leading-tight line-clamp-2 min-h-[2.5rem]">
          {product.name}
        </h3>

        <div className="flex items-center justify-between">
          <div className="flex flex-col">
            {hasDiscount ? (
              <>
                <span className="text-xs text-gray-400 line-through">
                  Rp{parseFloat(product.price).toLocaleString("id-ID")}
                </span>
                <span className="text-lg font-bold text-gray-900">
                  Rp
                  {parseFloat(product.discounted_price).toLocaleString("id-ID")}
                </span>
              </>
            ) : (
              <span className="text-lg font-bold text-gray-900">
                Rp{parseFloat(product.price).toLocaleString("id-ID")}
              </span>
            )}
          </div>

          <button
            onClick={handleCart}
            className="bg-primary hover:bg-primary_light text-white p-2 rounded-lg transition-colors duration-200 group-hover:shadow-md"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 3h2l.4 2M7 13h10l4-8H5.4m2.6 8L6 5H3m4 8v6a2 2 0 002 2h8a2 2 0 002-2v-6"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
