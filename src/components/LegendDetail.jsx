import { faSquare } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { Box, Grid, Typography } from "@mui/material"

const LegendDetail = () => {
    return (
        <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center", borderWidth:"1px", borderStyle:"solid", borderRadius:"5px" }}>
            <Box sx={{ display: "flex", alignItems: 'center', width: { xs: "100%", sm: "50%", md: "25%" } }}>
                <Typography sx={{ m: 1, width: "20%" }}>Soil :</Typography>
                <Box sx={{ m: 1, width: "80%" }}>
                    <Grid container>
                        <Grid item md={1} xs={1} sm={1.5}>
                            <FontAwesomeIcon icon={faSquare} style={{ color: "black" }} />
                        </Grid>
                        <Grid item md={3.5} xs={4.5}>
                            <Typography>Off</Typography>
                        </Grid>
                        <Grid item md={1} xs={0} sm={0}>
                            <Typography>:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ mx: 1 }}>0</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={1} xs={1} sm={1.5}>
                            <FontAwesomeIcon icon={faSquare} style={{ color: "forestgreen" }} />
                        </Grid>
                        <Grid item md={3.5} xs={4.5}>
                            <Typography>Wet</Typography>
                        </Grid>
                        <Grid item md={1} xs={0} sm={0}>
                            <Typography>:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ mx: 1 }}>{'<=400'}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={1} xs={1} sm={1.5}>
                            <FontAwesomeIcon icon={faSquare} style={{ color: "lightsalmon" }} />
                        </Grid>
                        <Grid item md={3.5} xs={4.5}>
                            <Typography>Medium</Typography>
                        </Grid>
                        <Grid item md={1} xs={0} sm={0}>
                            <Typography>:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ mx: 1 }}>{'401 - 699'}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={1} xs={1} sm={1.5}>
                            <FontAwesomeIcon icon={faSquare} style={{ color: "crimson" }} />
                        </Grid>
                        <Grid item md={3.5} xs={4.5}>
                            <Typography>Dry</Typography>
                        </Grid>
                        <Grid item md={1} xs={0} sm={0}>
                            <Typography>:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ mx: 1 }}>{'>=700'}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: 'center', width: { xs: "100%", sm: "50%", md: "25%" } }}>
                <Typography sx={{ m: 1, width: "20%" }}>Light :</Typography>
                <Box sx={{ m: 1, width: "80%" }}>
                    <Grid container>
                        <Grid item md={1} xs={1} sm={1.5}>
                            <FontAwesomeIcon icon={faSquare} style={{ color: "black" }} />
                        </Grid>
                        <Grid item md={3.5} xs={4.5}>
                            <Typography>Off</Typography>
                        </Grid>
                        <Grid item md={1} xs={0} sm={0}>
                            <Typography>:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ mx: 1 }}>0</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={1} xs={1} sm={1.5}>
                            <FontAwesomeIcon icon={faSquare} style={{ color: "burlywood" }} />
                        </Grid>
                        <Grid item md={3.5} xs={4.5}>
                            <Typography>Low</Typography>
                        </Grid>
                        <Grid item md={1} xs={0} sm={0}>
                            <Typography>:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ mx: 1 }}>{'<=600'}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={1} xs={1} sm={1.5}>
                            <FontAwesomeIcon icon={faSquare} style={{ color: "darkorange" }} />
                        </Grid>
                        <Grid item md={3.5} xs={4.5}>
                            <Typography>Medium</Typography>
                        </Grid>
                        <Grid item md={1} xs={0} sm={0}>
                            <Typography>:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ mx: 1 }}>{'601 - 899'}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={1} xs={1} sm={1.5}>
                            <FontAwesomeIcon icon={faSquare} style={{ color: "crimson" }} />
                        </Grid>
                        <Grid item md={3.5} xs={4.5}>
                            <Typography>High</Typography>
                        </Grid>
                        <Grid item md={1} xs={0} sm={0}>
                            <Typography>:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ mx: 1 }}>{'>=900'}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: 'center', width: { xs: "100%", sm: "50%", md: "25%" } }}>
                <Typography sx={{ m: 1, width: "20%" }}>Water :</Typography>
                <Box sx={{ m: 1, width: "80%" }}>
                    <Grid container>
                        <Grid item md={1} xs={1} sm={1.5}>
                            <FontAwesomeIcon icon={faSquare} style={{ color: "black" }} />
                        </Grid>
                        <Grid item md={3.5} xs={4.5}>
                            <Typography>Off</Typography>
                        </Grid>
                        <Grid item md={1} xs={0} sm={0}>
                            <Typography>:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ mx: 1 }}>0</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={1} xs={1} sm={1.5}>
                            <FontAwesomeIcon icon={faSquare} style={{ color: "crimson" }} />
                        </Grid>
                        <Grid item md={3.5} xs={4.5}>
                            <Typography>Bad</Typography>
                        </Grid>
                        <Grid item md={1} xs={0} sm={0}>
                            <Typography>:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ mx: 1 }}>{'<=30'}</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={1} xs={1} sm={1.5}>
                            <FontAwesomeIcon icon={faSquare} style={{ color: "dodgerblue" }} />
                        </Grid>
                        <Grid item md={3.5} xs={4.5}>
                            <Typography>Good</Typography>
                        </Grid>
                        <Grid item md={1} xs={0} sm={0}>
                            <Typography>:</Typography>
                        </Grid>
                        <Grid item>
                            <Typography sx={{ mx: 1 }}>{'31 - 100'}</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Box sx={{ display: "flex", alignItems: 'center', width: { xs: "100%", sm: "50%", md: "25%" } }}>
                <Typography sx={{ m: 1, width: "20%" }}>Rain :</Typography>
                <Box sx={{ m: 1, width: "80%" }}>
                    <Grid container>
                        <Grid item md={1} xs={1} sm={1.5}>
                            <FontAwesomeIcon icon={faSquare} style={{ color: "black" }} />
                        </Grid>
                        <Grid item md={4} xs={4.5}>
                            <Typography>Off or No</Typography>
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item md={1} xs={1} sm={1.5}>
                            <FontAwesomeIcon icon={faSquare} style={{ color: "royalblue" }} />
                        </Grid>
                        <Grid item md={4} xs={4.5}>
                            <Typography>Yes</Typography>
                        </Grid>
                    </Grid>
                </Box>
            </Box>

        </Box>
    )
}

export default LegendDetail