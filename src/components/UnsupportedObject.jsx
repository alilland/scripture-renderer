import React from "react";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import Badge from "@mui/material/Badge";

function UnsupportedObject({ verseObject }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const content = verseObject.content || verseObject.text;

  return (
    <>
      <Badge
        badgeContent={verseObject.tag}
        variant="standard"
        color="error"
        aria-describedby={id}
        onClick={handleClick}
        sx={{
          margin: (theme) => theme.spacing(2),
        }}
      >
        <span>&nbsp;</span>
      </Badge>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Typography
          sx={{
            padding: theme => theme.spacing(2),
          }}
        >
          {content}
        </Typography>
      </Popover>
    </>
  );
}

UnsupportedObject.propTypes = {
  verseObject: PropTypes.shape({
    tag: PropTypes.string.isRequired,
    content: PropTypes.string,
    text: PropTypes.string,
  }).isRequired,
};

export default UnsupportedObject;
