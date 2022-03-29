import "../App.css";
import { Button, Container, Tooltip, IconButton } from "@material-ui/core";
import { useState, useEffect } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import DownloadIcon from "@material-ui/icons/Download";
import { downloadList } from "../utils/downloadExcel";

const Body = () => {
  const navigate = useNavigate();

  const [userList, setUserList] = useState("");
  const [onFetch, setOnFetch] = useState(false);

  console.log(userList);

  const viewDetails = (userId) => {
    navigate(`${userId}`);
  };

  const RowButton = ({ rowParams }) => {
    return (
      <Button variant="contained" onClick={() => viewDetails(rowParams.row.id)}>
        View Details
      </Button>
    );
  };
  const columns = [
    {
      field: "index",
      headerName: "No.",
      width: 85,
      editable: true,
    },
    {
      field: "Edit",
      headerName: "View Details",
      headerAlign: "center",
      color: "white",
      width: 170,
      disableClickEventBubbling: true,
      renderCell: (params) => <RowButton rowParams={params} />,
    },

    { field: "name", headerName: "Name", width: 160 },
    { field: "email", headerName: "Email", width: 260 },
    {
      field: "mobileNo",
      headerName: "Mobile No.",
      type: "text",
      width: 200,
    },
    {
      field: "dob",
      headerName: "DOB",
      type: "text",
      width: 150,
      valueGetter: (params) => new Date(params.row.dob).toLocaleDateString(),
    },
    {
      field: "jobType",
      headerName: "Job Type",
      type: "text",
      width: 150,
    },
  ];

  // const BASE_URL = "https://jsonplaceholder.typicode.com/users";
  const BASE_URL = "http://localhost:4000/person";

  const fetchCreatedUsers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}`, {
        withCredentials: true,
      });
      if (res.data.code === "00" && res.data.persons) {
        setUserList(
          res.data.persons.map((userItem, index) => ({
            index: index + 1,
            ...userItem,
            id: userItem._id,
          }))
        );
      } else {
        console.log(res.data.persons);
        alert(res.data.message || "An error occured");
      }
    } catch (err) {
      console.error("[fetchUsers]", err);
      alert("An error occured");
    }
  };

  //   const [filters, setFilters] = useState({
  //     city: null,
  //     name: null,
  //   });

  useEffect(() => {
    if (onFetch) {
      fetchCreatedUsers();
    }
  }, [onFetch]);

  const downloadStyledList = async () => {
    downloadList({
      title: `Users`,
      worksheetName: "Users",
      headers: ["No.", "Name", "Email", "Mobile No.", "DOB", "Job Type"],
      list: userList,
      rowGetter: (item) => [
        item.index,
        item.name,
        item.email,
        item.mobileNo,
        new Date(item.dob).toLocaleDateString(),
        item.jobType,
      ],
    });
  };

  return (
    <Container>
      <div className="body">
        {!onFetch && (
          <Button
            variant="contained"
            style={{ marginTop: "20px" }}
            onClick={() => setOnFetch(true)}
          >
            Fetch Users
          </Button>
        )}
        {onFetch && (
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: "10px",
            }}
          >
            <div style={{ marginTop: "20px", marginRight: "10px" }}>
              <Tooltip title="Download">
                <IconButton onClick={downloadStyledList}>
                  <DownloadIcon sx={{ color: "black", fontSize: "30px" }} />
                </IconButton>
              </Tooltip>
            </div>

            <Button
              variant="contained"
              style={{ marginTop: "20px" }}
              onClick={() => navigate(`create-new-user`)}
            >
              Create New User
            </Button>
          </div>
        )}

        {onFetch && (
          <>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                color: "white",
              }}
            >
              <div
                style={{
                  height: 200,
                  width: "100%",
                  //   margin: "20px",
                }}
              >
                {userList && (
                  <DataGrid
                    rows={userList}
                    columns={columns}
                    autoHeight
                    autoPageSize
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </Container>
  );
};

export default Body;
