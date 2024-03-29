import { BrowserView, MobileView } from "react-device-detect";
import Image from "./components/Image";
import Link from "./components/Link";
import HamburgerMenu from "./components/HamburgerMenu";

const pages = [
  {
    name: "Home",
    url: "/",
  },
  {
    name: "Travel",
    url: "/travel",
  },
  {
    name: "Tests",
    url: "/tests",
  },
  {
    name: "Notes",
    url: "/notes",
  },
  {
    name: "Other Resources",
    url: "/other",
  },
  {
    name: "Contact",
    url: "/contact",
  },
];

function LinkButton({ name, url }) {
  return (
    <Link
      className="md:bg-black hover:opacity-50 px-[10px] py-[5px] text-xs md:text-sm text-black md:text-white rounded-lg md:rounded-xl"
      href={url}
    >
      {name}
    </Link>
  );
}

export default function Navbar({ title }) {
  return (
    <nav className="fixed shadow-lg">
      <div className="w-screen flex flex-row justify-between items-center bg-blue-600">
        <div className="flex flex-row items-center gap-1 md:gap-3">
          <Link href="/">
            <Image src="/logo.png" alt="logo" className="h-[48px]" />
          </Link>
          <h1>{title}</h1>
        </div>
        <MobileView>
          <div className="mx-[10px] my-auto">
            <HamburgerMenu>
              {pages.map((page, key) => (
                <LinkButton {...page} key={key} />
              ))}
            </HamburgerMenu>
          </div>
        </MobileView>
        <BrowserView>
          <div className="flex my-auto mx-[10px] gap-2">
            {pages.map((page, key) => (
              <LinkButton {...page} key={key} />
            ))}
          </div>
        </BrowserView>
      </div>
    </nav>
  );
}
