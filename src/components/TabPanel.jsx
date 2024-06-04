import { Box, Tab, Tabs } from "@mui/material";
import { useState } from "react";
import PropTypes from 'prop-types';
import PanelChart from "./PanelChart";

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

const TabPanel = ({ data }) => {
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
                <PanelChart
                    dateVal={data?.sensorsVal?.Monday.date}
                    waterVal={data?.watersVal?.Monday.data || []}
                    sensorVal={data?.sensorsVal?.Monday.data || []}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <PanelChart
                    dateVal={data?.sensorsVal?.Tuesday.date || data?.waterVal?.Tuesday.date}
                    waterVal={data?.watersVal?.Tuesday.data || []}
                    sensorVal={data?.sensorsVal?.Tuesday.data || []}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <PanelChart
                    dateVal={data?.sensorsVal?.Wednesday.date || data?.waterVal?.Wednesday.date}
                    waterVal={data?.watersVal?.Wednesday.data || []}
                    sensorVal={data?.sensorsVal?.Wednesday.data || []}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <PanelChart
                    dateVal={data?.sensorsVal?.Thursday.date || data?.waterVal?.Thursday.date}
                    waterVal={data?.watersVal?.Thursday.data || []}
                    sensorVal={data?.sensorsVal?.Thursday.data || []}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                <PanelChart
                    dateVal={data?.sensorsVal?.Friday.date || data?.waterVal?.Friday.date}
                    waterVal={data?.watersVal?.Friday.data || []}
                    sensorVal={data?.sensorsVal?.Friday.data || []}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
                <PanelChart
                    dateVal={data?.sensorsVal?.Saturday.date || data?.waterVal?.Saturday.date}
                    waterVal={data?.watersVal?.Saturday.data || []}
                    sensorVal={data?.sensorsVal?.Saturday.data || []}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={6}>
                <PanelChart
                    dateVal={data?.sensorsVal?.Sunday.date|| data?.waterVal?.Sunday.date}
                    waterVal={data?.watersVal?.Sunday.data || []}
                    sensorVal={data?.sensorsVal?.Sunday.data || []}
                />
            </CustomTabPanel>
        </>
    )
}

TabPanel.propTypes = {
    data: PropTypes.object,
}

export default TabPanel