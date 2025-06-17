import Sidebar from "../components/Sidebar";

const Dashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />
      <div style={{ padding: "20px" }}>
        <h2>Welcome to Admin Dashboard</h2>
        <p>Pilih menu di sebelah kiri untuk mengelola data</p>
      </div>
    </div>
  );
};

export default Dashboard;
