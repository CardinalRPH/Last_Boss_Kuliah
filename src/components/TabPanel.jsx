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
                    dateVal={data?.sensorVal?.Monday.date}
                    waterVal={data?.waterVal?.Monday.data || []}
                    sensorVal={data?.sensorVal?.Monday.data || []}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
                <PanelChart
                    dateVal={data?.sensorVal?.Tuesday.date}
                    waterVal={data?.waterVal?.Tuesday.data || []}
                    sensorVal={data?.sensorVal?.Tuesday.data || []}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
                <PanelChart
                    dateVal={data?.sensorVal?.Wednesday.date}
                    waterVal={data?.waterVal?.Wednesday.data || []}
                    sensorVal={data?.sensorVal?.Wednesday.data || []}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={3}>
                <PanelChart
                    dateVal={data?.sensorVal?.Thursday.date}
                    waterVal={data?.waterVal?.Thursday.data || []}
                    sensorVal={data?.sensorVal?.Thursday.data || []}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={4}>
                <PanelChart
                    dateVal={data?.sensorVal?.Friday.date}
                    waterVal={data?.waterVal?.Friday.data || []}
                    sensorVal={data?.sensorVal?.Friday.data || []}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={5}>
                <PanelChart
                    dateVal={data?.sensorVal?.Saturday.date}
                    waterVal={data?.waterVal?.Saturday.data || []}
                    sensorVal={data?.sensorVal?.Saturday.data || []}
                />
            </CustomTabPanel>
            <CustomTabPanel value={value} index={6}>
                <PanelChart
                    dateVal={data?.sensorVal?.Sunday.date}
                    waterVal={data?.waterVal?.Sunday.data || []}
                    sensorVal={data?.sensorVal?.Sunday.data || []}
                />
            </CustomTabPanel>
        </>
    )
}

TabPanel.propTypes = {
    data: PropTypes.object,
}

export default TabPanel