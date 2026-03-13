"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./TabGroup.module.css";

export function TabGroup({
  as: _Component = _Builtin.TabsWrapper,
  text1 = "Block Config",
  text2 = "Unit Config",
  text3 = "Output",
  title = "Building Block Configuration",
  positionSelectorText1 = "Choose Position:",
  configurationGroupSelectBoxLabel = "Claude put label for SelectBox here.",
  configurationGroupGroupName = "Claude put label for ConfigurationGroup here.",
  tabSlot1,
  tabSlot2,
  tabSlot3,
}) {
  return (
    <_Component
      className={_utils.cx(_styles, "overall-tabs")}
      current="Tab 1"
      easing="ease"
      fadeIn={300}
      fadeOut={100}
    >
      <_Builtin.TabsMenu tag="div">
        <_Builtin.TabsLink data-w-tab="Tab 1" block="inline">
          <_Builtin.Block tag="div">{"Block Config"}</_Builtin.Block>
        </_Builtin.TabsLink>
        <_Builtin.TabsLink data-w-tab="Tab 2" block="inline">
          <_Builtin.Block tag="div">{"Unit Config"}</_Builtin.Block>
        </_Builtin.TabsLink>
        <_Builtin.TabsLink data-w-tab="Tab 3" block="inline">
          <_Builtin.Block tag="div">{"Output"}</_Builtin.Block>
        </_Builtin.TabsLink>
      </_Builtin.TabsMenu>
      <_Builtin.TabsContent tag="div">
        <_Builtin.TabsPane
          className={_utils.cx(_styles, "tab-pane-tab-1")}
          tag="div"
          data-w-tab="Tab 1"
        >
          {tabSlot1 ?? (
            <_Builtin.Heading
              className={_utils.cx(_styles, "header-tabs")}
              tag="h3"
            >
              {title}
            </_Builtin.Heading>
          )}
        </_Builtin.TabsPane>
        <_Builtin.TabsPane tag="div" data-w-tab="Tab 2">
          {tabSlot2}
        </_Builtin.TabsPane>
        <_Builtin.TabsPane tag="div" data-w-tab="Tab 3">
          {tabSlot3}
        </_Builtin.TabsPane>
      </_Builtin.TabsContent>
    </_Component>
  );
}
