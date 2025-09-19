"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
  Breadcrumbs,
} from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";
import { Fade } from "@mui/material";

const beforeItems = [
  { label: "Emergency Kit", href: "/before/emergency-kit" },
  { label: "Family Flood Plan", href: "/before/family-plan" },
  { label: "Property protection", href: "/before/property-protection" },
];

const duringItems = [
  { label: "Save Shelter", href: "/during/save-shelter" },
  { label: "Communication", href: "/during/communication" },
  { label: "Protect Yourself", href: "/during/protect-yourself" },
];

const afterItems = [
  { label: "Safety check", href: "/after/safety-check" },
  { label: "Clean & Disinfection", href: "/after/clean-disinfection" },
  { label: "Mental support", href: "/after/mental-support" },
];

export default function KnowledgePage() {
  return (
    <Box
      sx={{
        minHeight: "90vh",
        bgcolor: "#bfd6f8ff",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        p: 4,
      }}
    >
      {/* Back button */}
      <Button
        onClick={() => window.history.back()}
        sx={{
          position: "absolute",
          top: 16,
          left: 16,
          color: "#000",
          minWidth: "auto",
          p: 2,
          zIndex: 10,
        }}
      >
        <FaArrowLeft size={20} />
      </Button>

      {/* navigate breadcrumb */}
      <Box sx={{ mb: 4, width: "100%", maxWidth: 1200, mx: "auto" }}>
        <Box
          sx={{
            padding: "10px 20px",
            background: "rgba(255, 255, 255, 0.9)",
            borderRadius: "8px",
            backdropFilter: "blur(10px)",
          }}
        >
          <Breadcrumbs aria-label="breadcrumb" separator="→">
            <span style={{ color: "#1f2937" }}>Homepage</span>
            <Typography
              sx={{
                color: "#1e40af",
                fontWeight: "bold",
                display: "flex",
                alignItems: "center",
              }}
            >
              Knowledge of Facing Flood
            </Typography>
          </Breadcrumbs>
        </Box>
      </Box>

      {/* Main content area - Center using flex layout */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
        }}
      >
        {/* Grid container */}
        <Grid
          container
          spacing={4}
          sx={{
            maxWidth: 1200,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* Before Flood */}
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Fade in={true} timeout={1000} style={{ transitionDelay: "0ms" }}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 6,
                  width: 360,
                  height: 480,
                  bgcolor: "white",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 3,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Be prepared
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    gutterBottom
                  >
                    Prepared today save lives tomorrow
                  </Typography>

                  <Box
                    component="img"
                    src="/images/before.jpg"
                    alt="Flood safety"
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />

                  <Box textAlign="center" width="100%">
                    {beforeItems.map((item) => (
                      <Box key={item.href} sx={{ mb: 2 }}>
                        <Button
                          component={Link}
                          href={item.href}
                          variant="outlined"
                          color="primary"
                          fullWidth
                          sx={{
                            borderRadius: 2,
                            py: 1.2,
                            textTransform: "none",
                            fontWeight: "bold",
                            color: "black",
                            "&:hover": {
                              bgcolor: "primary.light",
                            },
                          }}
                        >
                          {item.label}
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* During Flood */}
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Fade in={true} timeout={1000} style={{ transitionDelay: "200ms" }}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 6,
                  width: 360,
                  height: 480,
                  bgcolor: "white",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 3,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Stay safe
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    gutterBottom
                  >
                    Act fast, stay save, protect your family
                  </Typography>

                  <Box
                    component="img"
                    src="/images/during.jpg"
                    alt="Flood safety"
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />

                  <Box textAlign="center" width="100%">
                    {duringItems.map((item) => (
                      <Box key={item.href} sx={{ mb: 2 }}>
                        <Button
                          component={Link}
                          href={item.href}
                          variant="outlined"
                          color="primary"
                          fullWidth
                          sx={{
                            borderRadius: 2,
                            py: 1.2,
                            textTransform: "none",
                            fontWeight: "bold",
                            color: "black",
                            "&:hover": {
                              bgcolor: "primary.light",
                            },
                          }}
                        >
                          {item.label}
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>

          {/* After Flood */}
          <Grid
            item
            xs={12}
            sm={6}
            lg={4}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Fade in={true} timeout={1000} style={{ transitionDelay: "400ms" }}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 6,
                  width: 360,
                  height: 480,
                  bgcolor: "white",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-8px)",
                    boxShadow: 8,
                  },
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    p: 3,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Recover stronger
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    gutterBottom
                  >
                    Flood over? It's time to rebuild safely
                  </Typography>

                  <Box
                    component="img"
                    src="/images/after.jpg"
                    alt="Flood safety"
                    sx={{
                      width: "100%",
                      height: 200,
                      objectFit: "cover",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  />

                  <Box textAlign="center" width="100%">
                    {afterItems.map((item) => (
                      <Box key={item.href} sx={{ mb: 2 }}>
                        <Button
                          component={Link}
                          href={item.href}
                          variant="outlined"
                          color="primary"
                          fullWidth
                          sx={{
                            borderRadius: 2,
                            py: 1.2,
                            textTransform: "none",
                            fontWeight: "bold",
                            color: "black",
                            "&:hover": {
                              bgcolor: "primary.light",
                            },
                          }}
                        >
                          {item.label}
                        </Button>
                      </Box>
                    ))}
                  </Box>
                </CardContent>
              </Card>
            </Fade>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}
