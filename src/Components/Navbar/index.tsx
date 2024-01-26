import { Link } from "react-router-dom";
import { withErrorBoundary } from "../../HOC/errorBoundaryHoc";

function Navbar() {
  return (
    <header >
      <div className="flex bg-TK-background text-white h-[60px] items-center justify-between	">
        <div className="flex items-center m-4">
        <Link to={"/"}>
            <div className="flex pr-3 pl-3">
              <div className="mt-7 text-xs xl:text-sm font-bold">Home</div>
            </div>
          </Link>
          {undefined["a"]}

          <Link to={"/architecture"}>
            <div className="flex pr-3 pl-3">
              <div className="mt-7 text-xs xl:text-sm font-bold">Architecture</div>
            </div>
          </Link>
          <Link to={"/testcase"}>

            <div className="flex pr-3 pl-3">
              <div className="mt-7 text-xs xl:text-sm font-bold">Test case</div>
            </div>
        </Link>
        </div>
        <div className="flex pr-3 pl-3">
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
      </div>
    </header>
  );
}

export default withErrorBoundary('Navbar',Navbar);