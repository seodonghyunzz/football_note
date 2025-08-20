export default function Header() {
  return (
    <header className=" text-black p-4 bg-white h-24 flex items-center fixed top-0 left-0 right-0 z-10 shadow-md">
      <div className="flex-1"></div>
      <div className="max-w-2xl mx-auto flex flex-col items-center flex-1">
        <h1 className="text-3xl font-bold">
          <img src="/logo/white_logo.svg" width={120} />
        </h1>
      </div>
      <div className="flex-1">
        <nav className="flex justify-end space-x-4 font-[dongle] text-[30px]">
          <a href="/" className="">
            순위표
          </a>
          <a href="/" className="">
            이적 소식
          </a>
          <a href="/" className="">
            최근 경기
          </a>
        </nav>
      </div>
    </header>
  );
}
