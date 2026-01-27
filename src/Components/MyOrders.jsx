import { useContext, useEffect, useState } from "react";
import { usercontext } from "../App";
import { Link } from "react-router-dom";

const MyOrders = () => {
  const { user } = useContext(usercontext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if(!user) return;
    
    fetch(`http://localhost:3000/orders/${user._id}`)
      .then(res => res.json())
      .then(data => setOrders(data));
  }, [user]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>

      {orders.map(order => (
        <Link
          to={`/order/${order._id}`}
          key={order._id}
          className="block bg-white shadow rounded p-4 mb-4"
        >
          <div className="flex justify-between">
            <span>Order #{order._id.slice(-6)}</span>
            <span className="font-semibold text-green-600">
              {order.status}
            </span>
          </div>

          <p className="text-sm text-gray-500 mt-1">
            {new Date(order.createdAt).toDateString()}
          </p>

          <p className="font-semibold mt-2">
            ₹{order.totalAmount}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default MyOrders;
