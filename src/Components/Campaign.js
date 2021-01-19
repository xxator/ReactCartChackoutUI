import React from "react";
import axios from "axios";
import styled from "styled-components";
import apiConfig from "./../api-config.json";
import MaterialTable from "material-table";
import moment from "moment";
import { Switch } from "@material-ui/core";
import { EuroSymbolRounded } from "@material-ui/icons";

const columns = [
  { title: "Name", field: "campaignName" },
  { title: "Type", field: "campaignType" },
  { title: "Discount", field: "discount" },
  {
    title: "Start Date",
    field: "startDate",
    render: (data) => {
      <p>{moment(data).format("dd mm yyyy")}</p>;
    },
  },
  { title: "End Date", field: "endDate" },
  { title: "Status", field: "status" },
];

const RootContainer = styled.div`
  display: flex;
  align-self: center;
  width: 100vw;
  display: flex;
  flex-direction: column;
  padding: 4rem 0rem;
`;

const TableContainer = styled.div`
  align-self: center;
`;

class Campaign extends React.Component {
  constructor() {
    super();
    this.state = {
      data: [],
      columns: [
        { title: "Name", field: "campaignName" },
        { title: "Type", field: "campaignType" },
        {
          title: "Discount",
          field: "discount",
          render: (rowData) => {
            return `${rowData.discount}%`;
          },
        },
        {
          title: "Start Date",
          field: "startDate",
          render: (rowData) => {
            return moment(rowData.startDate).format("MMM Do YY");
          },
        },
        {
          title: "End Date",
          field: "endDate",
          render: (rowData) => {
            return moment(rowData.endDate).format("MMM Do YY");
          },
        },
        {
          title: "Status",
          field: "status",
          render: (rowData) => {
            return (
              <Switch
                onChange={(e) => this.handleCampaignActivate(e, rowData.id)}
                checked={rowData.status === "Active"}
              />
            );
          },
        },
      ],
    };
  }

  handleCampaignActivate = (e, id) => {
    const activate = e.target.checked;
    if (activate) {
      fetch(
        `${apiConfig.url}/campaign/changeStatus?supplierId=1&campaignId=${id}&status=Active`,
        { method: "PUT" }
      ).then((res) => {
        axios.get(`${apiConfig.url}/supplier/1/campaigns`).then((res) => {
          this.setState({ data: res.data.data });
        });
      });
    } else {
      axios
        .put(
          `${apiConfig.url}/campaign/changeStatus?supplierId=1&campaignId=${id}&status=inactive`
        )
        .then((res) => {
          axios.get(`${apiConfig.url}/supplier/1/campaigns`).then((res) => {
            this.setState({ data: res.data.data });
          });
        });
    }
  };

  componentDidMount() {
    axios.get(`${apiConfig.url}/supplier/1/campaigns`).then((res) => {
      this.setState({ data: res.data.data });
    });
  }

  render() {
    return (
      <RootContainer>
        <TableContainer>
          <MaterialTable
            columns={[
              { title: "Name", field: "campaignName" },
              { title: "Type", field: "campaignType" },
              {
                title: "Discount",
                field: "discount",
                render: (rowData) => {
                  return `${rowData.discount}%`;
                },
              },
              {
                title: "Start Date",
                field: "startDate",
                render: (rowData) => {
                  return moment(rowData.startDate).format("MMM Do YY");
                },
              },
              {
                title: "End Date",
                field: "endDate",
                render: (rowData) => {
                  return moment(rowData.endDate).format("MMM Do YY");
                },
              },
              {
                title: "Status",
                field: "status",
                render: (rowData) => {
                  return (
                    <Switch
                      onChange={(e) =>
                        this.handleCampaignActivate(e, rowData.id)
                      }
                      checked={rowData.status === "Active"}
                    />
                  );
                },
              },
            ]}
            data={this.state.data}
            title="Campaigns"
          />
        </TableContainer>
      </RootContainer>
    );
  }
}

export default Campaign;
