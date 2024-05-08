import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";

const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;

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
                <Tabs centered value={value} onChange={handleChange} scrollButtons="auto" variant="scrollable">
                    <Tab label="Monday" {...a11yProps(0)} />
                    <Tab label="Tuesday" {...a11yProps(1)} />
                    <Tab label="Wednesday" {...a11yProps(2)} />
                    <Tab label="Thursday" {...a11yProps(3)} />
                    <Tab label="Friday" {...a11yProps(4)} />
                    <Tab label="Saturrday" {...a11yProps(5)} />
                    <Tab label="Sunday" {...a11yProps(6)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}></CustomTabPanel>
            <CustomTabPanel value={value} index={1}></CustomTabPanel>
            <CustomTabPanel value={value} index={2}></CustomTabPanel>
            <CustomTabPanel value={value} index={3}></CustomTabPanel>
            <CustomTabPanel value={value} index={4}></CustomTabPanel>
            <CustomTabPanel value={value} index={5}></CustomTabPanel>
            <CustomTabPanel value={value} index={6}></CustomTabPanel>
        </>
    )
}

export default TabPanel