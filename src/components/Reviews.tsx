import { Carousel } from "flowbite-react";

function Reviews() {
  return (
    <div className="h-80 max-w-screen-xl mx-auto">
      <h2 className="text-3xl font-semibold mb-5">Отзывы</h2>
      <Carousel indicators={false} leftControl="left" rightControl="right">
        <div>
          <div className="chat-end mx-auto max-w-sm">
            <div className="chat-bubble">You underestimate my power!</div>
          </div>
        </div>
        <div>
          <div className="chat-end mx-auto max-w-sm md:max-w-md">
            <div className="chat-bubble">
              Lorem ipsum dolor sit, amet consectetur adipisicing elit.
              Voluptatibus fugiat minima quod nesciunt pariatur explicabo. Sit
              quos iusto tempore! Expedita sapiente asperiores ipsum at ipsam
              tempore vero libero eum perferendis?
            </div>
          </div>
        </div>
        <div>
          <div className="chat-end mx-auto max-w-sm">
            <div className="chat-bubble">You underestimate my power!</div>
          </div>
        </div>
        <div>
          <div className="chat-end mx-auto max-w-sm">
            <div className="chat-bubble">You underestimate my power!</div>
          </div>
        </div>
      </Carousel>
    </div>
  );
}

export default Reviews;
