import type { Metadata } from 'next';
import LegueLanking from './component/LegueLanking';
import Transfer from './component/transfer';

export const metadata: Metadata = {
  title: '해축 이적소식',
  description: '해외축구 이적소식을 한눈에 볼 수 있는 사이트입니다.',
};

export default async function Home() {
  return (
    <main className="bg-[#f1f1f1]">
      <section
        className="bg-gray-100 min-h-screen flex items-center justify-center mt-[100px]"
        style={{
          backgroundImage: 'url(/backgroundImg.jpg)',
          backgroundSize: 'cover',
          opacity: 0.8,
        }}
      >
        <div className="max-w-2xl mx-auto p-4 flex">
          <LegueLanking />
        </div>
      </section>
      <section className="bg-[#f1f1f1] p-6 mt-4">
        <Transfer />
      </section>
      <section>
        <div className="max-w-[1280px] mx-auto">
          <h2 className="transferNews_title font-semibold font-[Caveat] text-[32px]">
            Match History
          </h2>
          {/* Match history component can be added here */}
          {/* Placeholder for match history */}
          <div className="bg-white p-4 rounded-lg shadow-md">
            <p>Match history will be displayed here.</p>
          </div>
        </div>
      </section>
      <section>
        <div className="max-w-[1280px] mx-auto p-6 flex justify-between items-center  ">
          <p className="text-gray-600">
            © 2025 Football Note. All rights reserved.
          </p>
          <div className="card">
            <span>Contact</span>

            <a className="social-link" href="#">
              <img src="/logo/github_logo.svg" />
            </a>

            <a className="social-link" href="#">
              <img src="/logo/velog_logo.svg" />
            </a>

            <a className="social-link" href="#">
              <img src="/logo/book_logo.svg" />
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
