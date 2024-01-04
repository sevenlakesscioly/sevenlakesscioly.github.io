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
        <li>
          Code tools/resources:{" "}
          <Link href="https://toebes.com/codebusters/">
            toebes.com/codebusters
          </Link>
        </li>
        <li>
          Code taker:{" "}
          <Link href="https://codetaker.web.app/">codetaker.web.app</Link>
        </li>
        <li>
          Code builder:{" "}
          <Link href="https://discord.gg/rvB4aRYhDG">Discord</Link>
        </li>
        <li>
          Code cryptograms:{" "}
          <Link href="https://cryptograms.puzzlebaron.com/">
            cryptograms.puzzlebaron.com
          </Link>
        </li>
        <li>
          Code cryptoduel:{" "}
          <Link href="https://r2dev2.github.io/cryptoduel/">
            r2dev2.github.io/cryptoduel
          </Link>
        </li>
        <li>
          Code patristos (Ashley Yang + Aidan Lai):{" "}
          <Link href="https://docs.google.com/document/d/1UhZjoFvXGk1eWGQ0VZa7cEE_dAjLU0XKDfYq8EvDiFI/edit">
            docs
          </Link>
        </li>
      </ul>
    </div>
  );
}
