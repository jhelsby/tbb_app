import React, {PropsWithChildren} from 'react';
import {Pressable} from 'react-native';

import { styles } from "./button_styles";
import { IButtonProps } from "../../scripts/interfaces";
import { ColorContext } from "../../context/color_context";

export default function Button(props: PropsWithChildren<IButtonProps>) : React.ReactElement {
  const { color, lightColor } = React.useContext(ColorContext);
  
  const [pressed, setPressed] = React.useState<boolean>(false);

  return (
    <Pressable
      style={[
        styles.container,
        { backgroundColor: props.disabled ? 'hsl(0, 0%, 80%)' : pressed ? color : lightColor },
        Array.isArray(props.children) ? styles.containerMulti : styles.containerSingle
      ]}
      onPress={props.disabled ? () => {} : props.onPress}
      onPressIn={() => setPressed(true && !props.disabled)}
      onPressOut={() => setPressed(false)}>
      {props.children}
    </Pressable>
  );
}
