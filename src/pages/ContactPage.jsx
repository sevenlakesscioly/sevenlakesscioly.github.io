import Link from "../components/Link";

export default function ContactPage(props) {
  return (
    <div className="min-h-[100vh] w-screen bg-sky-950">
      <div className="min-h-[50vh] w-screen flex flex-row items-center align-middle justify-center bg-blue-500/25">
        <h2 className="font-bold text-[76px] font-serif text-white p-10">
          Contact
        </h2>
      </div>
      <ul className="text-gray-300 font-serif p-10">
        <li>
          Official Team Website:{" "}
          <Link href="http://sevenlakesscioly.wordpress.com">
            sevenlakesscioly.wordpress.com
          </Link>
        </li>
        <li>
          Official Email: <Link>slhs.scioly@gmail.com</Link>
        </li>
      </ul>
    </div>
  );
}
