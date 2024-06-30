import { CircleX } from 'lucide-react';
import { type ChangeEvent, type FC } from 'react';

import { Button } from '../button';
import Input from '../input';

type TimePickerProps = {
  onTimeChange: (time: string) => void;
  time: string;
};

const TimePicker: FC<TimePickerProps> = ({ onTimeChange, time }) => {
  const handleClear = () => {
    onTimeChange('');
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        type="time"
        className="h-8 w-32"
        value={time}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onTimeChange(e.target.value)}
      />
      <Button
        disabled={!time}
        className="flex items-center"
        type="button"
        size="sm"
        variant="secondary"
        onClick={handleClear}
      >
        <CircleX />
      </Button>
    </div>
  );
};

export default TimePicker;
