import { useContext } from "react";
import { ModalContext } from "../../App";
import Modal from "../Modal";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Header() {
  const [modal, setModal] = useContext(ModalContext);

  return (
    <header className="flex justify-between bg-gray-800 text-white px-4 py-6">
      <h1 className="text-3xl font-bold mx-2">TODO</h1>
      <button
        className="px-2 py-2 bg-orange-600 rounded-md"
        onClick={() => setModal({...modal, open: !modal.open})}
    >
        <FontAwesomeIcon icon={faPlus} className="mx-2" />
      </button>
    </header>
  );
}

export default Header;
