// ControlledAccordions.js
import Accordion from '@mui/material/Accordion';
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { RepoActivityChart } from "./index";
import { useState } from "react";

const ControlledAccordions = ({ repos }) => {
  const [expanded, setExpanded] = useState(false);

  const handleChange = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <div>Most Starred Repos</div>
      <div>
        {repos ? (
          repos.map(repo => {
            const lastPushedDate = new Date(repo.pushed_at);
            const now = new Date();
            const timeInterval = Math.round((now - lastPushedDate) / (1000 * 60)); // In minutes

            return (
              <Accordion
                expanded={expanded === repo.id}
                key={repo.id}
                onChange={handleChange(repo.id)}
                sx={{ mb: 2 }} // Add some margin between accordions
              >
                <AccordionSummary
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "10px",
                  }}
                  expandIcon={
                    <IconButton
                      onClick={() => setExpanded(!expanded)}
                      size="small"
                      color="inherit"
                      aria-label={expanded ? "Collapse" : "Expand"}
                    >
                      <ExpandMoreIcon />
                    </IconButton>
                  }
                >
                  <Avatar src={repo.owner.avatar_url} />
                  <Typography variant="subtitle1">{repo.name}</Typography>
                  <Typography variant="body2" sx={{ flex: 1 }}>
                    {repo.description}
                  </Typography>
                  <div>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {repo.stargazers_count}
                    </Typography>
                    <Typography variant="body2">stars</Typography>
                  </div>
                  <div>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {repo.open_issues_count}
                    </Typography>
                    <Typography variant="body2">issues</Typography>
                  </div>
                  <Typography variant="body2">
                    Last pushed {timeInterval} minutes ago by {repo.owner.login}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>{repo.full_name}</Typography>
                  <div>
                  <RepoActivityChart owner={repo.owner.login} repo={repo.name} />
                  </div>
                </AccordionDetails>
              </Accordion>
            );
          })
        ) : (
          <div>No data available</div>
        )}
      </div>
    </>
  );
};

export default ControlledAccordions;
