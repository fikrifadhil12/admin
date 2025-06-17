import { useEffect, useState } from "react";
import { fetchUsers } from "../api";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const usersData = await fetchUsers();
        console.log("Users data from API:", usersData); // Debugging

        if (Array.isArray(usersData)) {
          // Transform data untuk match dengan kolom DataGrid
          const transformedData = usersData.map((user) => ({
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            created_at: user.created_at,
          }));

          setUsers(transformedData);
        } else {
          setError("Format data tidak valid");
        }
      } catch (error) {
        console.error("Gagal memuat data:", error);
        setError("Gagal memuat data pengguna");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "name", headerName: "Nama", width: 200 },
    { field: "email", headerName: "Email", width: 250 },
    { field: "phone", headerName: "Telepon", width: 150 },
    {
      field: "created_at",
      headerName: "Tanggal Daftar",
      width: 200,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Daftar Pengguna
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
            <CircularProgress />
          </Box>
        ) : (
          <div style={{ height: 600, width: "100%" }}>
            <DataGrid
              rows={users}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10, 25, 50]}
            />
          </div>
        )}
      </Box>
    </Box>
  );
};

export default Users;
