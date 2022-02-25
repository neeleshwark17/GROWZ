import Box from "@mui/material/Box";
import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { useEffect } from "react";
import axios from "axios";

const useStyles = makeStyles({
  typography: {
    marginBlock: ".5rem",
    padding: "1rem",
  },
});

function App() {
  const addItem = (type, value) => {
    createItem(type, value);
  };
  const [error, setError] = useState(null);
  const [error2, setError2] = useState(null);
  const [currentElement, setCurrentElement] = useState(null);
  const [results, setResults] = useState(null);
  const classes = useStyles();

  const removeAllChildNodes = (parent) => {
    while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
    }
  };
  const createItem = (type, value) => {
    let b = document.getElementById("box");
    removeAllChildNodes(b);
    setCurrentElement(null);

    var element = document.createElement("input");
    element.type = type;
    element.required = true;
    element.value = value;
    element.style.marginBlock = "2rem";
    element.className = type;
    element.id = type;
    if (!document.getElementById(type)) {
      document.getElementById("box").appendChild(element);
      setCurrentElement(type);
    } else {
      console.log("already present");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!document.getElementById("box").hasChildNodes()) {
      alert("Insert an element to sumbit!!");
      return;
    }
    if (!document.getElementById(currentElement).value) {
      alert("Enter some value!!");
      return;
    }

    let val = document.getElementById(currentElement);
    console.log("Submit", val.value);
    axios
      .post("http://localhost:4000/amazon/update/bid", {
        id: document.getElementById("id").value,
        config_user_has_to_input: val.value,
        update_bid_to: currentElement,
      })
      .then((response) => {
        if (response.data.code == "invalidId") {
          console.log("ERror", response);
          setError(true);
          setTimeout(() => {
            setError(null);
          }, 2000);
        } else {
          console.log("GOT ---->", response);
          val.value = "";
          document.getElementById("id").value = "";
          alert("Updated bid!");
        }
      });
  };

  const handleRecords = (e) => {
    e.preventDefault();
    let id = document.getElementById("getID").value;

    axios.get(`http://localhost:4000/amazon/getBid/${id}`).then((response) => {
      console.log("ERror", response);

      if (response.data.code == "errFinding") {
        console.log("ERror", response);
        setError2(true);
        setTimeout(() => {
          setError2(null);
        }, 2000);
      } else {
        // console.log("GOT ---->", response);
        setResults(response);
        console.log(results.data.msg[0]);
      }
    });
  };

  useEffect(() => {
    console.log("Called--->");
  }, [currentElement, results]);

  var elementArr = ["color", "text", "date", "datetime-local"];
  return (
    <>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        flexDirection="column"
      >
        <Typography variant="h4" fontWeight="bold" m={2}>
          Insert elements
        </Typography>

        <Box display="flex" alignItems="center" width="fit-content">
          {elementArr.map((elem, key) => (
            <Box
              display="flex"
              flexDirection="column"
              alignItems="center"
              key={key}
            >
              <Typography variant="body" mx={1}>
                ID:{key}
              </Typography>
              <Button
                id="btns"
                onClick={() => addItem(elem, elem)}
                sx={{
                  background: "#FFA41C",
                  margin: "1em",
                  color: "black",
                }}
              >
                {elem}
              </Button>
            </Box>
          ))}
        </Box>

        <Box className={classes.box} display="flex" justifyContent="center">
          <Grid
            container
            style={{
              // background: "lightcyan",
              width: "fit-content",
            }}
          >
            <Grid item xs={12} sm={6} md={4} lg={4} xl={3}></Grid>
            <Box width="60vw" display="flex" justifyContent="center">
              <Box bgcolor="white">
                <form
                  onSubmit={(e) => handleSubmit(e)}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h5" className={classes.typography}>
                    Your element will be shown here
                  </Typography>
                  <TextField
                    id="id"
                    name="id"
                    type="number"
                    placeholder="ID"
                    required
                    variant="outlined"
                  />

                  {error && (
                    <Typography
                      variant="h6"
                      sx={{
                        color: "red",
                        fontWeight: "bold",
                      }}
                    >
                      Invalid Id!
                    </Typography>
                  )}

                  <Typography
                    variant="h6"
                    className={classes.typography}
                    sx={{
                      textTransform: "uppercase",
                    }}
                  >
                    {currentElement && currentElement}
                  </Typography>
                  <Box id="box"></Box>
                  <Button
                    variant="contained"
                    type="submit"
                    onClick={() => onsubmit}
                  >
                    Sumbit
                  </Button>
                </form>
              </Box>
            </Box>
          </Grid>
        </Box>
      </Box>
      <Container sx={{ mt: 5 }}>
        <Typography
          variant="h4"
          className={classes.typography}
          sx={{
            textTransform: "uppercase",
          }}
        >
          Check data in Growz Config
        </Typography>
        <form
          onSubmit={(e) => handleRecords(e)}
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <TextField
            id="getID"
            name="getID"
            type="number"
            placeholder="ID"
            required
            variant="outlined"
          />

          {error2 && (
            <Typography
              variant="h6"
              sx={{
                color: "red",
                fontWeight: "bold",
              }}
            >
              Invalid Id!
            </Typography>
          )}

          <Box id="box"></Box>
          <Button
            variant="contained"
            type="submit"
            sx={{
              marginTop: 2,
            }}
            onClick={() => onsubmit}
          >
            Sumbit
          </Button>
        </form>
        <Box>
          {results && (
            <Grid
              container
              sx={{
                mt: 5,
              }}
            >
              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                xs={6}
                sm={6}
                sx={{
                  border: "1px solid lightgray",
                }}
              >
                <Typography variant="subtitle2" m={2}>
                  updated_bid_to
                </Typography>
              </Grid>
              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                xs={6}
                sm={6}
                sx={{
                  border: "1px solid lightgray",
                }}
              >
                <Typography variant="subtitle2" m={2}>
                  {results.data.msg[0].config_type.update_bid_to}
                </Typography>
              </Grid>
              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                xs={6}
                sm={6}
                sx={{
                  border: "1px solid lightgray",
                }}
              >
                <Typography variant="subtitle2" m={2}>
                  config_user_has_to_input
                </Typography>
              </Grid>
              <Grid
                item
                xl={6}
                lg={6}
                md={6}
                xs={6}
                sm={6}
                sx={{
                  border: "1px solid lightgray",
                }}
              >
                <Typography variant="subtitle2" m={2}>
                  {results.data.msg[0].config_user_has_to_input.update_bid_to}
                </Typography>
              </Grid>
            </Grid>
          )}
        </Box>
      </Container>
    </>
  );
}

export default App;
