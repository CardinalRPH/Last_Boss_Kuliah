import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import PropTypes from 'prop-types';
import MondayChart from "./chart/MondayChart";
import TuesdayChart from "./chart/TuesdayChart";
import WednesdayChart from "./chart/WednesdayChart";
import ThursdayChart from "./chart/ThursdayChart";
import FridayChart from "./chart/FridayChart";
import SaturdayChart from "./chart/SaturdayChart";
import SundayChart from "./chart/SundayChart";

const CustomTabPanel = ({ children, value, index, ...other }) => {

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box sx={{ p: 3, alignItems: 'center', display: 'flex', flexDirection: 'column' }}>
                    {children}
                </Box>
            )}
        </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
}


const a11yProps = (index) => {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const TabPanel = () => {
    const [value, setValue] = useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} scrollButtons="auto" variant="scrollable">
                    <Tab label="Monday" {...a11yProps(0)} />
                    <Tab label="Tuesday" {...a11yProps(1)} />
                    <Tab label="Wednesday" {...a11yProps(2)} />
                    <Tab label="Thursday" {...a11yProps(3)} />
                    <Tab label="Friday" {...a11yProps(4)} />
                    <Tab label="Saturday" {...a11yProps(5)} />
                    <Tab label="Sunday" {...a11yProps(6)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <MondayChart />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <TuesdayChart />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <WednesdayChart />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <ThursdayChart />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                <FridayChart />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
                <SaturdayChart />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={6}>
                <SundayChart />
            </CustomTabPanel>
        </>
    )
}

export default TabPanel