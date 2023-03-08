import React from "react";
import * as R from "ramda";
import Image from "next/image";
import Link from "next/link";

import { InjectionZone } from "../../types/config";
import useStrapion from "../../hooks/useStrapion";

import MainMenuItem from "./MainMenuItem";

const MainMenu: React.FC & {
  Item: typeof MainMenuItem;
} = () => {
  const icon = useStrapion((state) => state.config.icon);
  const menuItems = useStrapion((state) =>
    R.sortBy(R.prop("weight"))(
      state.config.zones.filter(
        R.where({
          zone: (zone: InjectionZone) =>
            [InjectionZone.MainMenuTop, InjectionZone.MainMenuBottom].includes(
              zone
            ),
        })
      )
    )
  );

  return (
    <nav className="py-3 w-16 bg-slate-100 flex flex-col items-center justify-between">
      <div className="space-y-4">
        <Link href="/" className="flex">
          {icon && <Image height={40} width={40} src={icon} alt="" />}
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
