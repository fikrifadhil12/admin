import { useEffect, useState } from "react";
import { fetchOrders } from "../api";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Alert from "@mui/material/Alert";
import CircularProgress from "@mui/material/CircularProgress";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const ordersData = await fetchOrders();
        console.log("Orders data from API:", ordersData); // Debugging

        if (Array.isArray(ordersData)) {
          // Pastikan data orders memiliki struktur yang benar
          const transformedData = ordersData.map((order) => ({
            id: order.id,
            user_name: order.user_name || "N/A",
            user_email: order.user_email || "N/A",
            total: order.total_amount,
            status: order.status || "Belum Diproses",
            created_at: order.created_at,
          }));

          setOrders(transformedData);
        } else {
          setError("Format data tidak valid");
        }
      } catch (error) {
        console.error("Gagal memuat data:", error);
        setError("Gagal memuat data pesanan");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const columns = [
    { field: "id", headerName: "ID", width: 70 },
    { field: "user_name", headerName: "Nama Pelanggan", width: 200 },
    { field: "user_email", headerName: "Email", width: 250 },
    { field: "total", headerName: "Total", width: 120 },
    { field: "status", headerName: "Status", width: 150 },
    {
      field: "created_at",
      headerName: "Tanggal",
      width: 200,
      valueFormatter: (params) => new Date(params.value).toLocaleString(),
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar />
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <Typography variant="h4" sx={{ mb: 3 }}>
          Daftar Pesanan
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
              rows={orders}
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

export default Orders;
