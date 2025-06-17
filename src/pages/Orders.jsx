import { useEffect, useState } from "react";
import { fetchOrders } from "../api";
import { DataGrid } from "@mui/x-data-grid";
import Sidebar from "../components/Sidebar";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        const ordersData = await fetchOrders();
        setOrders(ordersData);
      } catch (error) {
        console.error("Gagal memuat data:", error);
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
        <div style={{ height: 600, width: "100%" }}>
          <DataGrid
            rows={orders}
            columns={columns}
            loading={loading}
            pageSize={10}
            rowsPerPageOptions={[10, 25, 50]}
          />
        </div>
      </Box>
    </Box>
  );
};

export default Orders;
