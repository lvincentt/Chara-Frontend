import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/AxiosInterceptor";

export default function OrderDetail() {
  const { state } = useLocation();
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("transfer");

  useEffect(() => {
    const fetchPreview = async () => {
      try {
        const selectedIds = state?.items?.map((item) => item.id);
        const res = await api.post("checkout/", {
          selected_ids: selectedIds,
        });
        setPreview(res.data);
      } catch (err) {
        console.error("Gagal fetch preview", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPreview();
  }, [state]);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Di sini kamu bisa kirim data ke backend
    console.log("Alamat:", address);
    console.log("Metode Pembayaran:", paymentMethod);
  };

  if (loading || !preview)
    return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-6">Rincian Pesanan</h1>

      <div className="grid grid-cols-1 gap-6 mb-8">
        {preview.items.map((item, index) => (
          <div
            key={index}
            className="flex items-center border p-4 rounded-lg shadow-sm"
          >
            <img
              src={`http://localhost:8000${item.image}`}
              alt={item.product_name}
              className="w-24 h-24 object-cover rounded-md mr-4"
            />
            <div>
              <h2 className="text-lg font-semibold">{item.product_name}</h2>
              <p>Jumlah: {item.quantity}</p>
              <p>Harga: Rp {item.price.toLocaleString()}</p>
              <p className="font-medium">
                Subtotal: Rp {item.subtotal.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-right text-xl font-bold mb-6">
        Total: Rp {preview.total_price.toLocaleString()}
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Alamat Pengiriman
          </label>
          <textarea
            required
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full border rounded-md p-2"
            rows={3}
            placeholder="Masukkan alamat lengkapmu..."
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Metode Pembayaran
          </label>
          <select
            required
            value={paymentMethod}
            onChange={(e) => setPaymentMethod(e.target.value)}
            className="w-full border rounded-md p-2"
          >
            <option value="transfer">Transfer Bank</option>
            <option value="cod">Bayar di Tempat (COD)</option>
            <option value="ewallet">E-Wallet (OVO, GoPay, dll)</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-primary text-white py-2 px-4 rounded hover:bg-primary_light transition duration-200"
        >
          Bayar Sekarang
        </button>
      </form>
    </div>
  );
}
