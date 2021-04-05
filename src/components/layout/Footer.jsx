import React from "react";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";

export default function Footer() {
  return (
    <div>
      <Typography color="textSecondary" align="center">
        Need Help? Call our support team (Toll Free)
      </Typography>
      <Box fontWeight="fontWeightBold">
        <Typography variant="body2" color="textSecondary" align="center">
          1800 266 8787
        </Typography>
      </Box>
    </div>
  );
}
