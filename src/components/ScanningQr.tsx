import { type FC, useState } from "react";
import { BiX } from "react-icons/bi";
import { QrReader } from "react-qr-reader";

type Props = {
  isOpen: boolean;
  handleCloseScanQr: () => void;
  handleScan: (result: any) => void;
};

const ScanningQr: FC<Props> = ({ isOpen, handleCloseScanQr, handleScan }) => {
  const [error, setError] = useState("");

  if (!isOpen) {
    return <></>;
  }

  return (
    <div className="fixed top-0 left-0 z-50 flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background px-6">
      <BiX
        className="absolute top-6 right-6 z-[60] cursor-pointer text-3xl text-primary"
        onClick={handleCloseScanQr}
      />
      <div className="w-full">
        <QrReader
          constraints={{ facingMode: "environment" }}
          onResult={(result) => {
            if (!result) {
              return;
            }
            //TODO:
            const isValidTrackingNumber = result.getText()[0] === "T";
            if (isValidTrackingNumber) {
              handleScan(result.getText());
            } else {
              setError("That is not a valid Tracking Number");
            }
          }}
        />
      </div>
      <div className={!Boolean(error) ? "invisible" : "visible text-red-600"}>
        {Boolean(error) ? error : "text"}
      </div>
    </div>
  );
};
export default ScanningQr;
