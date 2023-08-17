import React, { useEffect } from "react";
import { Meta, StoryFn } from "@storybook/react";
import { Table } from "..";
import { HeaderProps, SortProp, TableProps } from "../components/Table";

const meta: Meta = {
  title: "Remic/Table",
  component: Table,
  argTypes: {
    children: {
      control: {
        type: "text",
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const SortUi = ({ order, onSort, ...rest }: SortProp) => {
  return (
    <div
      className="flex flex-row space-x-2 items-center cursor-pointer"
      onClick={onSort}
      {...rest}
    >
      <p className="text-gray-900 text-sm">Title</p>
      {order === "ASC" ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M4.5 15.75l7.5-7.5 7.5 7.5"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M19.5 8.25l-7.5 7.5-7.5-7.5"
          />
        </svg>
      )}
    </div>
  );
};

const headers: HeaderProps[] = [
  {
    key: "name",
    label: (
      <div>
        <p className="text-gray-900">Name</p>
        <p className="text-[10px] font-normal text-gray-400">
          This is the description of the name
        </p>
      </div>
    ),
  },
  {
    key: "title",
    label: (param) => <SortUi {...param} />,
  },
  {
    key: "email",
    label: "Email",
  },
  {
    key: "active",
    label: "Status",
    renderData(data) {
      if (data && data === true) {
        return <p className="text-green-500">Active</p>;
      }
      return <p className="text-red-500">Inactive</p>;
    },
  },
];

const data = [
  {
    name: "Lindsay Walton",
    title: "Front-end Developer",
    email: "lindsay@gmail.com",
    active: true,
  },
  {
    name: "Lindsay Waltonis",
    title: "Back-end Developer",
    email: "lindsay@gmail.com",
    active: true,
  },
  {
    name: "Lindsay Waltonis",
    title: "Back-end Developer",
    email: "lindsay@gmail.com",
    active: true,
  },
  {
    name: "Lindsay Waltonis",
    title: "Back-end Developer",
    email: "lindsay@gmail.com",
    active: true,
  },
  {
    name: "Lindsay Waltonous",
    title: "Fullstack Developer",
    email: "lindsay@gmail.com",
    active: false,
    disabledChecked: true,
    defaultRemicChecked: true,
  },
];

const TableTemplate: StoryFn<TableProps> = () => {
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);
  }, []);

  return (
    <div className="flex flex-col space-y-2">
      <Table
        title="This is the sample of remic table"
        headers={headers}
        usePagination
        loading={loading}
        pageCount={10}
        onRowClick={(data) => {
          console.log(data);
        }}
        onSort={(order, key) => {
          console.log(order, key, "@sortResult!!");
        }}
        emptyMessage="No data found"
        onChecked={(data) => {
          console.log("onChecked", data);
        }}
        striped="odd"
        description="This is the description of the table."
        data={data}
      />
    </div>
  );
};

export const Default = TableTemplate.bind({});

Default.args = {};
