import React from "react";
import * as R from "ramda";
import { Link } from "react-router-dom";

import { InjectionZone } from "../../types/config";
import useStrapion from "../../hooks/useStrapion";

import MainMenuItem from "./MainMenuItem";

const MainMenu: React.FC & {
  Item: typeof MainMenuItem;
} = () => {
  const config = useStrapion();
  const icon = config.icon;
  const menuItems = R.sortBy(R.prop("weight"))(
    config.zones.filter(
      R.where({
        zone: (zone: InjectionZone) =>
          [InjectionZone.MainMenuTop, InjectionZone.MainMenuBottom].includes(
            zone
          ),
      })
    )
  );

  return (
    <nav className="py-3 w-16 bg-slate-100 flex flex-col items-center justify-between">
      <div className="space-y-4">
        <Link to="/" className="flex">
          {icon && <img className="h-10 w-10" src={icon} alt="" />}
        </Link>
        {menuItems
          .filter(R.whereEq({ zone: InjectionZone.MainMenuTop }))
          .map(({ render }, index) => (
            <div key={index}>{render()}</div>
          ))}
      </div>
      <div>
        {menuItems
          .filter(R.whereEq({ zone: InjectionZone.MainMenuBottom }))
          .map(({ render }, index) => (
            <div key={index}>{render()}</div>
          ))}
      </div>
    </nav>
  );
};

export default MainMenu;

MainMenu.Item = MainMenuItem;
