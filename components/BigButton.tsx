import { ReactNode } from "react";
import { Pressable } from "react-native";

export const BigButton = (props: { children: ReactNode | ReactNode[], onPress: () => void, index?: number }) => {
    return (
        <Pressable
            onPress={props.onPress}
            android_ripple={{
                color: '#00000060',
                foreground: true,
            }}
            style={{ margin: 10, marginTop: props.index === 0 ? 10 : 0, borderRadius: 10 }}
        >
            {props.children}
        </Pressable >
    )
}