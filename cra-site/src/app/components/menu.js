import { NavLink } from "react-router-dom";
import { itemGenerator } from "../lib";
const Menu = itemGenerator("div", NavLink, "Menu");

export default Menu;
