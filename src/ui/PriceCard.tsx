import { IoClose } from "react-icons/io5";
import cn from "classnames";
import ContactMe from "./ContactMe";

export type TPricing = {
  id: string | number;
  type?: "secondary" | "primary" | "accent";
  img?: {
    src: string;
    alt?: string;
  };
  title: string;
  description: string;
  priceFrom?: number;
  price?: number;
  more?: string;
};

function PriceCard(info: TPricing) {
  return (
    <div
      className={cn("card", {
        "bg-primary": info.type === "primary",
        "bg-secondary": info.type === "secondary",
        "bg-accent": info.type === "accent" || !info.type,
        "text-primary-content": info.type === "primary",
        "text-secondary-content": info.type === "secondary",
        "text-accent-content": info.type === "accent" || !info.type,
      })}
    >
      {info.img ? (
        <figure>
          <img src={info.img.src} alt={info.img.alt || ""} />
        </figure>
      ) : null}
      <div className="card-body">
        <h2
          className="card-title"
          dangerouslySetInnerHTML={{ __html: info.title }}
        />
        <div
          className="priceCardDescription"
          dangerouslySetInnerHTML={{ __html: info.description }}
        />
        <div className="card-actions justify-between items-center mt-auto">
          {info.priceFrom ? (
            <p className="text-3xl font-mono">от {info.priceFrom}₽</p>
          ) : null}
          {info.price ? (
            <p className="text-3xl font-mono">{info.price}</p>
          ) : null}
          {info.more ? (
            <>
              <button
                className="btn btn-warning"
                onClick={() => {
                  const dialog = document.getElementById(info.id.toString()) as
                    | undefined
                    | HTMLDialogElement;
                  if (dialog) dialog.showModal();
                }}
              >
                Узнать больше
              </button>
              <dialog
                id={info.id.toString()}
                className="modal modal-bottom sm:modal-middle"
              >
                <div className="modal-box bg-neutral text-neutral-content">
                  <div
                    className="priceCardDescription"
                    dangerouslySetInnerHTML={{ __html: info.more }}
                  />
                  <div className="modal-action w-full flex gap-3 justify-between items-center">
                    <ContactMe />
                    <form method="dialog">
                      <button className="btn btn-circle btn-accent">
                        <IoClose size={30} />
                      </button>
                    </form>
                  </div>
                </div>
              </dialog>
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default PriceCard;
