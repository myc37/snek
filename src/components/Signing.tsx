import { Transition, Dialog } from "@headlessui/react";
import { Fragment, useEffect, useState, type FC } from "react";
import SignaturePad from "signature_pad";

type Props = { isOpen: boolean; handleCloseSigning: () => void };

const Signing: FC<Props> = ({ isOpen, handleCloseSigning }) => {
  const [signaturePad, setSignaturePad] = useState<SignaturePad | null>(null);

  useEffect(() => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const signaturePad = new SignaturePad(canvas);
      setSignaturePad(signaturePad);
    }
  }, [isOpen]);

  const clearSignaturePad = () => {
    signaturePad?.clear();
  };

  const confirmDelivery = () => {
    //TODO:
    handleCloseSigning();
  };

  if (!isOpen) {
    return <></>;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={handleCloseSigning}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-background bg-opacity-100" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="pt-18 w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-bold leading-6 text-gray-900"
                >
                  Confirming in-person delivery
                </Dialog.Title>
                <canvas className="my-4 w-full rounded-md border-2 border-secondary bg-white" />
                <div className="flex w-full gap-4">
                  <button
                    className="w-full rounded-md border-2 border-primary bg-white px-4 py-2 text-primary"
                    onClick={clearSignaturePad}
                  >
                    Reset
                  </button>
                  <button
                    className="w-full rounded-md border-2 border-primary bg-primary px-4 py-2 text-gray-1"
                    onClick={confirmDelivery}
                  >
                    Confirm
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default Signing;
