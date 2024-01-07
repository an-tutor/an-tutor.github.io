import { FaFire } from "react-icons/fa";
import { IoMdFlower } from "react-icons/io";
import { FaLeaf } from "react-icons/fa";
import { GiFlowerEmblem } from "react-icons/gi";

import artem1 from "./artem1.png";
import artem2 from "./artem2.png";
import artem3 from "./artem3.png";
import daria1 from "./daria1.png";
import daria2 from "./daria2.png";
import daria3 from "./daria3.png";
import maria1 from "./maria1.png";
import maria2 from "./maria2.png";
import maria3 from "./maria3.png";
import vic1 from "./vic1.png";
import vic2 from "./vic2.png";
import vic3 from "./vic3.png";

export default [
  {
    id: "artem",
    name: "Артем",
    icon: FaFire,
    images: [artem1, artem2, artem3],
  },
  {
    id: "daria",
    name: "Дарья",
    icon: IoMdFlower,
    images: [daria1, daria2, daria3],
  },
  {
    id: "maria",
    icon: FaLeaf,
    name: "Мария",
    images: [maria1, maria2, maria3],
  },
  {
    id: "vic",
    icon: GiFlowerEmblem,
    name: "Виктория",
    images: [vic1, vic2, vic3],
  },
];
