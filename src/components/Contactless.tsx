import { Transition, Dialog } from "@headlessui/react";
import { type Parcel, ParcelStatus } from "@prisma/client";
import { Fragment, useCallback, useRef, useState, type FC } from "react";
import { BiCamera, BiXCircle } from "react-icons/bi";
import Webcam from "react-webcam";
import { api } from "~/utils/api";

type Props = {
  isOpen: boolean;
  handleCloseContactless: () => void;
  parcel: Parcel;
};

const Contactless: FC<Props> = ({ isOpen, handleCloseContactless, parcel }) => {
  const updateStatus = api.parcels.updateStatusByTrackingNumber.useMutation();
  const ref = useRef<Webcam | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const confirmDelivery = () => {
    setIsLoading(true);
    updateStatus.mutate(
      {
        trackingNumber: parcel.trackingNumber,
        status: ParcelStatus.DELIVERED,
      },
      {
        onSuccess: () => {
          handleCloseContactless();
          window.location.reload();
          setIsLoading(false);
        },
      }
    );
  };

  const captureImage = useCallback(() => {
    if (ref && ref.current) {
      const imageSrc = ref.current.getScreenshot();
      if (imageSrc) {
        void urltoFile(imageSrc, "screenshot.jpeg", "image/jpeg").then((file) =>
          setFiles((files) => [...files, file])
        );
      }
    }
  }, [ref]);

  function urltoFile(url: string, filename: string, mimeType: string) {
    return fetch(url)
      .then(function (res) {
        return res.arrayBuffer();
      })
      .then(function (buf) {
        return new File([buf], filename, { type: mimeType });
      });
  }

  const closeAndReset = () => {
    setFiles([]);
    handleCloseContactless();
  };

  if (!isOpen) {
    return <></>;
  }

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeAndReset}>
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
                  Confirming contactless delivery
                  <div className="mt-1 text-sm text-gray-600">
                    Please take photos of the parcel, unit number, and floormat
                  </div>
                </Dialog.Title>
                <div className="my-4">
                  <Webcam
                    ref={ref}
                    videoConstraints={{
                      facingMode: { exact: "environment" },
                    }}
                  />
                </div>
                <div className="flex w-full flex-wrap gap-2">
                  {files.map((file, idx) => (
                    <div
                      key={idx}
                      style={{ width: "calc(25% - 6px)" }}
                      className="relative rounded-md"
                    >
                      <img src={URL.createObjectURL(file)} alt="image" />
                      <BiXCircle
                        className="absolute top-0 right-0 z-10 cursor-pointer rounded-full bg-white text-xl text-red-500"
                        onClick={() =>
                          setFiles([
                            ...files.slice(0, idx),
                            ...files.slice(idx + 1),
                          ])
                        }
                      />
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex w-full gap-4">
                  <button
                    className="w-full rounded-md border-2 border-primary bg-white px-4 py-2 text-primary"
                    onClick={closeAndReset}
                  >
                    Cancel
                  </button>
                  <button
                    className="flex w-full items-center gap-2 whitespace-nowrap rounded-md border-2 border-primary bg-primary px-4 py-2 text-gray-1"
                    onClick={captureImage}
                  >
                    <BiCamera />
                    Take Picture
                  </button>
                </div>
                {files.length > 0 ? (
                  <button
                    className="text-md mt-4 w-full rounded-lg border-2 border-primary bg-primary py-2 px-4 text-white"
                    onClick={confirmDelivery}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading..." : "Confirm"}
                  </button>
                ) : null}
                <div className="mt-2 text-sm text-gray-600">
                  Photos will be saved to your gallery after your confirm the
                  delivery
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
export default Contactless;
