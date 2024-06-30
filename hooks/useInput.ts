import { type ChangeEvent, useState } from 'react';

export default function useInput(initialValue?: any) {
  const [value, setValue] = useState<any>(initialValue);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return {
    value,
    onChange,
  };
}
