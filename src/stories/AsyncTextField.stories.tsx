import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import { DropdownInput } from '..';
import { DropdownInputProps } from '../interfaces/component';

const meta: Meta = {
  title: 'Remic/DropdownInput',
  component: DropdownInput,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

function sleep(delay = 0) {
  return new Promise((resolve) => {
    setTimeout(resolve, delay);
  });
}

type Film = {
  label: string;
  value: number;
};

const topFilms = [
  { label: 'The Shawshank Redemption', value: 1994 },
  { label: 'The Godfather', value: 1972 },
  { label: 'The Godfather: Part II', value: 1974 },
  { label: 'The Dark Knight', value: 2008 },
  { label: '12 Angry Men', value: 1957 },
  { label: "Schindler's List", value: 1993 },
  { label: 'Pulp Fiction', value: 1994 },
  {
    label: 'The Lord of the Rings: The Return of the King',
    value: 2003,
  },
  { label: 'The Good, the Bad and the Ugly', value: 1966 },
  { label: 'Fight Club', value: 1999 },
  {
    label: 'The Lord of the Rings: The Fellowship of the Ring',
    value: 2001,
  },
  {
    label: 'Star Wars: Episode V - The Empire Strikes Back',
    value: 1980,
  },
  { label: 'Forrest Gump', value: 1994 },
  { label: 'Inception', value: 2010 },
  {
    label: 'The Lord of the Rings: The Two Towers',
    value: 2002,
  },
  { label: "One Flew Over the Cuckoo's Nest", value: 1975 },
  { label: 'Goodfellas', value: 1990 },
  { label: 'The Matrix', value: 1999 },
  { label: 'Seven Samurai', value: 1954 },
  {
    label: 'Star Wars: Episode IV - A New Hope',
    value: 1977,
  },
  { label: 'City of God', value: 2002 },
  { label: 'Se7en', value: 1995 },
  { label: 'The Silence of the Lambs', value: 1991 },
  { label: "It's a Wonderful Life", value: 1946 },
  { label: 'Life Is Beautiful', value: 1997 },
  { label: 'The Usual Suspects', value: 1995 },
  { label: 'Léon: The Professional', value: 1994 },
  { label: 'Spirited Away', value: 2001 },
  { label: 'Saving Private Ryan', value: 1998 },
  { label: 'Once Upon a Time in the West', value: 1968 },
  { label: 'American History X', value: 1998 },
  { label: 'Interstellar', value: 2014 },
];

const DropdownInputTemplate: StoryFn<DropdownInputProps> = () => {
  const [data, setData] = React.useState<Film[]>([]);
  const [loading, setLoading] = React.useState(false);
  const [selectedData, setSelectedData] = React.useState<Film | undefined>();

  const fetchTop100Films = async () => {
    setLoading(true);
    await sleep(1e3); // For demo purposes.
    setData(topFilms);
    setLoading(false);
  };

  return (
    <div className="flex flex-col space-y-2">
      <p>Dropdown fields example</p>
      <DropdownInput
        width={500}
        onOpen={() => {
          fetchTop100Films();
        }}
        initValue={topFilms[0]}
        onChange={(value) => {
          setSelectedData(value as Film);
        }}
        dropdownValue={selectedData}
        data={data}
        loading={loading}
        label="Search people here"
        placeholder="Search here ..."
      />
    </div>
  );
};

export const Default = DropdownInputTemplate.bind({});

Default.args = {};
