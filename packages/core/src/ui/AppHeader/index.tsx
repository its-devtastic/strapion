import React from "react";
import * as R from "ramda";

import { InjectionZone } from "../../types/config";
import useStrapion from "../../hooks/useStrapion";

import AppHeaderItem from "./AppHeaderItem";
import UserMenu from "./UserMenu";

const AppHeader: React.FC & {
  Item: typeof AppHeaderItem;
} = () => {
  const config = useStrapion();
  const items = R.sortBy(R.prop("weight"))(
    config.zones.filter(
      R.where({
        zone: (zone: InjectionZone) =>
          [
            InjectionZone.AppHeaderLeft,
            InjectionZone.AppHeaderCenter,
            InjectionZone.AppHeaderRight,
          ].includes(zone),
      })
    )
  );

  return (
    <header className="h-12 px-3 border-b border-solid border-0 border-gray-200 flex items-center justify-between">
      <div className="flex items-center gap-3">
        {items
          .filter(R.whereEq({ zone: InjectionZone.AppHeaderLeft }))
          .map(({ render }, index) => (
            <div key={index}>{render()}</div>
          ))}
      </div>
      <div className="flex items-center gap-3">
        {items
          .filter(R.whereEq({ zone: InjectionZone.AppHeaderCenter }))
          .map(({ render }, index) => (
            <div key={index}>{render()}</div>
          ))}
      </div>
      <div className="flex items-center gap-3">
        {items
          .filter(R.whereEq({ zone: InjectionZone.AppHeaderRight }))
          .map(({ render }, index) => (
            <div key={index}>{render()}</div>
          ))}
        <div>
          <UserMenu />
        </div>
      </div>
    </header>
  );
};

export default AppHeader;

AppHeader.Item = AppHeaderItem;
