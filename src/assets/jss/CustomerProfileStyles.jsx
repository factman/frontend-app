export const styles = {
  container: {
    backgroundColor: "transparent",
    width: "100%",
    margin: "0px",
    marginBottom: "20px",
    padding: "30px 3%",
    borderBottom: "2px solid gray",
  },
  paper: {
    backgroundColor: "white",
    width: "100%",
    minHeight: "100px",
    borderRadius: "6px",
    overflow: "hidden",
  },
  innerPaper: {
    ...this.paper,
    padding: "0px 5%",
    margin: "0px",
    overflow: "hidden",
  },
  userName: {
    margin: "30px auto 10px auto",
  },
  profileHead: {
    backgroundColor: "#1479fb",
    width: "100%",
    padding: "5%",
  },
  profileImage: {
    borderRadius: "100%",
    margin: "0px auto",
    display: "block",
  },
};
