import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];

export default function MultipleSelectNative(props) {
  const [personName, setPersonName] = React.useState<string[]>([]);
  const handleChangeMultiple = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { options } = event.target;
    const value: string[] = [];
    for (let i = 0, l = options.length; i < l; i += 1) {
      if (options[i].selected) {
        value.push(options[i].value);
      }
    }
    setPersonName(value);
  };

  const minFormWidth = props.screenWidth/4;
  const maxFormWidth = props.screenWidth/3;

  return (
    <div style={{height: props.screenHeight}}>
      <FormControl sx={{ m: 1, minWidth: '95%', maxWidth: '100%' }}>
        <InputLabel shrink 
        htmlFor="select-multiple-native">
          Album {props.id}
        </InputLabel>
        <Select<string[]>
          multiple
          native
          value={personName}
          // @ts-ignore Typings are not considering `native`
          onChange={handleChangeMultiple}
          label="Native"
          inputProps={{
            id: 'select-multiple-native',
          }}
          style={
            {height: "100%"}
          }
        >
          {props.data.map((song) => (
            <option key={song.title + props.id} value={song.title}>
              {song.title}
            </option>
          ))}
        </Select>
      </FormControl>
    </div>
  );
}