"use client";

import Link from "next/link";
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Breadcrumbs,
  Fade,
} from "@mui/material";
import { FaArrowLeft } from "react-icons/fa";

const beforeItems = [
  { label: "Emergency Kit", href: "/before/emergency-kit" },
  { label: "Family Flood Plan", href: "/before/family-plan" },
  { label: "Property Protection", href: "/before/property-protection" },
];

const duringItems = [
  {
    label: "Personal Safety Measures",
    href: "/during/personal-safety-measures",
  },
  { label: "Health & Hygiene", href: "/during/health-and-hygiene" },
  {
    label: "Mental & Emotional Wellbeing",
    href: "/during/mental-and-emotional-wellbeing",
  },
];

const afterItems = [
  { label: "Safety check", href: "/after/safety-check" },
  { label: "Clean & Disinfection", href: "/after/clean-disinfection" },
  { label: "Mental support", href: "/after/mental-support" },
];

const cardData = [
  {
    title: "Be prepared",
    subtitle: "Prepared today save lives tomorrow",
    img: "/images/before.jpg",
    items: beforeItems,
    delay: 0,
  },
  {
    title: "Stay safe",
    subtitle: "Act fast, stay save, protect your family",
    img: "/images/during.jpg",
    items: duringItems,
    delay: 200,
  },
  {
    title: "Recover stronger",
    subtitle: "Flood over? It's time to rebuild safely",
    img: "/images/after.jpg",
    items: afterItems,
    delay: 400,
  },
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

      {/* Breadcrumb */}
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
            <span style={{ color: "#1f2937" }}>Home</span>
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

      {/* Main content */}
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          flex: 1,
          width: "100%",
          maxWidth: 1200,
          mx: "auto",
          minHeight: "60vh",
          height:'100vh'
        }}
      >
        {cardData.map((card) => (
          <Fade
            in
            timeout={1000}
            style={{ transitionDelay: `${card.delay}ms` }}
            key={card.title}
          >
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: 6,
                width: { xs: "100%", sm: 360 },
                height: 520,
                bgcolor: "white",
                transition: "transform 0.3s ease, boxShadow 0.3s ease",
                "&:hover": { transform: "translateY(-8px)", boxShadow: 8 },
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                marginBottom: '20px'
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
                  {card.title}
                </Typography>
                <Typography color="text.secondary" variant="body2" gutterBottom>
                  {card.subtitle}
                </Typography>
                <Box
                  component="img"
                  src={card.img}
                  alt={card.title}
                  sx={{
                    width: "100%",
                    height: 200,
                    objectFit: "cover",
                    borderRadius: 2,
                    mb: 2,
                  }}
                />
                <Box textAlign="center" width="100%">
                  {card.items.map((item) => (
                    <Box key={item.href} sx={{ mb: 2 }}>
                      <Button
  component={Link}
  href={item.href}
  variant="contained"
  fullWidth
  sx={{
    borderRadius: 3,
    py: 1.5,
    textTransform: "none",
    fontWeight: 600,
    fontSize: "1rem",
    color: "white",
    background: "linear-gradient(135deg, #6C63FF 0%, #9B5DE5 100%)",
    boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
    transition: "all 0.3s ease",
    "&:hover": {
      background: "linear-gradient(135deg, #5A4DDD 0%, #7F3FBF 100%)",
      transform: "translateY(-2px)",
      boxShadow: "0 6px 16px rgba(0,0,0,0.25)",
    },
    "&:active": {
      transform: "translateY(0px)",
      boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
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
        ))}
      </Box>
    </Box>
  );
}
