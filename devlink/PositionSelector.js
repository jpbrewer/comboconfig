"use client";
import React from "react";
import * as _Builtin from "./_Builtin";
import * as _utils from "./utils";
import _styles from "./PositionSelector.module.css";

export function PositionSelector({
  as: _Component = _Builtin.Block,
  text1 = "Choose Position:",

  link1 = {
    href: "#",
  },

  text2 = "4",

  link2 = {
    href: "#",
  },

  text3 = "5",

  link3 = {
    href: "#",
  },

  text4 = "6",

  link4 = {
    href: "#",
  },

  text5 = "1",

  link5 = {
    href: "#",
  },

  text6 = "2",

  link6 = {
    href: "#",
  },

  text7 = "3",
}) {
  return (
    <_Component className={_utils.cx(_styles, "position-selector")} tag="div">
      <_Builtin.Block
        className={_utils.cx(_styles, "position-selector-title")}
        tag="div"
      >
        {"Choose Position:"}
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "position-selector-grid")}
        tag="div"
      >
        <_Builtin.Link
          className={_utils.cx(_styles, "inactive-pos")}
          id={_utils.cx(
            _styles,
            "w-node-df6c8f67-0f16-d18d-aea7-0b7df254e9e7-f254e9e3"
          )}
          button={true}
          data-pos-selector="pos4"
          block=""
          options={{
            href: "#",
          }}
        >
          {"4"}
        </_Builtin.Link>
        <_Builtin.Link
          className={_utils.cx(_styles, "inactive-pos")}
          id={_utils.cx(
            _styles,
            "w-node-df6c8f67-0f16-d18d-aea7-0b7df254e9e9-f254e9e3"
          )}
          button={true}
          data-pos-selector="pos5"
          block=""
          options={{
            href: "#",
          }}
        >
          {"5"}
        </_Builtin.Link>
        <_Builtin.Link
          className={_utils.cx(_styles, "inactive-pos")}
          id={_utils.cx(
            _styles,
            "w-node-df6c8f67-0f16-d18d-aea7-0b7df254e9eb-f254e9e3"
          )}
          button={true}
          data-pos-selector="pos6"
          block=""
          options={{
            href: "#",
          }}
        >
          {"6"}
        </_Builtin.Link>
        <_Builtin.Link
          className={_utils.cx(_styles, "inactive-pos")}
          id={_utils.cx(
            _styles,
            "w-node-df6c8f67-0f16-d18d-aea7-0b7df254e9ed-f254e9e3"
          )}
          button={true}
          data-pos-selector="pos1"
          block=""
          options={{
            href: "#",
          }}
        >
          {"1"}
        </_Builtin.Link>
        <_Builtin.Link
          className={_utils.cx(_styles, "inactive-pos")}
          id={_utils.cx(
            _styles,
            "w-node-df6c8f67-0f16-d18d-aea7-0b7df254e9ef-f254e9e3"
          )}
          button={true}
          data-pos-selector="pos2"
          block=""
          options={{
            href: "#",
          }}
        >
          {"2"}
        </_Builtin.Link>
        <_Builtin.Link
          className={_utils.cx(_styles, "inactive-pos")}
          id={_utils.cx(
            _styles,
            "w-node-df6c8f67-0f16-d18d-aea7-0b7df254e9f1-f254e9e3"
          )}
          button={true}
          data-pos-selector="pos3"
          block=""
          options={{
            href: "#",
          }}
        >
          {"3"}
        </_Builtin.Link>
      </_Builtin.Block>
      <_Builtin.Block
        className={_utils.cx(_styles, "linked-checkbox")}
        id={_utils.cx(
          _styles,
          "w-node-df6c8f67-0f16-d18d-aea7-0b7df254e9f3-f254e9e3"
        )}
        tag="div"
      />
    </_Component>
  );
}
