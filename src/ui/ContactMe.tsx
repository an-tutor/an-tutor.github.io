import cn from "classnames";
import { FaTelegramPlane } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
// import { RiInstagramFill } from "react-icons/ri";

type TContactMe = {
  isPulse?: boolean;
  wrapperClassName?: string;
};

function ContactMe({ isPulse, wrapperClassName }: TContactMe) {
  return (
    <div
      className={cn(
        "relative",
        "flex",
        "justify-center",
        "gap-3",
        "w-max",
        "px-4",
        "py-3",
        "rounded-full",
        wrapperClassName
      )}
    >
      <a
        className="btn btn-circle"
        href="https://t.me/a_miasina"
        target="_blank"
      >
        <FaTelegramPlane size={30} />
      </a>
      <a
        className="btn btn-circle"
        href="https://wa.me/79969600749"
        target="_blank"
      >
        <IoLogoWhatsapp size={30} />
      </a>
      {/* <a
        className="btn btn-circle"
        href="https://www.instagram.com/an.tutor"
        target="_blank"
      >
        <RiInstagramFill size={30} />
      </a> */}
      <a
        className="btn btn-circle p-1"
        href="https://profi.ru/profile/MyasinaAA2"
        target="_blank"
      >
        <svg
          width="120"
          height="24"
          viewBox="0 0 120 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.3802 23.5633V0.436768H0V23.5633H4.77614V5.09715H13.604V23.5633H18.3802Z"
            fill="currentColor"
          />
          <path
            d="M37.8417 14.6477C39.2835 13.1515 40.0781 11.0204 40.0781 8.65076C40.0781 3.7378 36.777 0.436768 31.8641 0.436768H22.3398V23.5633H27.116V17.0103H31.8641C34.2863 17.0103 36.3543 16.193 37.8417 14.6477ZM27.116 12.4078V5.03751H31.6606C33.8022 5.03751 35.1844 6.47755 35.1844 8.70864C35.1844 10.9555 33.8005 12.4078 31.6606 12.4078H27.116Z"
            fill="currentColor"
          />
          <path
            d="M119.75 23.5633V0.436768H114.993L104.368 16.9332L105.331 16.8647V0.436768H100.612V23.5633H105.369L116.342 6.51087L115.032 6.88798V23.5633H119.75Z"
            fill="currentColor"
          />
          <path
            d="M54.1787 0C50.9057 0 47.8731 1.22956 45.642 3.4624C43.4091 5.69524 42.1796 8.72791 42.1796 12.0009C42.1796 15.2738 43.4091 18.3065 45.642 20.5394C47.8748 22.7722 50.9075 24.0018 54.1787 24.0018C57.4517 24.0018 60.4843 22.7722 62.7172 20.5394C64.95 18.3065 66.1796 15.2738 66.1796 12.0009C66.1796 8.72791 64.95 5.69524 62.7172 3.4624C60.4843 1.22956 57.4517 0 54.1787 0ZM54.1787 19.3694C50.1778 19.3694 47.0417 16.1315 47.0417 12.0009C47.0417 7.8702 50.1761 4.63232 54.1787 4.63232C58.1813 4.63232 61.3157 7.8702 61.3157 12.0009C61.3157 16.1315 58.1796 19.3694 54.1787 19.3694Z"
            fill="currentColor"
          />
          <path
            d="M94.7725 18.652C96.5879 16.8823 97.5894 14.4477 97.5894 11.7957C97.5894 9.13484 96.5896 6.69151 94.7725 4.91471C92.9255 3.10809 90.3401 2.11357 87.4951 2.11357H85.4359V0H80.8545V2.11357H78.7479C75.903 2.11357 73.3176 3.10809 71.4706 4.91471C69.6552 6.68976 68.6537 9.13484 68.6537 11.7957C68.6537 14.4477 69.6535 16.8823 71.4706 18.652C73.3176 20.4517 75.903 21.4427 78.7479 21.4427H80.8545V24H85.4359V21.4427H87.4951C90.3401 21.4427 92.9238 20.4517 94.7725 18.652ZM80.8527 16.8647H78.534C75.5802 16.8647 73.5158 14.781 73.5158 11.7957C73.5158 8.81035 75.5785 6.72659 78.534 6.72659H80.8527V16.8647ZM85.4342 6.72659H87.7074C90.6611 6.72659 92.7256 8.81035 92.7256 11.7957C92.7256 14.781 90.6629 16.8647 87.7074 16.8647H85.4342V6.72659Z"
            fill="currentColor"
          />
        </svg>
      </a>
      <div
        className={cn(
          "absolute",
          "-z-10",
          "w-full",
          "h-full",
          "top-0",
          "left-0",
          "rounded-full",
          "bg-secondary",
          {
            "animate-pulse": isPulse,
          },
          "hover:animate-none"
        )}
      />
    </div>
  );
}

export default ContactMe;
