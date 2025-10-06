import React from "react";

const Home = () => {
  return (
    <section className="bg-[#0e1525] text-white py-20 px-6 md:px-16">
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h2 className="text-3xl md:text-4xl font-bold leading-snug">
          Do you want to{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-400">
            generate more traffic
          </span>{" "}
          to your website? We know the solution.
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center">
        {/* Card 1 */}
        <div className="bg-[#151e2e] p-8 rounded-2xl max-w-sm w-full text-center border border-transparent hover:border-blue-500 transition-all shadow-lg">
          <div className="text-purple-400 text-4xl mb-4">🧪</div>
          <h3 className="font-bold text-lg mb-2">Analytics and Research</h3>
          <p className="text-sm text-gray-400">
            We also provide tangible results and measurable long-term value business.
          </p>
        </div>

        {/* Card 2 */}
        <div className="bg-[#151e2e] p-8 rounded-2xl max-w-sm w-full text-center border border-transparent hover:border-blue-500 transition-all shadow-lg">
          <div className="text-blue-400 text-4xl mb-4">✏️</div>
          <h3 className="font-bold text-lg mb-2">Copywriting</h3>
          <p className="text-sm text-gray-400">
            We also provide tangible results and measurable long-term value business.
          </p>
        </div>

        {/* Card 3 */}
        <div className="bg-[#151e2e] p-8 rounded-2xl max-w-sm w-full text-center border border-transparent hover:border-blue-500 transition-all shadow-lg">
          <div className="text-yellow-400 text-4xl mb-4">💰</div>
          <h3 className="font-bold text-lg mb-2">Sales growth</h3>
          <p className="text-sm text-gray-400">
            We also provide tangible results and measurable long-term value business.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Home;
