import Link from "../components/Link";

export default function OtherPage(props) {
  return (
    <div className="min-h-[200vh] w-screen bg-sky-950 pt-10">
      <div className="w-full bg-blue-500/35 flex flex-row justify-center align-middle items-center">
        <h2 className="font-bold text-[54px] text-white p-10">
          Other Resources
        </h2>
      </div>

      <ul className="m-20 text-white/80 leading-10 text-left list-disc">
        <li>
          Fermi tool - Andy Li:{" "}
          <Link href="https://landy8697.github.io/open-scioly-fermi/">
            landy8697.github.io/open-scioly-fermi
          </Link>
        </li>
        <li>
          Fermi tool - Jonathan Yang:{" "}
          <Link href="https://jzhyang1.github.io/fermi.html">
            jzhyang1.github.io/fermi.html
          </Link>
        </li>
        <li>
          Fermi textbook:{" "}
          <Link href="https://web.mit.edu/6.055/book/book.pdf">
            web.mit.edu/6.055/book/book.pdf
          </Link>
        </li>
      </ul>
    </div>
  );
}
