import { format } from 'date-fns';
import { CalendarDays, Bell, Repeat } from 'lucide-react';
import { type FC, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import Hint from '@/components/ui/Hint';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import TimePicker from '@/components/ui/TimePicker';
import { cn } from '@/libs/utils';
// import { parseDateTime } from '@/libs/utils';

interface ActionsProps {
  onAddTodo?: () => void;
  onTimeChange: (unixTime: number) => void;
  disabled?: boolean;
}

const currentDate = new Date();

const Actions: FC<ActionsProps> = ({ onAddTodo, disabled = true }) => {
  const [selectedDate, setSelectedDate] = useState<Date>(() => new Date());
  const [calendarOpen, setCalendarOpen] = useState<boolean>(false);
  const [time, setTime] = useState<string>('');

  const onSelectDate = (date: Date) => {
    setSelectedDate(date);
  };

  const handleCancel = () => {
    // reset date and close calendar
    setTime('');
    setCalendarOpen(false);
  };

  // useEffect(() => {
  //   console.log(parseDateTime(selectedDate, time));
  // }, [selectedDate, time]);

  return (
    <div className="flex h-10 items-center gap-3 bg-[#e1dfdd]/40 px-4 py-2 text-xs text-[#292827]">
      <Popover open={calendarOpen} onOpenChange={setCalendarOpen}>
        <PopoverTrigger asChild>
          <button
            className={cn(
              'flex items-center gap-2 rounded p-1 transition hover:bg-zinc-300/40',
              selectedDate && 'bg-white',
            )}
          >
            <Hint title="Due date">
              <CalendarDays size={16} className="opacity-75" />
            </Hint>
            {selectedDate && (
              <>
                {format(selectedDate, 'PP')} time: {time}
              </>
            )}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-max">
          <strong className="block border-b pb-3 text-center text-lg">Due</strong>
          <Calendar
            mode="single"
            selected={selectedDate ?? currentDate}
            // FIXME: need fix this sheet!
            onSelect={(newDate) => onSelectDate(newDate as Date)}
            className="border-b"
          />
          <div className="border-t border-border p-3">
            <TimePicker time={time} onTimeChange={setTime} />
          </div>
          <Button
            onClick={() => setCalendarOpen(false)}
            className="mt-4 w-full"
            variant="default"
            size="sm"
            disabled={!selectedDate || !time}
          >
            Save
          </Button>

          <Button className="mt-4 w-full" variant="outline" size="sm" onClick={handleCancel}>
            Clear date
          </Button>
        </PopoverContent>
      </Popover>
      <button className="rounded p-1 transition hover:bg-zinc-300/40">
        <Hint title="Remind me">
          <Bell size={16} className="opacity-75" />
        </Hint>
      </button>
      <button className="rounded p-1 transition hover:bg-zinc-300/40">
        <Hint title="Repeat">
          <Repeat size={16} className="opacity-75" />
        </Hint>
      </button>
      <Button
        disabled={disabled}
        className="ml-auto h-7 rounded-none disabled:hover:cursor-default"
        variant="outline"
        size="sm"
        onClick={onAddTodo}
      >
        Add
      </Button>
    </div>
  );
};

export default Actions;
