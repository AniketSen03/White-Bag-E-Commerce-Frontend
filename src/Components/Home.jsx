import React from "react";
import Men from "./Men";
import Women from "./Women";
import Kid from "./Kid";
import Electronic from "./Electronic";
import Furniture from "./Furniture";

const Section = ({ title, children }) => (
  <section className="max-w-7xl mx-auto px-4 py-10">
    <h2 className="text-2xl font-bold mb-6">{title}</h2>
    {children}
  </section>
);

const Home = () => {
  return (
    <div className="space-y-10">
        <Men />
      {/* <Section title="Men Collection">
      </Section> */}

        <Women />
      {/* <Section title="Women Collection">
      </Section> */}

        <Kid />
      {/* <Section title="Kids Collection">
      </Section> */}

        <Electronic />
      {/* <Section title="Electronics">
      </Section> */}

        <Furniture />
      {/* <Section title="Furniture">
      </Section> */}
    </div>
  );
};

export default Home;
