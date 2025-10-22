import anastasia from "../assets/anastasia.jpg";
import ContactMe from "../ui/ContactMe";

function Hero() {
  return (
    <div className="hero min-h-[90vh]">
      <div className="hero-content py-10 flex-col lg:flex-row-reverse w-full xl:px-0">
        <div className="max-w-s md:max-w-md base-0 grow">
          <img src={anastasia} className="rounded-lg mb-4" />
        </div>
        <div className="base-0 grow">
          <h1 className="text-3xl sm:text-[2.75rem] leading-tight sm:leading-none font-[GolosTextWebVF] tracking-wide pb-4 font-bold text-primary">
            Мясина Анастасия Александровна
          </h1>
          <p className="text-xl pb-4 leading-normal">
            Я репетитор по&nbsp;географии{" "}
            <b>
              с&nbsp;экологическими компетенциями, действующий учитель первой
              квалификационной категории
            </b>
            . <b>Эксперт ОГЭ</b>.
          </p>
          <p className="text-xl pb-4 leading-normal">
            Помогаю ребятам <b>сдать ОГЭ на&nbsp;высокий балл</b>, а&nbsp;также
            повысить успеваемость по предмету{" "}
            <b>с&nbsp;интересом и без&nbsp;зубрежки</b>. Помогу&nbsp;увидеть
            связь географии с&nbsp;другими науками.
          </p>
          <p className="text-xl pb-4 leading-normal">
            Большой опыт подготовки к&nbsp;ОГЭ с&nbsp;нуля на высокие баллы.
            Средний балл ОГЭ: 27&nbsp;из&nbsp;31.
          </p>
          <p className="leading-normal sm:leading-none text-2xl md:text-3xl pb-6">
            Докажу, что география — это&nbsp;просто!
          </p>
          <ContactMe isPulse />
        </div>
      </div>
    </div>
  );
}

export default Hero;
