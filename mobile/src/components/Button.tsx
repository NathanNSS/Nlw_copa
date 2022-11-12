import { Button as ButtonNB, Text, IButtonProps } from "native-base"

interface ButtonProps extends IButtonProps {
    title: string
    type?: "PRIMARY" | "SECONDARY"
}

export function Button({ title, type = "PRIMARY", ...rest }: ButtonProps) {
    return (
        <ButtonNB
            w="full"
            h="14"
            rounded="sm"
            fontSize="md"
            textTransform="uppercase"
            bg={type === "PRIMARY" ? "yellow.500" : "red.500"}
            _pressed={{bg: type === "PRIMARY" ? "yellow.400" : "red.600"}}
            _loading={{_spinner:{
                color:type === "PRIMARY" ? "black" : "white"},
                bg: type === "PRIMARY" ? "yellow.500" : "red.500",
                opacity:0.85
            }}
            {...rest}
        >
            <Text
                fontSize="sm"
                fontFamily="heading"
                color={type === "PRIMARY" ? "black" : "white"}
            >
                {title}
            </Text>
        </ButtonNB>
    );
}