function Navbar() {
  return (
    <header >
      <div className="flex bg-TK-background text-white h-[60px] items-center justify-between	">
        <div className="flex items-center m-4">
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
        <div className="flex pr-3 pl-3">
          <div className="mt-7 text-xs xl:text-sm font-bold">Sagar Giri</div>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
