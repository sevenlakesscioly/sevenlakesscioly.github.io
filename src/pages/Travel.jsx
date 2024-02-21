import { Router } from "react-router-dom";
import Link from "../components/Link";

export default function ContactPage(props) {
  return (
    <div className="min-h-[100vh] w-full bg-sky-950">
      <div className="min-h-[50vh] w-full flex flex-row items-center align-middle justify-center bg-blue-500/25">
        <h2 className="font-bold text-[76px] font-serif text-white p-10">
          Travel
        </h2>
      </div>
      <ul className="text-gray-300 font-serif p-10">
        <li>
          <ClickablePDF
            src="/Preliminary itinerary24.pdf"
            title="Tarleton Schedule"
          ></ClickablePDF>
        </li>
        <li>
          Official Email: <Link>slhs.scioly@gmail.com</Link>
        </li>
      </ul>
    </div>
  );
}

function ClickablePDF({ src, title }) {
  return (
    <div className="items-center content-center w-full flex flex-row justify-center align-middle">
      <a href={src}>
        <object
          className="w-[50vw] h-[70vw]"
          data={src}
          aria-label={title}
        ></object>
      </a>
    </div>
  );
}
