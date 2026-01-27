import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const OrderDetails = () => {
  const { id } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/orders/detail/${id}`)
      .then(res => res.json())
      .then(data => setOrder(data));
  }, []);

  if (!order) return null;

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Order Details</h2>

      <div className="bg-white p-4 rounded shadow mb-4">
        <p>Status: <b>{order.status}</b></p>
        <p>Payment: {order.paymentMethod}</p>
        <p>Total: ₹{order.totalAmount}</p>
      </div>

      {order.items.map((i, idx) => (
        <div key={idx} className="flex gap-4 bg-white p-4 mb-3 shadow rounded">
          <img src={i.image} className="w-20 h-20 object-cover" />
          <div>
            <h4 className="font-semibold">{i.title}</h4>
            <p>₹{i.price}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderDetails;
