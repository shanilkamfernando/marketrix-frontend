import Image from "next/image";

function NotAvailble({ loading, messageOveraly, position }) {
  return (
    <>
      {loading && (
        <div
          className={`absolute flex top-0 bottom-0 z-50 bg-opacity-60  items-center justify-center ${position}`}
        >
          {/* <Loading />  */}
          <div className="flex flex-col items-center justify-center bg-white p-2 rounded-lg">
            <div className="flex flex-row gap-1 items-center pb-1">
              <div>
                <Image
                  src="../../../../images/mainLogoBlack.svg"
                  width={32}
                  height={32}
                  alt=""
                />
              </div>

              <div className="font-bold mtx-h6">markertix</div>
            </div>
            <div className="flex items-center justify-center mtx-label !font-medium">
              {messageOveraly}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default NotAvailble;
