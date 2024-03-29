import cn from "classnames";
import PriceCard, { TPricing } from "../ui/PriceCard";

const pricingInfo: TPricing[] = [
  {
    id: 1,
    type: "secondary",
    title: "ПОДГОТОВКА К&nbsp;ОГЭ. Индивидуальные занятия",
    description: `<p>Кому подходит этот формат?</p>
    <ul>
      <li>тем, кто любит заниматься с&nbsp;преподавателем один на&nbsp;один;</li>
      <li>тем, кто хочет работать в&nbsp;комфортном для&nbsp;себя темпе;</li>
      <li>тем, кто нуждается в&nbsp;индивидуальном подходе.</li>
    </ul>`,
    priceFrom: 1350,
    more: `
    <h3>ПОДГОТОВКА К&nbsp;ОГЭ. Индивидуальные занятия</h3>
    <p>Кому подходит этот формат?</p>
    <ul>
      <li>тем, кто любит заниматься с&nbsp;преподавателем один на&nbsp;один;</li>
      <li>тем, кто хочет работать в&nbsp;комфортном для&nbsp;себя темпе;</li>
      <li>тем, кто нуждается в&nbsp;индивидуальном подходе.</li>
    </ul>
    <h4>Стоимость</h4>
    <p>Индивидуальное занятие «Подготовка к&nbsp;ОГЭ» (60 минут)&nbsp;/ <b>1500 рублей</b>.</p>
    <p>
      * При единовременной оплате сертификата на&nbsp;4 занятия стоимость 1 занятия составит <b>1400 рублей</b>.
      Срок действия сертификата составляет 30 дней. Общая стоимость сертификата составит 5600 рублей.
    </p>
    <p>
      * При единовременной оплате сертификата на&nbsp;8 занятий стоимость 1 занятия составит <b>1350 рублей</b>.
      Срок действия сертификата составляет 30 дней. Общая стоимость сертификата составит 10800 рублей.
    </p>
    <h4>Что вы получите?</h4>
    <p>Доступ к&nbsp;платформе с материалами, домашними заданиями и отслеживанием прогресса обучения.</p>
    <h4>Пробное занятие</h4>
    <p>Занятие проходят онлайн в&nbsp;течение 30 минут.</p>
    <p>На занятии проходит диагностика уровня знаний, по&nbsp;результатам которой составляется план обучения.</p>
    <p>Стоимость пробного занятия составляет 500&nbsp;рублей&nbsp;/ 30&nbsp;минут.</p>
    `,
  },
  {
    id: 2,
    type: "secondary",
    title: "ПОДГОТОВКА К ОГЭ. Парные&nbsp;/&nbsp;групповые занятия",
    description: `<p>Кому подходит этот формат?</p>
    <ul>
      <li>тем, кто не&nbsp;хочет сдаться на&nbsp;пути к&nbsp;цели;</li>
      <li>тем, кто хочешь получить поддержку и вдохновение от&nbsp;людей, понимающих тебя;</li>
      <li>тем, кто желает завести новые знакомства.</li>
    </ul>`,
    priceFrom: 1000,
    more: `
    <h3>ПОДГОТОВКА К ОГЭ. Парные&nbsp;/&nbsp;групповые занятия</h3>
    <p>Кому подходит этот формат?</p>
    <ul>
      <li>тем, кто не хочет сдаться на&nbsp;пути к&nbsp;цели;</li>
      <li>тем, кто хочешь получить поддержку и вдохновение от&nbsp;людей, понимающих тебя;</li>
      <li>тем, кто желает завести новые знакомства.</li>
    </ul>
    <h4>Форматы</h4>
    <p>Занятия могут проходит в&nbsp;парах и мини-группах.</p>
    <h4>Стоимость</h4>
    <p>Групповые занятия «Подготовка к ОГЭ» (60 минут) оплачиваются сертификатами единовременно. Срок действия сертификата&nbsp;- 30&nbsp;дней.</p>
    <p>Стоимость сертификата на&nbsp;4 занятия составляет 4400 рублей, 1 занятие&nbsp;– <b>1100 рублей</b>.</p>
    <p>Стоимость сертификата на&nbsp;8 занятий составляет 8000 рублей, 1 занятие&nbsp;– <b>1000 рублей</b>.</p>
    <h4>Что вы&nbsp;получите?</h4>
    <ul>
      <li>Доступ к&nbsp;платформе с&nbsp;материалами, домашними заданиями и отслеживанием прогресса обучения.</li>
      <li>Видеозапись уроков.</li>
      <li>Общий чат с&nbsp;другими учениками.</li>
      <li>Выгодную стоимость занятий.</li>
    </ul>
    <h4>Пробное занятие</h4>
    <p>Занятие проходят онлайн в&nbsp;течение 30 минут.</p>
    <p>На занятии проходит диагностика уровня знаний, по&nbsp;результатам которой составляется план обучения.</p>
    <p>Стоимость пробного занятия составляет 500&nbsp;рублей&nbsp;/ 30&nbsp;минут.</p>
    `,
  },
  {
    id: 3,
    type: "accent",
    title: "ПОВЫШЕНИЕ УСПЕВАЕМОСТИ. Индивидуальные занятия",
    description: `<p>Кому подходит этот формат?</p>
    <ul>
      <li>тем, кто любит заниматься с&nbsp;преподавателем один на&nbsp;один;</li>
      <li>тем, кто хочет работать в&nbsp;комфортном для&nbsp;себя темпе;</li>
      <li>тем, кто нуждается в&nbsp;индивидуальном подходе.</li>
    </ul>`,
    priceFrom: 1250,
    more: `
    <h3>ПОВЫШЕНИЕ УСПЕВАЕМОСТИ. Индивидуальные занятия</h3>
    <p>Кому подходит этот формат?</p>
    <ul>
      <li>тем, кто любит заниматься с&nbsp;преподавателем один на&nbsp;один;</li>
      <li>тем, кто хочет работать в&nbsp;комфортном для&nbsp;себя темпе;</li>
      <li>тем, кто нуждается в&nbsp;индивидуальном подходе.</li>
    </ul>
    <h4>Стоимость</h4>
    <p>Индивидуальное занятие «Повышение успеваемости» (60 минут)&nbsp;/ 1400&nbsp;рублей.</p>
    <p>
      * При единовременной оплате сертификата на 4 занятия стоимость 1 занятия составит <b>1250&nbsp;рублей</b>.
      Срок действия сертификата составляет 30 дней. Общая стоимость сертификата составит 5000&nbsp;рублей.
    </p>
    <p>
      * При единовременной оплате сертификата на 8 занятий стоимость 1 занятия составит <b>1250&nbsp;рублей</b>.
      Срок действия сертификата составляет 30 дней. Общая стоимость сертификата составит 10000&nbsp;рублей.
    </p>
    <h4>Что вы получите?</h4>
    <p>Доступ к&nbsp;платформе с&nbsp;материалами, домашними заданиями и отслеживанием прогресса обучения.</p>
    <h4>Пробное занятие</h4>
    <p>Занятие проходят онлайн в&nbsp;течение 30&nbsp;минут.</p>
    <p>На занятии проходит диагностика уровня знаний, по&nbsp;результатам которой составляется план обучения.</p>
    <p>Стоимость пробного занятия составляет 500&nbsp;рублей&nbsp;/ 30&nbsp;минут.</p>
    `,
  },
  {
    id: 4,
    type: "accent",
    title: "ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ. Индивидуальные консультации",
    description: `<p>Кому подходит этот формат?</p>
    <ul>
      <li>
        тем, кто хочет учиться самостоятельно, но не&nbsp;знает, с&nbsp;чего начать,
        и хочет получить эффективный план действий от&nbsp;профессионала;
      </li>
      <li>
        тем, кто столкнулся с&nbsp;трудностями в&nbsp;обучении и хочет разобрать
        конкретную тему, устранить пробелы в&nbsp;обучении.
      </li>
    </ul>`,
    priceFrom: 2500,
    more: `
    <h3>ДОПОЛНИТЕЛЬНЫЕ УСЛУГИ. Индивидуальные консультации</h3>
    <p>Кому подходит этот формат?</p>
    <ul>
    <li>
    тем, кто хочет учиться самостоятельно, но не&nbsp;знает, с&nbsp;чего начать,
    и хочет получить эффективный план действий от&nbsp;профессионала;
  </li>
  <li>
    тем, кто столкнулся с&nbsp;трудностями в&nbsp;обучении и хочет разобрать
    конкретную тему, устранить пробелы в&nbsp;обучении.
  </li>
    </ul>
    <h4>Что входит в&nbsp;консультацию?</h4>
    <ul>
      <li>диагностика уровня знаний;</li>
      <li>пошаговый план работы, исходя из&nbsp;вашего запроса;</li>
      <li>возможность задавать вопросы в&nbsp;течение нескольких дней после консультации.</li>
    </ul>
    <h4>Стоимость</h4>
    <p>Стоимость консультации составляет <b>2500&nbsp;рублей</b>&nbsp;/ 1,5&nbsp;часа.</p>
    `,
  },
];

const process: { title: string; description: string } = {
  title: "КАК ПРОХОДЯТ ЗАНЯТИЯ",
  description: `
  <p>
    Занятия проходят онлайн в течение 60 минут на платформе Miro. Видеосвязь осуществляется
    через&nbsp;платформу Zoom/Skype.
  </p>
  <p>На уроках активно использую интерактивные формы работы, рабочие листы, игры, карты и ГИС.</p>
  <p>
    На занятии царит дружелюбная и безопасная атмосфера, которая вовлекает в&nbsp;процесс.
    К&nbsp;каждому ученику подхожу индивидуально, мы&nbsp;вместе ставим цели и достигаем их.
  </p>
  `,
};

function Pricing() {
  return (
    <section className="py-10 px-4 bg-base-300">
      <div className="max-w-screen-xl mx-auto">
        <h2 className="text-2xl font-bold mb-5">Форматы и стоимость</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-screen-xl mx-auto">
          {pricingInfo.map((info) => (
            <PriceCard {...info} key={info.id} />
          ))}

          <div
            className={cn("card", "bg-primary", "text-primary-content", {
              "md:col-span-2": pricingInfo.length % 2 === 0,
              "md:col-span-1": pricingInfo.length % 2 === 1,
              "lg:col-span-3": pricingInfo.length % 3 === 0,
              "lg:col-span-2": pricingInfo.length % 3 === 1,
              "lg:col-span-1": pricingInfo.length % 3 === 2,
            })}
          >
            <div className="card-body">
              <h2
                className="card-title"
                dangerouslySetInnerHTML={{ __html: process.title }}
              />
              <div
                className="priceCardDescription"
                dangerouslySetInnerHTML={{ __html: process.description }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Pricing;
