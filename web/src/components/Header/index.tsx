import Logo from "../Logo";

export default function Header() {
  return (
    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8 flex items-center">
      <Logo className={"mr-3"} width={48} height={48} />
      brev.ly
    </h1>
  )
}
