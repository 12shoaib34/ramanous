import { Input, Table } from "antd";
import React from "react";
import PeoplesIcon from "../../icons/PeoplesIcon";
import SearchIcon from "../../icons/SearchIcon";

const Entrants = () => {
  const columns = [
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      render: (text) => <span className="text-sm">{text}</span>,
    },
    {
      title: "Location",
      dataIndex: "location",
      key: "location",
      render: (text) => <span className="text-sm">{text}</span>,
    },
    {
      title: "Time",
      dataIndex: "time",
      key: "time",
      render: (text) => <span className="text-sm">{text}</span>,
    },
    {
      title: "Entries",
      dataIndex: "entries",
      key: "entries",
      render: (text) => <span className="text-sm">{text}</span>,
    },
  ];

  const data = [
    {
      key: "1",
      email: "davidliu9@outlook.com",
      location: "Shopify",
      time: "11-4-24 @ 05:55 pm",
      entries: 20,
      details: {
        firstName: "Khaled",
        lastName: "Alameddine",
        country: "Australia",
        phone: "0416786794",
      },
    },
    {
      key: "2",
      email: "+61416858291@viralsweep.com",
      location: "Shopify",
      time: "11-3-24 @ 10:59 pm",
      entries: 20,
      details: {
        firstName: "Rebecca",
        lastName: "Stokes",
        country: "Australia",
        phone: "0412345678",
      },
    },
  ];

  return (
    <div className="border border-black-opacity-15 bg-background-secondary py-5 rounded-xl">
      <div className="flex gap-8 pt-0 p-5 border-b border-whisper-gray">
        <div className="w-max flex items-center gap-3">
          <PeoplesIcon /> <h3 className="font-medium">Entrants</h3>
        </div>
        <div className="flex-1">
          <Input placeholder="Search Entrants" prefix={<SearchIcon />} />
        </div>
      </div>
      <div className="px-5 pt-5">
        <Table
          columns={columns}
          dataSource={data}
          pagination={{ pageSize: 10 }}
          rowSelection={{ type: "checkbox" }} // Checkbox for selection
          expandable={{
            expandedRowRender: (record) => (
              <table className="w-full">
                <tbody>
                  <tr>
                    <td className="px-4 py-2 font-medium border-b border-whisper-gray">First Name</td>
                    <td className="px-4 py-2 border-b border-whisper-gray">{record.details.firstName}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium border-b border-whisper-gray">Last Name</td>
                    <td className="px-4 py-2 border-b border-whisper-gray">{record.details.lastName}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium border-b border-whisper-gray">Country</td>
                    <td className="px-4 py-2 border-b border-whisper-gray">{record.details.country}</td>
                  </tr>
                  <tr>
                    <td className="px-4 py-2 font-medium border-b border-whisper-gray">Phone</td>
                    <td className="px-4 py-2 border-b border-whisper-gray">{record.details.phone}</td>
                  </tr>
                </tbody>
              </table>
            ),
          }}
        />
      </div>
    </div>
  );
};

export default Entrants;
