import {
  DatePicker,
  type DatePickerProps,
} from '@mui/x-date-pickers/DatePicker';
type Props<TInputDate, TDate> = {
  name: string;
} & Omit<DatePickerProps<TInputDate, TDate>, 'onChange' | 'value'>;
