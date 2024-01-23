import React, { useEffect, useState } from "react";
import { Button, Card, Descriptions, Table, Tag, Tooltip } from "antd";
import masterService from "services/MasterService";
import { useParams } from "react-router-dom";
import Utils from 'utils';
import {
  DeleteOutlined,
  SearchOutlined,
  PlusCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";
import Flex from "components/shared-components/Flex";

const UserInfo = () => {
  const { user_id } = useParams();
  const [list, setList] = useState([]);

  const listData = () => {
    console.log(user_id);
    const reqeustParam = { user_id: user_id };
    try {
      const resp = masterService.showUser(reqeustParam);
      resp
        .then((res) => {
          setList(res.data.userasset);
          // setListAll(res.data);
        })
        .catch((err) => {});
    } catch (errors) {
      console.log(errors);
    }
  };

  useEffect(() => {
    listData();
  }, []);

  const AssettableColumns = [
    {
      title: "Sr. No.",
      render: (_, elm, index) => index + 1,
    },
    {
      title: "Product",
      dataIndex: [ "asset","name"],
      sorter: (a, b) => Utils.antdTableSorter(a, b, ["asset", "name"]),
    },
    {
      title: "Code",
      dataIndex: "code",
      sorter: (a, b) => Utils.antdTableSorter(a, b, "code"),
    },
    {
      title: "Action",
      dataIndex: "actions",
      render: (_, elm) => (
        <Flex>
          <Tooltip title="Edit">
            <Button
              type="primary"
              className="mr-2"
              icon={<EditOutlined />}
              onClick={() => {
                showEditVaue(elm);
              }}
              size="small"
            />
          </Tooltip>

          <Tooltip title="Delete">
            <Button
              danger
              icon={<DeleteOutlined />}
              onClick={() => {
                deleteAsset(elm.id);
              }}
              size="small"
            />
          </Tooltip>
        </Flex>
      ),
    },
  ];

  const showEditVaue = (elm) => {
    //console.log(elm)
 
  };
  const deleteAsset = (elm) => {
    //console.log(elm)
  
  };
  var i = 1;
  return (
    <Card>
      <div className="table-responsive">
        <Table
          key={i++}
          columns={AssettableColumns}
          dataSource={list}
          rowKey="id"
        />
      </div>
    </Card>
  );
};

export default UserInfo;
