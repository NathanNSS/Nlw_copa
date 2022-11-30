import { HStack, IInputProps } from 'native-base';
import CountryFlag from "react-native-country-flag";

import { Input } from './Input';

interface Props{
  code: string;
  position: 'left' | 'right';
  value:string;
  editable?:boolean;
  onChangeText: (value: string) => void;
}

export function Team({ code, position, onChangeText, value, editable = true}: Props) {
  return (
    <HStack alignItems="center">
      {position === 'left' && <CountryFlag isoCode={code} size={25} style={{ marginRight: 12 }} />}

      <Input
        w={'12'}
        h={9}
        editable={editable}
        textAlign="center"
        fontSize="xs"
        keyboardType="numeric"
        onChangeText={onChangeText}
        value={value}
      />

      {position === 'right' && <CountryFlag isoCode={code} size={25} style={{ marginLeft: 12 }} />}
    </HStack>
  );
}