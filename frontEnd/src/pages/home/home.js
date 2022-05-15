import Capture2 from "../../assets/Capture2.PNG";
import omarImage from "../../assets/omarImage.jpeg";
import "bootstrap/dist/css/bootstrap.css";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { Avatar, Box, Button, Container, Divider } from "@mui/material";
import Grid from "@mui/material/Grid";
import "./home.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import EditPage from "../editpage/editPage";

const Home = () => {
  const [toggeler, setToggeler] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      <div>
        <div
          className="d-flex justify-content-between p-3"
          style={{ width: "100%", backgroundColor: "#fafafb" }}
        >
          <div>
            <img
              style={{ width: "27%", display: "inline" }}
              src={Capture2}
              alt=""
            />
            <h4
              style={{
                display: "inline",
                fontWeight: "bold",
                color: "#282051",
              }}
            >
              {" "}
              devchallanges
            </h4>
          </div>
          <div>
            <div class="d-flex flex-row">
              <Avatar
                style={{
                  display: "inline-block",
                  border: "1px solid #BDBDBD",
                  width: "60px",
                  height: "60px",
                  marginRight: "5px",
                }}
                src={omarImage}
              />

              <div>
                <p style={{ fontWeight: "bold", marginTop: "20px" }}>
                  Omar Barakat
                </p>
              </div>
              <div style={{ marginTop: "16px" }}>
                <DropdownButton variant="">
                  <Dropdown.Item href="#/action-1">
                    {" "}
                    <i
                      style={{ marginRight: "10px" }}
                      class="fa-solid fa-user"
                    ></i>
                    My Profile
                  </Dropdown.Item>
                  <Dropdown.Item href="#/action-2">
                    {" "}
                    <i
                      style={{ marginRight: "10px" }}
                      class="fa-solid fa-message"
                    ></i>
                    Group Chat
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item href="#/action-3">
                    <i
                      style={{ marginRight: "10px", color: "red" }}
                      class="fa-solid fa-arrow-right-from-bracket"
                    ></i>
                    <span style={{ color: "red" }}>Logout</span>
                  </Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            width: "100%",

            paddingBottom: "1%",
            backgroundColor: "white",
            textAlign: "center",
            alignContent: "center",
          }}
        >
          <Box sx={{ justifyContent: "center" }}>
            <div>
              <h1>Personal Info</h1>
              <p>Basic info, like your name and photo</p>
            </div>
          </Box>
        </div>
      </div>

      <Container>
        {toggeler ? (
            <>
            <Button
                sx={{
                  padding: "2px",
                  height: "40px",
                  marginBottom:"5px",
                }}
                variant="text"
                onClick={() => {
                  setToggeler(false);
                }}
              >
              <i style={{marginRight:"3px"}} className="fa-solid fa-chevron-left"></i>
                Back
              </Button>
            <EditPage />
            </>
          
        ) : (
          <Box
            sx={{
              borderRadius: "16px",
              border: "2px solid #E0E0E0",
              paddingLeft: "15px",
              paddingRight: "15px",
            }}
          >
            <Box
              style={{ display: "flex", justifyContent: "space-between" }}
              flexGrow={1}
            >
              <div>
                <h3>Profile</h3>
                <p style={{ color: "#828282" }}>
                  Some info may be visible to other people
                </p>
              </div>
              <Button
                sx={{
                  padding: "2px",
                  height: "40px",
                  marginTop: "2%",
                  fontWeight:"bold",
                  color:"#2a83f7"
                }}
                variant=" text"
                onClick={() => {
                  setToggeler(true);
                }}
              >  
                Edit
                <i style={{marginLeft:"7px",marginBottom:"4px"}} class="fa-solid fa-chevron-right"></i>
              </Button>
            </Box>
            <Divider />

            {/********************************* Photo *****************************/}

            <Divider />
            <Grid container style={{ marginTop: "10px" }}>
              <Box
                item
                style={{
                  color: "#BDBDBD",
                  fontSize: "20px",
                  marginTop: "2%",
                  marginBottom: "2%",
                  marginRight: "30%",
                }}
              >
                <p>Photo</p>
              </Box>
              <Box item>
                <Avatar
                  style={{
                    border: "1px solid #BDBDBD",
                    width: "100px",
                    height: "100px",
                  }}
                  src={omarImage}
                />
              </Box>
            </Grid>
            {/********************************* Name *****************************/}

            <Divider />
            <Grid container style={{ marginTop: "10px" }}>
              <Box
                item
                style={{
                  minWidth: "30px",
                  color: "#BDBDBD",
                  fontSize: "20px",
                  marginTop: "2%",
                  marginBottom: "2%",
                  marginRight: "30%",
                }}
              >
                <p>Name</p>
              </Box>
              <Box
                item
                sx={{ marginTop: "2%", marginBottom: "2%", fontSize: "20px" }}
              >
                <p>Omar Barakat</p>
              </Box>
            </Grid>
            {/********************************* Phone *****************************/}

            <Divider />
            <Grid container style={{ marginTop: "10px" }}>
              <Box
                item
                style={{
                  minWidth: "20px",
                  color: "#BDBDBD",
                  fontSize: "20px",
                  marginTop: "2%",
                  marginBottom: "2%",
                  marginRight: "30%",
                }}
              >
                <p>Phone</p>
              </Box>
              <Box
                item
                sx={{ marginTop: "2%", marginBottom: "2%", fontSize: "20px" }}
              >
                <p>+20 01024097151</p>
              </Box>
            </Grid>

            {/********************************* bio *****************************/}

            <Divider />
            <Grid container style={{ marginTop: "10px" }}>
              <Box
                item
                style={{
                  minWidth: "50px",
                  color: "#BDBDBD",
                  fontSize: "20px",
                  marginTop: "2%",
                  marginBottom: "2%",
                  marginRight: "30%",
                }}
              >
                <p>Bio</p>
              </Box>
              <Box
                item
                sx={{ marginTop: "2%", marginBottom: "2%", fontSize: "20px" }}
              >
                <p>Hello that is my first Bio</p>
              </Box>
            </Grid>
            {/********************************* email *****************************/}

            <Divider />
            <Grid container style={{ marginTop: "10px" }}>
              <Box
                item
                style={{
                  color: "#BDBDBD",
                  fontSize: "20px",
                  marginTop: "2%",
                  marginBottom: "2%",
                  marginRight: "30%",
                }}
              >
                <p>Email</p>
              </Box>
              <Box
                item
                sx={{ marginTop: "2%", marginBottom: "2%", fontSize: "20px" }}
              >
                <p>omarparakat@gmail.com</p>
              </Box>
            </Grid>

            <Divider />
            <Grid container style={{ marginTop: "10px" }}>
              <Box
                item
                style={{
                  color: "#BDBDBD",
                  fontSize: "20px",
                  marginTop: "2%",
                  marginRight: "27%",
                }}
              >
                <p>password</p>
              </Box>
              <Box
                item
                sx={{ marginTop: "2%",fontSize: "20px" }}
              >
                <p>123456789</p>
              </Box>
            </Grid>
          </Box>
        )}
      </Container>
    </>
  );
};

export default Home;

{
  /* <a class="navbar-brand">
      
  </a> */
}
