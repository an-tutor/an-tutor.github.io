import EdExpBlock, { TEdExpBlock } from "../ui/EdExpBlock";

const edExpInfo: TEdExpBlock[] = [
  {
    id: 1,
    type: "education",
    years: "2015-2019",
    text: "НИ&nbsp;МГУ&nbsp;им.&nbsp;Н.П.&nbsp;Огарева, географический факультет, экология и природопользование, бакалавр",
  },
  {
    id: 2,
    type: "experience",
    years: "2017-2018",
    text: "Лаборант кафедры «Экология и природопользование» НИ&nbsp;МГУ&nbsp;им.&nbsp;Н.П.&nbsp;Огарева",
  },
  {
    id: 3,
    type: "experience",
    years: "С 2018",
    text: "Репетитор",
  },
  {
    id: 4,
    type: "education",
    years: "2018-2019",
    text: "НИ&nbsp;МГУ&nbsp;им.&nbsp;Н.П.&nbsp;Огарева, профессиональная переподготовка, педагог",
  },
  {
    id: 5,
    type: "experience",
    years: "С 2019",
    text: "Школа, учитель географии",
  },
  {
    id: 6,
    type: "education",
    years: "2019-2021",
    text: "НИ&nbsp;МГУ&nbsp;им.&nbsp;Н.П.&nbsp;Огарева, географический факультет, экология и природопользование, магистр",
  },
  {
    id: 7,
    type: "education",
    years: "2021",
    text: `
      ГБУ ДПО «Санкт-Петербургская академия постдипломного
      педагогического образования», актуальные проблемы современного
      образования: обобщение и диссеминация эффективного
      индивидуального педагогического опыта (стажировка)
    `,
  },
];

function EducationAndExperience() {
  return (
    <section className="py-10 px-4 bg-base-200">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-bold mb-5">Образование и опыт</h2>
        <ul className="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical pl-4 md:pl-0">
          {edExpInfo.map((info, index) => (
            <EdExpBlock
              {...info}
              key={info.id}
              isLast={index === edExpInfo.length - 1}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
export default EducationAndExperience;
