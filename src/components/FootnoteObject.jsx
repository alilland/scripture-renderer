import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import Badge from "@mui/material/Badge";

function FootnoteObject ({ verseObject }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <>
      <Badge
        sx={{
          margin: (theme) => theme.spacing(1),
          top: (theme) => theme.spacing(1),
          right: (theme) => theme.spacing(0.25),
        }}
        badgeContent="fn"
        color="primary"
        aria-describedby={id}
        variant="standard"
        onClick={handleOpen}
      >
        <span>&nbsp;</span>
      </Badge>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Typography sx={{ padding: (theme) => theme.spacing(1) }}>
          {verseObject.content}
        </Typography>
      </Popover>
    </>
  );
}

FootnoteObject.propTypes = {
  verseObject: PropTypes.shape({
    tag: PropTypes.string,
    type: PropTypes.string,
    content: PropTypes.string,
  }).isRequired,
};

export default FootnoteObject;
