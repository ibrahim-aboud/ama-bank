import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

function Scrollbar({ children }) {
  return (
    <PerfectScrollbar
      option={{
        wheelPropagation: false,
        swipeEasing: true,
        wheelSpeed: 0.75,
      }}
    >
      {children}
    </PerfectScrollbar>
  );
}

export default Scrollbar;
