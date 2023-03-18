import React, { PropsWithChildren } from "react";
import { Pressable } from "react-native";

import { styles } from "./button_styles";
import { IButtonProps } from "../../scripts/interfaces";

export default function Button(props: PropsWithChildren<IButtonProps>) : React.ReactElement {
  const [pressed, setPressed] = React.useState<boolean>(false);
  
  const activeColor = props.activeColor;
  const inactiveColor = props.inactiveColor;

  const activeStyle : { backgroundColor: string } = {
    backgroundColor: `hsl(${activeColor.h}, ${activeColor.s}%, ${activeColor.l}%)`
  }

  const inactiveStyle : { backgroundColor: string } = {
    backgroundColor: `hsl(${inactiveColor.h}, ${inactiveColor.s}%, ${inactiveColor.l}%)`
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