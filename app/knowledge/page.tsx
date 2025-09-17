"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  Typography,
  Grid,
  Box,
  Button,
} from "@mui/material";

import ElectricBorder from "../../src/electricBorder/ElectricBorder";
import { Fade } from "@mui/material";

const beforeItems = [
  { label: "Emergency Kit", href: "/before/emergency-kit" },
  { label: "Family Plan", href: "/before/family-plan" },
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
        minHeight: "100vh",
        bgcolor: "black",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 4,
      }}
    >
      {/* Grid container */}
      <Grid container spacing={4} maxWidth="lg" sx={{ mx: "auto" }}>
        <ElectricBorder
          color="#0a60e0ff"
          speed={1}
          chaos={0.5}
          thickness={2}
          style={{ borderRadius: 16 }}
        >
          {/* Before Flood */}
          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={1000} style={{ transitionDelay: "0ms" }}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 6,
                  width: 360,
                  height: 480,
                  bgcolor: "white",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Be prepared before flood
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    gutterBottom
                  >
                    Prepared today save lives tomorrow
                  </Typography>

                  {/* Picture */}
                  <Box
                    sx={{
                      bgcolor: "grey.600",
                      color: "white",
                      width: "100%",
                      height: 128,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    Images
                  </Box>

                  {/* list */}
                  <Box textAlign="center">
                    {beforeItems.map((item) => (
                      <Box key={item.href} sx={{ mb: 1 }}>
                        <Button
                          component={Link}
                          href={item.href}
                          sx={{
                            color: "text.primary",
                            "&:hover": { color: "primary.main" },
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
        </ElectricBorder>

        <ElectricBorder
          color="#0a60e0ff"
          speed={1}
          chaos={0.5}
          thickness={2}
          style={{ borderRadius: 16 }}
        >
          {/* During Flood */}
          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={1000} style={{ transitionDelay: "200ms" }}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 6,
                  width: 360,
                  height: 480,
                  bgcolor: "white",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Stay safe during flood
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    gutterBottom
                  >
                    Act fast, stay save, protect your family
                  </Typography>

                  <Box
                    sx={{
                      bgcolor: "grey.600",
                      color: "white",
                      width: "100%",
                      height: 128,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    Images
                  </Box>

                  <Box textAlign="center">
                    {duringItems.map((item) => (
                      <Box key={item.href} sx={{ mb: 1 }}>
                        <Button
                          component={Link}
                          href={item.href}
                          sx={{
                            color: "text.primary",
                            "&:hover": { color: "primary.main" },
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
        </ElectricBorder>

        <ElectricBorder
          color="#0a60e0ff"
          speed={1}
          chaos={0.5}
          thickness={2}
          style={{ borderRadius: 16 }}
        >
          {/* After Flood */}
          <Grid item xs={12} md={4}>
            <Fade in={true} timeout={1000} style={{ transitionDelay: "400ms" }}>
              <Card
                sx={{
                  borderRadius: 3,
                  boxShadow: 6,
                  width: 360,
                  height: 480,
                  bgcolor: "white",
                }}
              >
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Recover stronger after flood
                  </Typography>
                  <Typography
                    color="text.secondary"
                    variant="body2"
                    gutterBottom
                  >
                    Flood over? It’s time to rebuild safely
                  </Typography>

                  <Box
                    sx={{
                      bgcolor: "grey.600",
                      color: "white",
                      width: "100%",
                      height: 128,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: 2,
                      mb: 2,
                    }}
                  >
                    Images
                  </Box>

                  <Box textAlign="center">
                    {afterItems.map((item) => (
                      <Box key={item.href} sx={{ mb: 1 }}>
                        <Button
                          component={Link}
                          href={item.href}
                          sx={{
                            color: "text.primary",
                            "&:hover": { color: "primary.main" },
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
        </ElectricBorder>
      </Grid>
    </Box>
  );
}
