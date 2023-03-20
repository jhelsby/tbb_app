import React, { PropsWithChildren } from "react";
import { Pressable } from "react-native";

import { styles } from "./button_styles";
import { IButtonProps } from "../../scripts/interfaces";
import { hslToString } from "../../scripts/colors";
import { ColorContext } from "../../context/color_context";

export default function Button(props: PropsWithChildren<IButtonProps>) : React.ReactElement {
  const { color, colorLight } = React.useContext(ColorContext);
  
  const [pressed, setPressed] = React.useState<boolean>(false);

  const activeStyle : { backgroundColor: string } = {
    backgroundColor: hslToString(color)
  }

  const inactiveStyle : { backgroundColor: string } = {
    backgroundColor: hslToString(colorLight)
  }

  return (
    <Pressable
      style={[
        styles.container, 
        pressed ? activeStyle : inactiveStyle,
        Array.isArray(props.children) ? styles.containerMulti : styles.containerSingle
      ]}
      onPress={props.onPress}
      onPressIn={() => setPressed(true)}
      onPressOut={() => setPressed(false)}>
      {
        props.children
      }
    </Pressable>
  );
}