import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder } from "@fortawesome/free-solid-svg-icons";
import { Popover } from "antd";

import { MainMenu } from "@strapion/core";

import ContentManagerMenu from "./ContentManagerMenu";

const MainMenuItem: React.FC<{
  groups: { label: string; items: string[] }[];
}> = ({ groups }) => (
  <Popover
    key="contentManager"
    content={<ContentManagerMenu groups={groups} />}
    trigger={["hover"]}
    placement="rightTop"
  >
    <MainMenu.Item>
      <FontAwesomeIcon icon={faFolder} />
    </MainMenu.Item>
  </Popover>
);

export default MainMenuItem;
