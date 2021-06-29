import { useState } from "react";
import "./styles.css";
import {
  useSpring,
  animated,
  useTransition,
  useSpringRef,
  useChain
} from "react-spring";

export default function App() {
  const [toggle, setToggle] = useState(true);
  console.log(toggle);
  return (
    <div className="App">
      <button
        style={{ zIndex: 10 }}
        type="button"
        onClick={() => setToggle(!toggle)}
      >
        {toggle ? "Close" : "Menu"}
      </button>
      <Menu toggle={toggle} />
    </div>
  );
}

function Menu({ toggle: menuVisible }) {
  const menus = ["Home", "About", "Work", "Contact"];
  console.log(menuVisible);
  const menuRef = useSpringRef();
  const menuBarAnimation = useSpring({
    ref: menuRef,
    from: { opacity: 0, transform: "translateY(-120%)" },
    opacity: menuVisible ? 1 : 0,
    transform: menuVisible ? "translateY(0%)" : "translateX(-120%)"
  });

  const menuItemRef = useSpringRef();
  const menuItemAnimation = useTransition(menuVisible ? menus : [], {
    ref: menuItemRef,
    trail: 500 / menus.length,
    from: { opacity: 0, transform: "translateY(-20%)" },
    enter: { opacity: 1, transform: "translateY(0%)" },
    leave: { opacity: 0, transform: "translateX(-20%)" }
  });

  useChain(menuVisible ? [menuRef, menuItemRef] : [menuItemRef, menuRef], [
    0,
    menuVisible ? 0.1 : 0.6
  ]);

  return (
    <animated.div style={menuBarAnimation}>
      <nav>
        <ul className="menu">
          {menuItemAnimation(
            (styles, item) =>
              item && (
                <animated.li className="menu-list" style={styles}>
                  {item}
                </animated.li>
              )
          )}
        </ul>
      </nav>
    </animated.div>
  );
}
