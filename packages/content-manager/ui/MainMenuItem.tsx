import React from "react";
import { FolderFilled } from "@ant-design/icons";
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
      <FolderFilled />
    </MainMenu.Item>
  </Popover>
);

export default MainMenuItem;
