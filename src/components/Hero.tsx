import anastasia from "../assets/anastasia.jpg";
import ContactMe from "../ui/ContactMe";

function Hero() {
  return (
    <div className="hero min-h-[90vh]">
      <div className="hero-content flex-col lg:flex-row-reverse w-full md:px-0">
        <div className="max-w-s md:max-w-md base-0 grow">
          <img src={anastasia} className="rounded-lg mb-4" />
        </div>
        <div className="base-0 grow">
          <h1 className="text-5xl pb-8 font-bold text-primary">
            Мясина Анастасия
          </h1>
          <p className="text-xl pb-4">
            Я репетитор по&nbsp;географии{" "}
            <b>
              с&nbsp;экологическими компетенциями, действующий учитель первой
              квалификационной категории
            </b>
            . Помогаю ребятам <b>сдать ОГЭ на&nbsp;высокий балл</b>,
            а&nbsp;также повысить успеваемость по предмету{" "}
            <b>с&nbsp;интересом и без&nbsp;зубрежки</b>. Помогу&nbsp;увидеть
            связь географии с&nbsp;другими науками.
          </p>
          <p className="text-2xl md:text-3xl pb-4">
            Докажу, что география — это&nbsp;просто!
          </p>
          <ContactMe isPulse />
        </div>
      </div>
    </div>
  );
}

export default Hero;
