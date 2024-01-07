import { FaUniversity } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";

function EducationAndExperience() {
  return (
    <section className="py-10 px-4 bg-base-200">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-bold mb-5">Образование и опыт</h2>
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical pl-4 md:pl-0">
          <li>
            <div className="timeline-start md:text-end mb-10 z-10">
              <div className="flex flex-row-reverse md:flex-row gap-3 justify-end bg-secondary w-max -mt-2 -ml-6 mr-auto md:ml-auto md:-mr-6 px-2 pt-1 rounded-lg text-secondary-content">
                <time className="font-mono">2015-2019</time>
                <FaUniversity size={20} />
              </div>
              <p className="text-lg">
                НИ&nbsp;МГУ&nbsp;им.&nbsp;Н.П.&nbsp;Огарева, географический
                факультет, экология и природопользование, бакалавр
              </p>
            </div>
            <hr />
          </li>
          <li>
            <div className="timeline-end mb-10 z-10">
              <div className="flex flex-row-reverse gap-3 justify-end bg-primary w-max -mt-2 -ml-6 px-2 pt-1 rounded-lg text-primary-content">
                <time className="font-mono">2017-2018</time>
                <GiTeacher size={20} />
              </div>
              <p className="text-lg">
                Лаборант кафедры «Экология и природопользование»
                НИ&nbsp;МГУ&nbsp;им.&nbsp;Н.П.&nbsp;Огарева
              </p>
            </div>
            <hr />
          </li>
          <li>
            <div className="timeline-end mb-10 z-10">
              <div className="flex flex-row-reverse gap-3 justify-end bg-primary w-max -mt-2 -ml-6 px-2 pt-1 rounded-lg text-primary-content">
                <time className="font-mono">С 2018</time>
                <GiTeacher size={20} />
              </div>
              <p className="text-lg">Репетитор</p>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start md:text-end mb-10 z-10">
              <div className="flex flex-row-reverse md:flex-row gap-3 justify-end bg-secondary w-max -mt-2 -ml-6 mr-auto md:ml-auto md:-mr-6 px-2 pt-1 rounded-lg text-secondary-content">
                <time className="font-mono">2018-2019</time>
                <FaUniversity size={20} />
              </div>
              <p className="text-lg">
                НИ&nbsp;МГУ&nbsp;им.&nbsp;Н.П.&nbsp;Огарева, профессиональная
                переподготовка, педагог
              </p>
            </div>
            <hr />
          </li>
          <li>
            <div className="timeline-end mb-10 z-10">
              <div className="flex flex-row-reverse gap-3 justify-end bg-primary w-max -mt-2 -ml-6 px-2 pt-1 rounded-lg text-primary-content">
                <time className="font-mono">С 2019</time>
                <GiTeacher size={20} />
              </div>
              <p className="text-lg">Школа, учитель географии</p>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start md:text-end mb-10 z-10">
              <div className="flex flex-row-reverse md:flex-row gap-3 justify-end bg-secondary w-max -mt-2 -ml-6 mr-auto md:ml-auto md:-mr-6 px-2 pt-1 rounded-lg text-secondary-content">
                <time className="font-mono">2019-2021</time>
                <FaUniversity size={20} />
              </div>
              <p className="text-lg">
                НИ&nbsp;МГУ&nbsp;им.&nbsp;Н.П.&nbsp;Огарева, географический
                факультет, экология и природопользование, магистр
              </p>
            </div>
            <hr />
          </li>
          <li>
            <hr />
            <div className="timeline-start md:text-end mb-10 z-10">
              <div className="flex flex-row-reverse md:flex-row gap-3 justify-end bg-secondary w-max -ml-6 mr-auto md:ml-auto md:-mr-6 px-2 pt-1 rounded-lg text-secondary-content">
                <time className="font-mono">2021</time>
                <FaUniversity size={20} />
              </div>
              <p className="text-lg">
                ГБУ ДПО «Санкт-Петербургская академия постдипломного
                педагогического образования», актуальные проблемы современного
                образования: обобщение и диссеминация эффективного
                индивидуального педагогического опыта (стажировка)
              </p>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}
export default EducationAndExperience;
