import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Box,
  Modal,
  IconButton,
  CircularProgress,
  Alert,
  AppBar,
  Toolbar,
  Stack,
  Avatar,
  Divider,
  Badge,
  Fade,
  Grow,
  Zoom,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Search,
  FilterList,
  Phone,
  Email,
  Close,
  Star,
  Business,
  LocationOn,
  Category as CategoryIcon,
  AccessTime,
  TrendingUp,
  Launch,
  CalendarToday,
  Verified,
  FavoriteBorder,
  Favorite,
  Sort,
} from "@mui/icons-material";
import servicesData from "../data/services.json";

const ServiceDirectory = () => {
  const [services, setServices] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");
  const [selectedService, setSelectedService] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [sortBy, setSortBy] = useState("default");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const colors = {
    primary: "#667eea",
    secondary: "#764ba2",
    accent: "#f093fb",
    success: "#4CAF50",
    warning: "#FF9800",
    error: "#f44336",
    info: "#2196F3",
    dark: "#2d3748",
    light: "#f8f9ff",
    gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    gradientLight: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    gradientCard: "linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%)",
  };

  const categories = [
    "all",
    ...new Set(servicesData.map((service) => service.category)),
  ];
  const cities = [
    "all",
    ...new Set(servicesData.map((service) => service.city)),
  ];

  useEffect(() => {
    setTimeout(() => {
      setServices(servicesData);
      setFilteredServices(servicesData);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    let result = [...services];

    if (searchTerm) {
      result = result.filter(
        (service) =>
          service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.tagline.toLowerCase().includes(searchTerm.toLowerCase()) ||
          service.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== "all") {
      result = result.filter((service) => service.category === categoryFilter);
    }

    if (cityFilter !== "all") {
      result = result.filter((service) => service.city === cityFilter);
    }

    if (sortBy === "rating") {
      result.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "reviews") {
      result.sort((a, b) => b.reviews - a.reviews);
    } else if (sortBy === "name") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    setFilteredServices(result);
  }, [searchTerm, categoryFilter, cityFilter, services, sortBy]);

  const handleOpenModal = (service) => {
    setSelectedService(service);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedService(null);
  };

  const handleCall = (phone) => {
    window.location.href = `tel:${phone}`;
  };

  const handleEmail = (email) => {
    window.location.href = `mailto:${email}`;
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setCityFilter("all");
    setSortBy("default");
  };

  const toggleFavorite = (id, e) => {
    e.stopPropagation();
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]
    );
  };

  const getCategoryColor = (category) => {
    const colorMap = {
      Cleaning: "#4CAF50",
      Technology: "#2196F3",
      "Home Services": "#FF9800",
      "Professional Services": "#9C27B0",
      "Health & Wellness": "#f44336",
      "Pet Services": "#FF5722",
      default: colors.primary,
    };
    return colorMap[category] || colorMap.default;
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          background: colors.gradient,
        }}
      >
        <Fade in={true}>
          <Box sx={{ textAlign: "center" }}>
            <CircularProgress
              size={60}
              thickness={4}
              sx={{
                color: "white",
                mb: 2,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                color: "white",
                fontWeight: 500,
                letterSpacing: "1px",
              }}
            >
              Loading Services...
            </Typography>
          </Box>
        </Fade>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f5f7fa 0%, #e4e8f0 100%)",
        pb: 6,
      }}
    >
      <AppBar
        position="sticky"
        sx={{
          background: colors.gradient,
          boxShadow: "0 8px 32px rgba(102, 126, 234, 0.2)",
          borderRadius: "0 0 20px 20px",
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexGrow: 1,
            }}
          >
            <Business
              sx={{
                mr: 2,
                fontSize: { xs: 28, sm: 32 },
                color: "white",
                filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.2))",
              }}
            />
            <Box>
              <Typography
                variant="h5"
                sx={{
                  color: "white",
                  fontWeight: 700,
                  letterSpacing: "-0.5px",
                  background:
                    "linear-gradient(90deg, #ffffff 0%, #e0e7ff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontSize: { xs: "1.25rem", sm: "1.5rem" },
                }}
              >
                ServiceHub
              </Typography>
              <Typography
                variant="caption"
                sx={{
                  color: "rgba(255,255,255,0.8)",
                  fontSize: { xs: "0.6rem", sm: "0.7rem" },
                  letterSpacing: "1px",
                  display: { xs: "none", sm: "block" },
                }}
              >
                FIND & CONNECT WITH TRUSTED SERVICES
              </Typography>
            </Box>
          </Box>
          <Badge
            badgeContent={favorites.length}
            color="error"
            sx={{
              "& .MuiBadge-badge": {
                background: colors.accent,
                boxShadow: "0 0 10px rgba(240, 147, 251, 0.5)",
                fontSize: { xs: 10, sm: 12 },
              },
            }}
          >
            <Favorite
              sx={{
                color: "white",
                fontSize: { xs: 24, sm: 28 },
                cursor: "pointer",
                transition: "transform 0.3s",
                "&:hover": {
                  transform: "scale(1.1)",
                },
              }}
            />
          </Badge>
        </Toolbar>
      </AppBar>

      <Container maxWidth="xl" sx={{ py: 4, px: { xs: 2, sm: 3, md: 4 } }}>
        <Grow in={true} timeout={500}>
          <Box
            sx={{
              mb: 4,
              p: { xs: 2, sm: 3 },
              background: "white",
              borderRadius: 4,
              boxShadow: "0 20px 60px rgba(102, 126, 234, 0.08)",
              border: "1px solid rgba(102, 126, 234, 0.1)",
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
                width: 200,
                height: 200,
                background:
                  "radial-gradient(circle, rgba(102, 126, 234, 0.1) 0%, transparent 70%)",
                zIndex: 0,
                display: { xs: "none", sm: "block" },
              }}
            />
            <Typography
              variant="h4"
              sx={{
                mb: 3,
                fontWeight: 700,
                color: colors.dark,
                position: "relative",
                zIndex: 1,
                fontSize: { xs: "1.5rem", sm: "2rem", md: "2.125rem" },
              }}
            >
              Discover Amazing Services
            </Typography>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
                alignItems: { xs: "stretch", md: "center" },
              }}
            >
              <Box
                sx={{
                  flex: { md: 1 },
                  minWidth: 0,
                }}
              >
                <TextField
                  fullWidth
                  label="Search services, keywords, or tags"
                  variant="outlined"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <Search
                        sx={{
                          mr: 1,
                          color: colors.primary,
                          fontSize: { xs: 20, sm: 24 },
                        }}
                      />
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: 3,
                      background: "#f8f9ff",
                      transition: "all 0.3s",
                      "&:hover": {
                        background: "#f0f2ff",
                      },
                      "&.Mui-focused": {
                        background: "white",
                        boxShadow: `0 0 0 3px ${colors.primary}20`,
                      },
                    },
                  }}
                  size={isMobile ? "small" : "medium"}
                />
              </Box>

              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 2,
                  minWidth: { md: 600 },
                  width: { xs: "100%", md: "auto" },
                }}
              >
                <FormControl
                  sx={{
                    flex: 1,
                    minWidth: { xs: "100%", sm: 180 },
                  }}
                  size={isMobile ? "small" : "medium"}
                >
                  <InputLabel sx={{ color: colors.dark }}>Category</InputLabel>
                  <Select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    label="Category"
                    renderValue={(selected) =>
  selected === "all" ? (
    "All Categories"
  ) : (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 1,
        maxWidth: "100%",          // 🔥 REQUIRED
        overflow: "hidden",
      }}
    >
      <Box
        sx={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background: getCategoryColor(selected),
          flexShrink: 0,            // 🔥 KEEP DOT VISIBLE
        }}
      />
      <Typography
        sx={{
          fontSize: isMobile ? 13 : 14,
          color: colors.dark,
          whiteSpace: "nowrap",     // 🔥 REQUIRED
          overflow: "hidden",       // 🔥 REQUIRED
          textOverflow: "ellipsis", // 🔥 REQUIRED
        }}
      >
        {selected}
      </Typography>
    </Box>
  )
}

                    startAdornment={
                      <FilterList
                        sx={{
                          mr: 1,
                          color: colors.primary,
                          fontSize: { xs: 18, sm: 20 },
                        }}
                      />
                    }
                    sx={{
                      borderRadius: 3,
                      "& .MuiSelect-select": {
                        display: "flex",
                        alignItems: "center",
                      },
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(102, 126, 234, 0.2)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary,
                      },
                    }}
                  >
                    {categories.map((category) => (
                      <MenuItem
                        key={category}
                        value={category}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          py: 1,
                        }}
                      >
                        {category === "all" ? (
                          "All Categories"
                        ) : (
                          <>
                            <Box
                              sx={{
                                width: 10,
                                height: 10,
                                borderRadius: "50%",
                                background: getCategoryColor(category),
                              }}
                            />
                            {category}
                          </>
                        )}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl
                  sx={{
                    flex: 1,
                    minWidth: { xs: "100%", sm: 180 },
                  }}
                  size={isMobile ? "small" : "medium"}
                >
                  <InputLabel sx={{ color: colors.dark }}>City</InputLabel>
                  <Select
                    value={cityFilter}
                    onChange={(e) => setCityFilter(e.target.value)}
                    label="City"
                    startAdornment={
                      <LocationOn
                        sx={{
                          mr: 1,
                          color: colors.primary,
                          fontSize: { xs: 18, sm: 20 },
                        }}
                      />
                    }
                    sx={{
                      borderRadius: 3,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(102, 126, 234, 0.2)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary,
                      },
                    }}
                  >
                    {cities.map((city) => (
                      <MenuItem
                        key={city}
                        value={city}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          py: 1,
                        }}
                      >
                        {city === "all" ? (
                          "All Cities"
                        ) : (
                          <>
                            <LocationOn
                              sx={{
                                fontSize: 16,
                                color: colors.secondary,
                              }}
                            />
                            {city}
                          </>
                        )}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>

                <FormControl
                  sx={{
                    flex: 1,
                    minWidth: { xs: "100%", sm: 180 },
                  }}
                  size={isMobile ? "small" : "medium"}
                >
                  <InputLabel sx={{ color: colors.dark }}>Sort By</InputLabel>
                  <Select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    label="Sort By"
                    startAdornment={
                      <Sort
                        sx={{
                          mr: 1,
                          color: colors.primary,
                          fontSize: { xs: 18, sm: 20 },
                        }}
                      />
                    }
                    sx={{
                      borderRadius: 3,
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "rgba(102, 126, 234, 0.2)",
                      },
                      "&:hover .MuiOutlinedInput-notchedOutline": {
                        borderColor: colors.primary,
                      },
                    }}
                  >
                    <MenuItem value="default" sx={{ py: 1 }}>
                      Default
                    </MenuItem>
                    <MenuItem value="rating" sx={{ py: 1 }}>
                      Highest Rated
                    </MenuItem>
                    <MenuItem value="reviews" sx={{ py: 1 }}>
                      Most Reviews
                    </MenuItem>
                    <MenuItem value="name" sx={{ py: 1 }}>
                      Name A-Z
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            <Box
              sx={{
                mt: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: colors.dark,
                  fontWeight: 500,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  fontSize: { xs: "0.9rem", sm: "1rem" },
                }}
              >
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    background: colors.gradient,
                  }}
                />
                {filteredServices.length} services found
                <Box
                  component="span"
                  sx={{
                    ml: 1,
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 20,
                    background: colors.gradient,
                    color: "white",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  {filteredServices.length === services.length
                    ? "All"
                    : "Filtered"}
                </Box>
              </Typography>

              <Button
                variant="outlined"
                onClick={handleResetFilters}
                startIcon={<Close />}
                size={isMobile ? "small" : "medium"}
                sx={{
                  borderRadius: 3,
                  borderColor: "rgba(102, 126, 234, 0.3)",
                  color: colors.primary,
                  fontWeight: 500,
                  "&:hover": {
                    borderColor: colors.primary,
                    background: "rgba(102, 126, 234, 0.04)",
                    transform: "translateY(-2px)",
                    boxShadow: `0 4px 12px ${colors.primary}20`,
                  },
                  transition: "all 0.3s",
                }}
              >
                Clear All
              </Button>
            </Box>

            {(searchTerm ||
              categoryFilter !== "all" ||
              cityFilter !== "all" ||
              sortBy !== "default") && (
              <Fade in={true}>
                <Box
                  sx={{
                    mt: 2,
                    pt: 2,
                    borderTop: "1px dashed rgba(102, 126, 234, 0.2)",
                  }}
                >
                  <Typography
                    variant="caption"
                    sx={{
                      color: colors.dark,
                      opacity: 0.7,
                      mb: 1,
                      display: "block",
                      fontSize: { xs: "0.75rem", sm: "0.875rem" },
                    }}
                  >
                    Active Filters:
                  </Typography>
                  <Stack
                    direction="row"
                    spacing={1}
                    flexWrap="wrap"
                    useFlexGap
                    sx={{ gap: 1 }}
                  >
                    {searchTerm && (
                      <Chip
                        label={`"${searchTerm}"`}
                        onDelete={() => setSearchTerm("")}
                        size="small"
                        deleteIcon={<Close />}
                        sx={{
                          borderRadius: 20,
                          background: colors.gradient,
                          color: "white",
                          fontWeight: 500,
                          "& .MuiChip-deleteIcon": {
                            color: "white",
                            "&:hover": {
                              color: "#e0e7ff",
                            },
                          },
                          "&:hover": {
                            transform: "scale(1.05)",
                          },
                          transition: "transform 0.2s",
                          fontSize: { xs: "0.7rem", sm: "0.8125rem" },
                        }}
                      />
                    )}
                    {categoryFilter !== "all" && (
                      <Chip
                        icon={
                          <CategoryIcon sx={{ fontSize: { xs: 14, sm: 16 } }} />
                        }
                        label={categoryFilter}
                        onDelete={() => setCategoryFilter("all")}
                        size="small"
                        sx={{
                          borderRadius: 20,
                          background: getCategoryColor(categoryFilter) + "20",
                          color: getCategoryColor(categoryFilter),
                          border: `1px solid ${getCategoryColor(
                            categoryFilter
                          )}40`,
                          fontWeight: 500,
                          fontSize: { xs: "0.7rem", sm: "0.8125rem" },
                        }}
                      />
                    )}
                    {cityFilter !== "all" && (
                      <Chip
                        icon={
                          <LocationOn sx={{ fontSize: { xs: 14, sm: 16 } }} />
                        }
                        label={cityFilter}
                        onDelete={() => setCityFilter("all")}
                        size="small"
                        sx={{
                          borderRadius: 20,
                          background: colors.gradient + "20",
                          color: colors.secondary,
                          border: `1px solid ${colors.secondary}40`,
                          fontWeight: 500,
                          fontSize: { xs: "0.7rem", sm: "0.8125rem" },
                        }}
                      />
                    )}
                    {sortBy !== "default" && (
                      <Chip
                        icon={
                          <TrendingUp sx={{ fontSize: { xs: 14, sm: 16 } }} />
                        }
                        label={
                          sortBy === "rating"
                            ? "Top Rated"
                            : sortBy === "reviews"
                            ? "Most Reviews"
                            : "A-Z"
                        }
                        onDelete={() => setSortBy("default")}
                        size="small"
                        sx={{
                          borderRadius: 20,
                          background: colors.accent + "20",
                          color: colors.accent,
                          border: `1px solid ${colors.accent}40`,
                          fontWeight: 500,
                          fontSize: { xs: "0.7rem", sm: "0.8125rem" },
                        }}
                      />
                    )}
                  </Stack>
                </Box>
              </Fade>
            )}
          </Box>
        </Grow>

        {filteredServices.length === 0 ? (
          <Zoom in={true}>
            <Alert
              severity="info"
              sx={{
                mt: 4,
                borderRadius: 3,
                background: "white",
                boxShadow: "0 10px 40px rgba(102, 126, 234, 0.1)",
                "& .MuiAlert-icon": {
                  fontSize: { xs: 24, sm: 32 },
                  color: colors.primary,
                },
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  color: colors.dark,
                  mb: 1,
                  fontSize: { xs: "1rem", sm: "1.25rem" },
                }}
              >
                No services found
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: colors.dark,
                  opacity: 0.7,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                }}
              >
                Try adjusting your search or filters to find what you're looking
                for.
              </Typography>
              <Button
                variant="contained"
                onClick={handleResetFilters}
                sx={{
                  mt: 2,
                  background: colors.gradient,
                  borderRadius: 3,
                  textTransform: "none",
                  fontWeight: 500,
                  fontSize: { xs: "0.875rem", sm: "1rem" },
                  py: { xs: 0.75, sm: 1 },
                  "&:hover": {
                    background: colors.gradient,
                    transform: "translateY(-2px)",
                    boxShadow: `0 8px 20px ${colors.primary}40`,
                  },
                  transition: "all 0.3s",
                }}
              >
                Show All Services
              </Button>
            </Alert>
          </Zoom>
        ) : (
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                md: "repeat(3, 1fr)",
                lg: "repeat(3, 1fr)",
                xl: "repeat(3, 1fr)",
              },
              gap: { xs: 2, sm: 3 },
            }}
          >
            {filteredServices.map((service, index) => (
              <Box key={service.id}>
                <Grow in={true} timeout={index * 100 + 300}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      background: colors.gradientCard,
                      borderRadius: { xs: 3, sm: 4 },
                      overflow: "hidden",
                      border: "1px solid rgba(102, 126, 234, 0.1)",
                      position: "relative",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                      "&:hover": {
                        transform: {
                          xs: "translateY(-6px)",
                          sm: "translateY(-12px)",
                        },
                        boxShadow: `0 ${isMobile ? "15px 30px" : "30px 60px"} ${
                          colors.primary
                        }20`,
                        "& .service-image": {
                          transform: "scale(1.05)",
                        },
                        "& .service-actions": {
                          opacity: 1,
                          transform: "translateY(0)",
                        },
                      },
                      "&::before": {
                        content: '""',
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 4,
                        background: getCategoryColor(service.category),
                        zIndex: 1,
                      },
                    }}
                    onClick={() => handleOpenModal(service)}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: { xs: 2, sm: 3 },
                        pb: { xs: 1.5, sm: 2 },
                        gap: { xs: 1.5, sm: 2 },
                        background: `linear-gradient(135deg, ${getCategoryColor(
                          service.category
                        )}10 0%, transparent 100%)`,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        className="service-image"
                        sx={{
                          width: { xs: 56, sm: 70 },
                          height: { xs: 56, sm: 70 },
                          minWidth: { xs: 56, sm: 70 },
                          borderRadius: { xs: 12, sm: 16 },
                          background: `linear-gradient(135deg, ${getCategoryColor(
                            service.category
                          )} 0%, ${getCategoryColor(service.category)}80 100%)`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "transform 0.4s",
                          boxShadow: `0 8px 16px ${getCategoryColor(
                            service.category
                          )}40`,
                          position: "relative",
                          zIndex: 2,
                        }}
                      >
                        <Business
                          sx={{
                            fontSize: { xs: 26, sm: 32 },
                            color: "white",
                          }}
                        />
                      </Box>

                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            color: colors.dark,
                            mb: 0.5,
                            lineHeight: 1.3,
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical",
                            fontSize: { xs: "0.95rem", sm: "1.125rem" },
                          }}
                        >
                          {service.name}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                            mb: 1,
                            flexWrap: "wrap",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "center",
                            }}
                          >
                            <Star
                              sx={{
                                color: "#FFB400",
                                fontSize: { xs: 14, sm: 16 },
                                mr: 0.5,
                              }}
                            />
                            <Typography
                              variant="body2"
                              sx={{
                                fontWeight: 600,
                                color: colors.dark,
                                fontSize: { xs: "0.8rem", sm: "0.875rem" },
                              }}
                            >
                              {service.rating}
                            </Typography>
                            <Typography
                              variant="caption"
                              sx={{
                                color: colors.dark,
                                opacity: 0.6,
                                ml: 0.5,
                                fontSize: { xs: "0.7rem", sm: "0.75rem" },
                              }}
                            >
                              ({service.reviews})
                            </Typography>
                          </Box>
                          <Verified
                            sx={{
                              color: "#4CAF50",
                              fontSize: { xs: 14, sm: 16 },
                              ml: 0.5,
                            }}
                          />
                        </Box>
                      </Box>

                      <IconButton
                        onClick={(e) => toggleFavorite(service.id, e)}
                        sx={{
                          position: "absolute",
                          top: { xs: 12, sm: 16 },
                          right: { xs: 12, sm: 16 },
                          background: "rgba(255, 255, 255, 0.9)",
                          backdropFilter: "blur(10px)",
                          zIndex: 2,
                          width: { xs: 32, sm: 40 },
                          height: { xs: 32, sm: 40 },
                          "&:hover": {
                            background: "white",
                            transform: "scale(1.1)",
                          },
                          transition: "all 0.3s",
                        }}
                      >
                        {favorites.includes(service.id) ? (
                          <Favorite
                            sx={{
                              color: colors.accent,
                              fontSize: { xs: 18, sm: 20 },
                            }}
                          />
                        ) : (
                          <FavoriteBorder
                            sx={{
                              color: colors.dark,
                              fontSize: { xs: 18, sm: 20 },
                            }}
                          />
                        )}
                      </IconButton>
                    </Box>

                    <CardContent
                      sx={{
                        flexGrow: 1,
                        p: { xs: 2, sm: 3 },
                        pt: { xs: 1, sm: 1 },
                        position: "relative",
                        zIndex: 1,
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: colors.dark,
                          opacity: 0.8,
                          mb: { xs: 1.5, sm: 2 },
                          minHeight: { xs: 36, sm: 40 },
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          flexGrow: 1,
                          fontStyle: "italic",
                          fontSize: { xs: "0.8rem", sm: "0.875rem" },
                          lineHeight: 1.4,
                        }}
                      >
                        "{service.tagline}"
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                          mb: { xs: 1.5, sm: 2 },
                        }}
                      >
                        <Chip
                          icon={
                            <CategoryIcon
                              sx={{ fontSize: { xs: 10, sm: 12 } }}
                            />
                          }
                          label={service.category}
                          size="small"
                          sx={{
                            borderRadius: 20,
                            background:
                              getCategoryColor(service.category) + "20",
                            color: getCategoryColor(service.category),
                            fontWeight: 500,
                            fontSize: { xs: "0.65rem", sm: "0.7rem" },
                            maxWidth: "100%",
                            height: { xs: 20, sm: 24 },
                            "& .MuiChip-label": {
                              px: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            },
                          }}
                        />
                        <Chip
                          icon={
                            <LocationOn sx={{ fontSize: { xs: 10, sm: 12 } }} />
                          }
                          label={service.city}
                          size="small"
                          sx={{
                            borderRadius: 20,
                            background: colors.gradient + "20",
                            color: colors.secondary,
                            fontWeight: 500,
                            fontSize: { xs: "0.65rem", sm: "0.7rem" },
                            maxWidth: "100%",
                            height: { xs: 20, sm: 24 },
                            "& .MuiChip-label": {
                              px: 1,
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            },
                          }}
                        />
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mt: "auto",
                          pt: { xs: 1.5, sm: 2 },
                          borderTop: "1px solid rgba(102, 126, 234, 0.1)",
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <AccessTime
                            sx={{
                              color: colors.primary,
                              fontSize: { xs: 14, sm: 16 },
                              opacity: 0.7,
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: colors.dark,
                              opacity: 0.7,
                              fontSize: { xs: "0.65rem", sm: "0.75rem" },
                            }}
                          >
                            {service.hours
                              ? service.hours.split(",")[0]
                              : "Mon-Fri"}
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <CalendarToday
                            sx={{
                              color: colors.accent,
                              fontSize: { xs: 14, sm: 16 },
                              opacity: 0.7,
                            }}
                          />
                          <Typography
                            variant="caption"
                            sx={{
                              color: colors.dark,
                              opacity: 0.7,
                              fontSize: { xs: "0.65rem", sm: "0.75rem" },
                            }}
                          >
                            Est. {service.established}
                          </Typography>
                        </Box>
                      </Box>
                    </CardContent>

                    <Box
                      className="service-actions"
                      sx={{
                        opacity: 0,
                        transform: "translateY(20px)",
                        transition: "all 0.3s",
                      }}
                    >
                      <Divider />
                      <CardActions
                        sx={{
                          justifyContent: "space-between",
                          p: { xs: 1.5, sm: 2 },
                          gap: 1,
                        }}
                      >
                        <Button
                          size="small"
                          startIcon={<Phone />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCall(service.phone);
                          }}
                          sx={{
                            borderRadius: 20,
                            background: colors.gradient,
                            color: "white",
                            fontWeight: 500,
                            px: { xs: 1.5, sm: 2 },
                            flex: 1,
                            minWidth: 0,
                            fontSize: { xs: "0.7rem", sm: "0.8rem" },
                            py: { xs: 0.5, sm: 0.625 },
                            "&:hover": {
                              background: colors.gradient,
                              transform: "translateY(-2px)",
                              boxShadow: `0 6px 15px ${colors.primary}40`,
                            },
                            transition: "all 0.3s",
                          }}
                        >
                          Call Now
                        </Button>
                        <Button
                          size="small"
                          startIcon={<Email />}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEmail(service.email);
                          }}
                          sx={{
                            borderRadius: 20,
                            border: `1px solid ${colors.primary}`,
                            color: colors.primary,
                            fontWeight: 500,
                            px: { xs: 1.5, sm: 2 },
                            flex: 1,
                            minWidth: 0,
                            fontSize: { xs: "0.7rem", sm: "0.8rem" },
                            py: { xs: 0.5, sm: 0.625 },
                            "&:hover": {
                              background: "rgba(102, 126, 234, 0.04)",
                              transform: "translateY(-2px)",
                            },
                            transition: "all 0.3s",
                          }}
                        >
                          Email
                        </Button>
                      </CardActions>
                    </Box>
                  </Card>
                </Grow>
              </Box>
            ))}
          </Box>
        )}
      </Container>

      <Modal
        open={openModal}
        onClose={handleCloseModal}
        closeAfterTransition
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: { xs: 2, sm: 3 },
        }}
      >
        <Fade in={openModal}>
          <Box
            sx={{
              width: "100%",
              maxWidth: { xs: "100%", sm: 800 },
              maxHeight: { xs: "100%", sm: "90vh" },
              height: { xs: "100%", sm: "auto" },
              overflow: "auto",
              background: colors.gradientCard,
              borderRadius: { xs: 0, sm: 4 },
              boxShadow: { xs: "none", sm: `0 40px 80px ${colors.primary}30` },
              border: { xs: "none", sm: "1px solid rgba(102, 126, 234, 0.2)" },
              "&::-webkit-scrollbar": {
                width: 8,
              },
              "&::-webkit-scrollbar-track": {
                background: "#f1f1f1",
                borderRadius: 4,
              },
              "&::-webkit-scrollbar-thumb": {
                background: colors.gradient,
                borderRadius: 4,
              },
            }}
          >
            {selectedService && (
              <>
                <Box
                  sx={{
                    background: `linear-gradient(135deg, ${getCategoryColor(
                      selectedService.category
                    )} 0%, ${getCategoryColor(
                      selectedService.category
                    )}80 100%)`,
                    p: { xs: 2, sm: 3, md: 4 },
                    borderTopLeftRadius: { xs: 0, sm: 16 },
                    borderTopRightRadius: { xs: 0, sm: 16 },
                    position: "relative",
                    overflow: "hidden",
                  }}
                >
                  <IconButton
                    onClick={handleCloseModal}
                    sx={{
                      position: "absolute",
                      top: { xs: 12, sm: 16 },
                      right: { xs: 12, sm: 16 },
                      background: "rgba(255, 255, 255, 0.2)",
                      backdropFilter: "blur(10px)",
                      color: "white",
                      "&:hover": {
                        background: "rgba(255, 255, 255, 0.3)",
                        transform: "rotate(90deg)",
                      },
                      transition: "all 0.3s",
                      width: { xs: 36, sm: 40 },
                      height: { xs: 36, sm: 40 },
                    }}
                  >
                    <Close sx={{ fontSize: { xs: 20, sm: 24 } }} />
                  </IconButton>

                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      gap: { xs: 2, sm: 3 },
                      flexDirection: { xs: "column", sm: "row" },
                      textAlign: { xs: "center", sm: "left" },
                    }}
                  >
                    <Avatar
                      sx={{
                        width: { xs: 60, sm: 70, md: 80 },
                        height: { xs: 60, sm: 70, md: 80 },
                        background: "rgba(255, 255, 255, 0.2)",
                        backdropFilter: "blur(10px)",
                        border: "2px solid rgba(255, 255, 255, 0.3)",
                      }}
                    >
                      <Business
                        sx={{
                          fontSize: { xs: 30, sm: 35, md: 40 },
                          color: "white",
                        }}
                      />
                    </Avatar>
                    <Box>
                      <Typography
                        variant="h4"
                        sx={{
                          color: "white",
                          fontWeight: 800,
                          mb: 1,
                          textShadow: "0 2px 10px rgba(0,0,0,0.1)",
                          fontSize: {
                            xs: "1.5rem",
                            sm: "1.75rem",
                            md: "2.125rem",
                          },
                        }}
                      >
                        {selectedService.name}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{
                          color: "rgba(255,255,255,0.9)",
                          fontWeight: 400,
                          fontStyle: "italic",
                          fontSize: { xs: "1rem", sm: "1.1rem", md: "1.25rem" },
                        }}
                      >
                        {selectedService.tagline}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Box sx={{ p: { xs: 2, sm: 3, md: 4 } }}>
                  <Grid container spacing={{ xs: 2, sm: 3, md: 4 }}>
                    <Grid item xs={12} md={8}>
                      <Typography
                        variant="h6"
                        sx={{
                          color: colors.dark,
                          fontWeight: 600,
                          mb: 2,
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          fontSize: { xs: "1.1rem", sm: "1.25rem" },
                        }}
                      >
                        <Launch
                          sx={{
                            fontSize: { xs: 18, sm: 20 },
                            color: colors.primary,
                          }}
                        />
                        About This Service
                      </Typography>
                      <Typography
                        variant="body1"
                        sx={{
                          color: colors.dark,
                          opacity: 0.8,
                          lineHeight: 1.8,
                          mb: 3,
                          fontSize: { xs: "0.9rem", sm: "1rem" },
                        }}
                      >
                        {selectedService.description}
                      </Typography>

                      <Box
                        sx={{
                          p: { xs: 2, sm: 3 },
                          background: "rgba(102, 126, 234, 0.04)",
                          borderRadius: 3,
                          border: "1px solid rgba(102, 126, 234, 0.1)",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: colors.dark,
                            fontWeight: 600,
                            mb: 2,
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          }}
                        >
                          Why Choose Us?
                        </Typography>
                        <Grid container spacing={{ xs: 1.5, sm: 2 }}>
                          {[
                            "Professional & Certified",
                            "24/7 Customer Support",
                            "Satisfaction Guarantee",
                            "Competitive Pricing",
                          ].map((feature, index) => (
                            <Grid item xs={12} sm={6} key={index}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <Box
                                  sx={{
                                    width: { xs: 20, sm: 24 },
                                    height: { xs: 20, sm: 24 },
                                    borderRadius: "50%",
                                    background: colors.gradient,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    flexShrink: 0,
                                  }}
                                >
                                  <Typography
                                    variant="caption"
                                    sx={{
                                      color: "white",
                                      fontWeight: 700,
                                      fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                    }}
                                  >
                                    ✓
                                  </Typography>
                                </Box>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: colors.dark,
                                    opacity: 0.8,
                                    fontSize: { xs: "0.85rem", sm: "0.875rem" },
                                  }}
                                >
                                  {feature}
                                </Typography>
                              </Box>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={4} sx={{ width: "100%" }}>
                      <Box
                        sx={{
                          p: { xs: 2, sm: 3 },
                          background: "white",
                          borderRadius: 3,
                          border: "1px solid rgba(102, 126, 234, 0.1)",
                          boxShadow: "0 10px 30px rgba(102, 126, 234, 0.05)",
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            color: colors.dark,
                            fontWeight: 600,
                            mb: 3,
                            pb: 2,
                            borderBottom: "2px solid",
                            borderImage: `${colors.gradient} 1`,
                            fontSize: { xs: "1.1rem", sm: "1.25rem" },
                          }}
                        >
                          Service Details
                        </Typography>

                        <Stack spacing={{ xs: 1.5, sm: 2 }}>
                          {[
                            {
                              icon: (
                                <CategoryIcon
                                  sx={{
                                    color: getCategoryColor(
                                      selectedService.category
                                    ),
                                    fontSize: { xs: 18, sm: 20 },
                                  }}
                                />
                              ),
                              label: "Category",
                              value: selectedService.category,
                            },
                            {
                              icon: (
                                <LocationOn
                                  sx={{
                                    color: colors.secondary,
                                    fontSize: { xs: 18, sm: 20 },
                                  }}
                                />
                              ),
                              label: "Location",
                              value: selectedService.city,
                            },
                            {
                              icon: (
                                <AccessTime
                                  sx={{
                                    color: colors.primary,
                                    fontSize: { xs: 18, sm: 20 },
                                  }}
                                />
                              ),
                              label: "Business Hours",
                              value:
                                selectedService.hours || "Mon-Fri: 9am-5pm",
                            },
                            {
                              icon: (
                                <CalendarToday
                                  sx={{
                                    color: colors.accent,
                                    fontSize: { xs: 18, sm: 20 },
                                  }}
                                />
                              ),
                              label: "Established",
                              value: selectedService.established,
                            },
                            {
                              icon: (
                                <Phone
                                  sx={{
                                    color: "#4CAF50",
                                    fontSize: { xs: 18, sm: 20 },
                                  }}
                                />
                              ),
                              label: "Phone",
                              value: selectedService.phone,
                            },
                            {
                              icon: (
                                <Email
                                  sx={{
                                    color: "#2196F3",
                                    fontSize: { xs: 18, sm: 20 },
                                  }}
                                />
                              ),
                              label: "Email",
                              value: selectedService.email,
                            },
                          ].map((item, index) => (
                            <Box
                              key={index}
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: { xs: 1.5, sm: 2 },
                                py: { xs: 0.5, sm: 1 },
                              }}
                            >
                              <Box
                                sx={{
                                  width: { xs: 36, sm: 40 },
                                  height: { xs: 36, sm: 40 },
                                  borderRadius: "50%",
                                  background: `${item.icon.props.color}15`,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  flexShrink: 0,
                                }}
                              >
                                {item.icon}
                              </Box>
                              <Box sx={{ flex: 1, minWidth: 0 }}>
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color: colors.dark,
                                    opacity: 0.6,
                                    display: "block",
                                    fontSize: { xs: "0.7rem", sm: "0.75rem" },
                                  }}
                                >
                                  {item.label}
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    color: colors.dark,
                                    fontWeight: 500,
                                    fontSize: { xs: "0.85rem", sm: "0.875rem" },
                                    wordBreak: "break-word",
                                  }}
                                >
                                  {item.value}
                                </Typography>
                              </Box>
                            </Box>
                          ))}
                        </Stack>

                        <Box
                          sx={{
                            mt: 3,
                            pt: 3,
                            borderTop: "1px solid rgba(102, 126, 234, 0.1)",
                            textAlign: "center",
                          }}
                        >
                          <Box
                            sx={{
                              display: "inline-flex",
                              alignItems: "center",
                              mb: 1,
                            }}
                          >
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                sx={{
                                  color:
                                    i < Math.floor(selectedService.rating)
                                      ? "#FFB400"
                                      : "#E0E0E0",
                                  fontSize: { xs: 20, sm: 24 },
                                }}
                              />
                            ))}
                            <Typography
                              variant="h5"
                              sx={{
                                color: colors.dark,
                                fontWeight: 700,
                                ml: 1,
                                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                              }}
                            >
                              {selectedService.rating}
                            </Typography>
                          </Box>
                          <Typography
                            variant="body2"
                            sx={{
                              color: colors.dark,
                              opacity: 0.7,
                              fontSize: { xs: "0.85rem", sm: "0.875rem" },
                            }}
                          >
                            Based on {selectedService.reviews} reviews
                          </Typography>
                        </Box>

                        <Box
                          sx={{
                            mt: 4,
                            display: "flex",
                            flexDirection: "column",
                            gap: { xs: 1.5, sm: 2 },
                          }}
                        >
                          <Button
                            variant="contained"
                            startIcon={<Phone />}
                            onClick={() => handleCall(selectedService.phone)}
                            fullWidth
                            sx={{
                              background: colors.gradient,
                              borderRadius: 3,
                              py: { xs: 1, sm: 1.5 },
                              fontWeight: 600,
                              fontSize: { xs: "0.9rem", sm: "1rem" },
                              "&:hover": {
                                background: colors.gradient,
                                transform: "translateY(-2px)",
                                boxShadow: `0 10px 25px ${colors.primary}40`,
                              },
                              transition: "all 0.3s",
                            }}
                          >
                            Call Now
                          </Button>
                          <Button
                            variant="outlined"
                            startIcon={<Email />}
                            onClick={() => handleEmail(selectedService.email)}
                            fullWidth
                            sx={{
                              borderRadius: 3,
                              borderColor: colors.primary,
                              color: colors.primary,
                              py: { xs: 1, sm: 1.5 },
                              fontWeight: 600,
                              fontSize: { xs: "0.9rem", sm: "1rem" },
                              "&:hover": {
                                background: "rgba(102, 126, 234, 0.04)",
                                borderColor: colors.secondary,
                                color: colors.secondary,
                                transform: "translateY(-2px)",
                              },
                              transition: "all 0.3s",
                            }}
                          >
                            Send Email
                          </Button>
                        </Box>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
          </Box>
        </Fade>
      </Modal>

      <Box
        sx={{
          mt: 6,
          pt: 4,
          pb: 2,
          px: { xs: 2, sm: 3 },
          textAlign: "center",
          borderTop: "1px solid rgba(102, 126, 234, 0.1)",
        }}
      >
        <Typography
          variant="body2"
          sx={{
            color: colors.dark,
            opacity: 0.6,
            fontSize: { xs: "0.8rem", sm: "0.875rem" },
          }}
        >
          © {new Date().getFullYear()} ServiceHub. All rights reserved.
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: colors.dark,
            opacity: 0.4,
            display: "block",
            mt: 1,
            fontSize: { xs: "0.7rem", sm: "0.75rem" },
          }}
        >
          Discover and connect with trusted services in your area
        </Typography>
      </Box>
    </Box>
  );
};

export default ServiceDirectory;
