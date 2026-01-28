import { useContext } from "react";
import { usercontext } from "../App";

const MyOrders = () => {
  const { orders } = useContext(usercontext);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">My Orders</h2>

      {orders.length === 0 && <p>No orders yet</p>}

      {orders.map(order => (
        <div key={order.id} className="border p-4 mb-4">
          <p>Date: {order.date}</p>
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.total}</p>
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
