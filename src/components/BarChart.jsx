import { useTheme } from "@mui/material";
import { ResponsiveBar } from "@nivo/bar";
import { tokens } from "../theme";
import { mockBarData as data } from "../data/mockData";


const BarChart = (isDashboard = false) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    
    return (
        <ResponsiveBar
        data={data}
        theme={{
            axis:{
                domain :{
                    line : {
                        stroke : colors.grey[100]
                    }
                }, 
                legend : {
                    text : {
                        fill : colors.grey[100]
                    }
                }, 
                ticks: {
                    line : {
                        stroke : colors.grey[100],
                        strokeWidth : 1
                    },
                    text : {
                        fill : colors.grey[100]
                    }
                },
            }, 
            legends : {
                text : {
                    fill : colors.grey[100]
                }
            },
            tooltip : {
                container : {
                    color : colors.primary[500],
                }
            }
        }}
        keys={[
            'hot dog',
            'burger',
            'sandwich',
            'kebab',
            'fries',
            'donut',
            'junk', 
            'sushi',
            'ramen',
            'curry',
            'udon',
            'bagel',
            'yakitori',
            'takoyaki',
            'tacos',
            'miso soup',
            'tortilla',
            'tapas',
            'chipirones',
            'gazpacho',
            'soba',
            'bavette',
            'steak',
            'pizza',
            'spaghetti',
            'ravioli',
            'salad',
            'pad thai',
            'bun',
            'waffle',
            'crepe',
            'churros',
            'paella',
            'empanadas',
            'bruschetta',
            'onion soup',
            'cassoulet',
            'bouillabaisse',
            'unagi',
            'tempura',
            'tonkatsu',
            'shabu-shabu',
            'twinkies',
            'jerky',
            'fajitas',
            'jambalaya',
            'meatloaf',
            "mac n' cheese",
            'baked beans',
            'popcorn',
            'buffalo wings',
            'BBQ ribs',
            'apple pie',
            'nachos',
            'risotto',
            'tiramisu'
        ]}
        indexBy="country"
        margin={{ top: 50, right: 60, bottom: 50, left: 60 }}
        pixelRatio={1}
        padding={0.1}
        innerPadding={0}
        minValue={0}
        maxValue="auto"
        groupMode="stacked"
        layout="vertical"
        reverse={false}
        valueScale={{ type: 'linear' }}
        indexScale={{ type: 'band', round: true }}
        colors={{ scheme: 'red_blue' }}
        colorBy="id"
        borderWidth={0}
        borderRadius={0}
        borderColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        axisTop={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: '',
            legendOffset: 36,
            truncateTickAt: 0
        }}
        axisRight={null}
        axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : 'country',
            legendPosition: 'middle',
            legendOffset: 36,
            truncateTickAt: 0
        }}
        axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: isDashboard ? undefined : 'food',
            legendPosition: 'middle',
            legendOffset: -40,
            truncateTickAt: 0
        }}
        enableGridX={true}
        enableGridY={false}
        enableLabel={true}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{
            from: 'color',
            modifiers: [
                [
                    'darker',
                    1.6
                ]
            ]
        }}
        isInteractive={true}
        legends={[]}
    />

    );
};

export default BarChart;