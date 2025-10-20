import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/AxiosInterceptor";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState("1");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await api.get(`products/${id}/`);
        setProduct(response.data);
      } catch (error) {
        console.error("Gagal mengambil data:", error);
      }
    }
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    const parsedQty = parseInt(quantity, 10);
    if (isNaN(parsedQty) || parsedQty < 1) {
      alert("Masukkan jumlah yang valid.");
      return;
    }

    try {
      await api.post("cart/", {
        product_id: product.id,
        quantity: parsedQty,
      });
      alert("Produk ditambahkan ke keranjang!");
      navigate("/cart");
    } catch (error) {
      console.error("Gagal menambahkan ke keranjang:", error);
      alert("Terjadi kesalahan saat menambahkan ke keranjang.");
    }
  };

  const increaseQty = () => {
    const newQty = parseInt(quantity || "1", 10) + 1;
    setQuantity(newQty.toString());
  };

  const decreaseQty = () => {
    const currentQty = parseInt(quantity || "1", 10);
    if (currentQty > 1) {
      setQuantity((currentQty - 1).toString());
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      setQuantity(value);
    }
  };

  const handleInputBlur = () => {
    const parsed = parseInt(quantity, 10);
    if (isNaN(parsed) || parsed < 1) {
      setQuantity("1");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      {product ? (
        <div className="flex flex-col md:flex-row gap-10">
          {/* Gambar Produk */}
          <div className="w-full md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded"
            />
          </div>

          {/* Detail Produk */}
          <div className="w-full md:w-1/2 flex flex-col justify-between">
            {/* Header Produk */}
            <div className="mb-4">
              <h1 className="text-2xl font-bold text-gray-900">
                {product.name}
              </h1>
              <p className="text-lg text-primary_light font-semibold mt-2">
                Rp{parseFloat(product.price).toLocaleString("id-ID")}
              </p>
              <hr className="my-4" />
              <p className="text-gray-500 text-sm">{product.description}</p>
            </div>

            {/* Input Quantity + Tombol */}
            <div className="flex flex-col gap-4 mt-6">
              {/* Jumlah dan tombol Add */}
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={decreaseQty}
                    className="px-3 py-2 text-lg font-bold hover:bg-gray-100"
                  >
                    −
                  </button>
                  <input
                    type="text"
                    value={quantity}
                    onChange={handleInputChange}
                    onBlur={handleInputBlur}
                    className="w-12 text-center outline-none"
                  />
                  <button
                    onClick={increaseQty}
                    className="px-3 py-2 text-lg font-bold hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-amber-900 hover:bg-amber-800 text-white py-3 px-6 font-semibold rounded"
                >
                  ADD TO CART
                </button>
              </div>

              {/* Tombol Buy Now */}
              <button className="w-full bg-black hover:bg-gray-800 text-white font-semibold py-3 rounded">
                BUY IT NOW
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-center">Loading...</p>
      )}
    </div>
  );
}
