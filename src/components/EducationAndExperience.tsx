import EdExpBlock, { TEdExpBlock } from "../ui/EdExpBlock";

const edExpInfo: TEdExpBlock[] = [
  {
    id: 1,
    type: "education",
    years: "2015-2019",
    text: /*html*/ `НИ&nbsp;МГУ&nbsp;им.&nbsp;Н.П.&nbsp;Огарева, географический факультет, экология и природопользование, бакалавр`,
  },
  {
    id: 2,
    type: "experience",
    years: "2017-2018",
    text: /*html*/ `Лаборант кафедры «Экология и природопользование» НИ&nbsp;МГУ&nbsp;им.&nbsp;Н.П.&nbsp;Огарева`,
  },
  {
    id: 3,
    type: "experience",
    years: "С 2018",
    text: /*html*/ `Репетитор`,
  },
  {
    id: 4,
    type: "education",
    years: "2018-2019",
    text: /*html*/ `НИ&nbsp;МГУ&nbsp;им.&nbsp;Н.П.&nbsp;Огарева, профессиональная переподготовка, педагог`,
  },
  {
    id: 5,
    type: "experience",
    years: "С 2019",
    text: /*html*/ `Школа, учитель географии`,
  },
  {
    id: 6,
    type: "education",
    years: "2019-2021",
    text: /*html*/ `НИ&nbsp;МГУ&nbsp;им.&nbsp;Н.П.&nbsp;Огарева, географический факультет, экология и природопользование, магистр`,
  },
  {
    id: 7,
    type: "education",
    years: "2021",
    text: /*html*/ `
      ГБУ ДПО «Санкт-Петербургская академия постдипломного
      педагогического образования», актуальные проблемы современного
      образования: обобщение и диссеминация эффективного
      индивидуального педагогического опыта (стажировка)
    `,
  },
  {
    id: 8,
    type: "education",
    years: "2024, 2025",
    text: /*html*/ `
      Санкт-Петербургский центр оценки качества образования и информационных технологий, программа <b>«Профессионально-педагогическая
      компетентность эксперта государственной итоговой аттестации выпускников 9&nbsp;классов (по&nbsp;географии)»</b>
    `,
  },
  {
    id: 9,
    type: "education",
    years: "2025",
    text: /*html*/ `
      Участник межрегионального фестиваля современных образовательных практик
    `,
  },
  {
    id: 10,
    type: "education",
    years: "2025",
    text: /*html*/ `
      ГБУ ДПО «Санкт-Петербургская академия постдипломного
      педагогического образования», «Профильные предпрофессиональные классы программы «Профориентационный минимум»:
      современные подходы к&nbsp;организации деятельности и условия реализации»
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
