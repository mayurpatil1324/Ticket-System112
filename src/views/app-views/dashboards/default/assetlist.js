import React, { Component } from 'react';
import { Card, Table, Tag, Tooltip, message, Button } from 'antd';
import { EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import UserView from './UserView';
import AvatarStatus from 'components/shared-components/AvatarStatus';
import masterService from '../../../../services/MasterService';

class Assetlist extends Component {
  state = {
    users: [],
    userProfileVisible: false,
    selectedUser: null,
  };

  deleteAssignedAsset = (assignedAssetId) => {
    // Implement your delete logic here
    // You might want to call a service to delete the assigned asset
  };

  showUserProfile = (userInfo) => {
    this.setState({
      userProfileVisible: true,
      selectedUser: userInfo,
    });
  };

  closeUserProfile = () => {
    this.setState({
      userProfileVisible: false,
      selectedUser: null,
    });
  };

  componentDidMount() {
    // Call your service to get dashboard data
    this.fetchDashboardData();
  }

  fetchDashboardData = () => {
    const requestData = {}; // You can pass any required parameters here
    masterService
      .getDashboard(requestData)
      .then((response) => {
        const { assignedAssets } = response.data;
        this.setState({
          users: assignedAssets,
        });
      })
      .catch((error) => {
        console.error('Error fetching dashboard data', error);
      });
  };

  render() {
    const { users, userProfileVisible, selectedUser } = this.state;

    const tableColumns = [
      // ... (existing columns)

      {
        title: '',
        dataIndex: 'actions',
        render: (_, elm) => (
          <div className="text-right d-flex justify-content-end">
            <Tooltip title="View">
              <Button
                type="primary"
                className="mr-2"
                icon={<EyeOutlined />}
                onClick={() => {
                  this.showUserProfile(elm);
                }}
                size="small"
              />
            </Tooltip>
            <Tooltip title="Delete">
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => {
                  this.deleteAssignedAsset(elm.id);
                }}
                size="small"
              />
            </Tooltip>
          </div>
        ),
      },
    ];

    return (
      <Card bodyStyle={{ padding: '0px' }}>
        <div className="table-responsive">
          <Table columns={tableColumns} dataSource={users} rowKey="id" />
        </div>
        <UserView data={selectedUser} visible={userProfileVisible} close={() => this.closeUserProfile()} />
      </Card>
    );
  }
}

export default Assetlist;
