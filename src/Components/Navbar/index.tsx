function Navbar() {
  return (
    <header className="min-w-[1000px]">
      <div className="flex bg-TK-background text-white h-[60px]">
        <div className="flex items-center m-4">
          <div className="flex pr-3 pl-3">
            <div className="mt-7 text-xs xl:text-sm font-bold">
              Connect with me on
            </div>
          </div>
          <a target="_blank" href={'https://www.linkedin.com/in/sagargiri07'}>
            <div className="flex pr-3 pl-3">
              <div className="mt-7 text-xs xl:text-sm font-bold">Linkedin</div>
            </div>
          </a>
          <a target="_blank" href={'https://www.twitter.com/sagargiri1707'}>
            <div className="flex pr-3 pl-3">
              <div className="mt-7 text-xs xl:text-sm font-bold">Twitter</div>
            </div>
          </a>
        </div>
        <div className="flex pr-3 pl-3 absolute right-0">
          <div className="mt-7 text-xs xl:text-sm font-bold">Sagar Giri</div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
