import { Box, Container, Typography } from "@mui/material"
import icon1 from "../assets/logo1fix.svg"

const AboutPage = () => {
    return (
        <Container sx={{ display: "flex", width: "100%", minHeight: "80vh", flexWrap: "wrap", flexDirection: { xs: "column", md: "row" } }}>
            <Box sx={{ width: { xs: "100%", md: "30%" }, p: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <img src={icon1} alt="Icon" width={250} height={250} />
            </Box>
            <Box sx={{ width: { xs: "100%", md: "70%" }, display: "flex", alignItems: "center", justifyContent: "center", p: 1, textAlign:"justify" }}>
                <Typography variant="h6">
                Smart Vertical Garden is a technology where this technology can monitor and control plants with IoT technology, especially in vertical gardens. The aim of technology is to make it easier for users to care for and maintain the plants they own both in terms of efficiency and energy
                </Typography>
            </Box>
        </Container>
    )
}

export default AboutPage