import { GobalState } from "../../../GobalState";
import { useContext } from "react";
import { Link } from "react-router-dom";
const OrderHistory = () => {
  const state = useContext(GobalState);
  const [history] = state.UserApi.history;
  if (history.length === 0) return null;
  console.log("🚀 ~ file: OrderHistory.jsx ~ line 8 ~ OrderHistory ~ history", history)
  return (
    <div className="history">
      <h2>History</h2>
      <h4>You have to {history.length} ordered</h4>
      <table>
          <thead>
              <tr>
                  <td>Payment Id</td>
                  <td>Date</td>
                  <td></td>
              </tr>
          </thead>
          <tbody>
              {history.map((item)=>(
                  <tr key={item._id}>
                      <td>{item.paymentID}</td>
                      <td>{new Date(item.createdAt).toLocaleDateString()}</td>
                      <td><Link to={`/history/${item._id}`}>View</Link></td>
                  </tr>
              ))}
          </tbody>
      </table>
    </div>
  );
};

export default OrderHistory;
