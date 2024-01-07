import { useState } from "react";
import { Carousel } from "flowbite-react";
import cn from "classnames";
import reviews from "../assets/reviews";

function Reviews() {
  const [images, setImages] = useState<string[]>(reviews[0].images);
  const [currentId, setCurrentId] = useState<string | null>(reviews[0].id);

  return (
    <section className="py-10 px-4">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-4xl font-bold mb-5 text-center">Отзывы</h2>
        <div className="max-w-md grid grid-cols-4 gap-5 mx-auto">
          {reviews.map((review) => (
            <button
              key={review.id}
              className="avatar placeholder"
              onClick={() => {
                if (currentId === review.id) {
                  setCurrentId(null);
                } else {
                  setImages(review.images);
                  setCurrentId(review.id);
                }
              }}
            >
              <div
                className={cn(
                  "rounded-full",
                  "ring",
                  "ring-secondary",
                  "bg-primary",
                  "text-primary-content",
                  {
                    "!ring-accent": review.id === currentId,
                  },
                  "transition-all",
                  "ring-offset-base-100",
                  "ring-offset-2",
                  "w-full"
                )}
              >
                {review.icon ? <review.icon size={50} /> : null}
              </div>
            </button>
          ))}
        </div>
        <div
          className={cn(
            "max-w-md",
            "mt-4",
            "mx-auto",
            "overflow-hidden",
            "transition-all",
            "duration-300",
            "max-h-0",
            {
              "max-h-screen	": currentId,
            }
          )}
        >
          <div className="max-w-md aspect-[9/16]">
            <Carousel pauseOnHover>
              {images.map((image) => (
                <img src={image} alt="..." key={image} />
              ))}
            </Carousel>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Reviews;
