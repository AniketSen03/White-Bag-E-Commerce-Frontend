import { Link } from 'react-router-dom';

export default function About() {
  return (
    <div className="container-x max-w-2xl py-10">
      <h1 className="text-3xl font-bold">About White Bag</h1>
      <div className="mt-4 space-y-4 text-ink-soft">
        <p>White Bag is a store for everyday clothes, ethnic wear, electronics and furniture, built to make it easy to find the right thing without scrolling through endless pages.</p>
        <p>Type what you want the way you would say it to a shopkeeper, for example “blue kurta under ₹2000”. Our search understands the sentence, and the assistant can suggest products when you are not sure what to pick.</p>
        <p>This is a demo store. Orders are saved, but no real payments are taken.</p>
      </div>
      <Link to="/shop" className="btn-primary mt-6">Start shopping</Link>
    </div>
  );
}
