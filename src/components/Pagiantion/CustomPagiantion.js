import { Pagination, createMuiTheme, ThemeProvider } from "@mui/material";


const darkTheme = createMuiTheme({
    palette: {
      type: "dark",
    },
  });
 
const CustomPagination = ({ setpage, numberofPages = 10 }) => {

    const handlePageChange = (page) => {
        setpage(parseInt(page));
        window.scroll(0,0);
    };
    

    return (
        <div
            style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
                marginTop: 10,
            }}
        >
            <ThemeProvider theme={darkTheme}>
        <Pagination
          onChange={(e) => handlePageChange(e.target.textContent)}
          count={numberofPages}
          color="primary"
          hideNextButton
          hidePrevButton
        />
      </ThemeProvider >
        </div>
    );
};

export default CustomPagination;
