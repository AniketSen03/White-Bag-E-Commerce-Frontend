import { useContext } from "react";
import { usercontext } from "../App";
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useContext(usercontext);
  const navigate = useNavigate();

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-xl font-bold mb-4">My Wishlist</h2>

      {wishlist.length === 0 && <p>No items in wishlist</p>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {wishlist.map(item => (
          <div key={item.id} className="border p-4 rounded">
            <img src={item.image} className="h-40 w-full object-cover" />
            <h3>{item.title}</h3>
            <p>{item.price}</p>
            <button onClick={() => navigate(`/${item.category}/${item.id}`)}>
              View
            </button>
            <button onClick={() => removeFromWishlist(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
