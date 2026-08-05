import {

    ResponsiveContainer,

    RadarChart,

    Radar,

    PolarGrid,

    PolarAngleAxis,

    PolarRadiusAxis

} from "recharts";

import {

    ShieldCheck,

    HeartPulse

} from "lucide-react";

import AnalyticsChartCard from "./AnalyticsChartCard";

function FleetHealthChart() {

    const data = [

        {

            subject: "Battery",

            score: 88

        },

        {

            subject: "Signal",

            score: 94

        },

        {

            subject: "GPS",

            score: 97

        },

        {

            subject: "Telemetry",

            score: 91

        },

        {

            subject: "Mission",

            score: 95

        }

    ];

    const health = Math.round(

        data.reduce(

            (sum, item) => sum + item.score,

            0

        ) / data.length

    );

    return (

        <AnalyticsChartCard

            title="Fleet Health"

            value={`${health}%`}

            subtitle="Overall operational health score"

            icon={<ShieldCheck size={26} />}

            footer={

                <div className="flex items-center gap-2 text-green-400">

                    <HeartPulse size={16} />

                    <span className="text-sm">

                        All critical systems operating normally

                    </span>

                </div>

            }

        >

            <ResponsiveContainer

                width="100%"

                height={300}

            >

                <RadarChart

                    data={data}

                >

                    <PolarGrid
                        stroke="#333"
                    />

                    <PolarAngleAxis

                        dataKey="subject"

                        tick={{

                            fill: "#A3A3A3",

                            fontSize: 12

                        }}

                    />

                    <PolarRadiusAxis

                        tick={false}

                        axisLine={false}

                    />

                    <Radar

                        dataKey="score"

                        stroke="#D4AF37"

                        fill="#D4AF37"

                        fillOpacity={0.35}

                        strokeWidth={3}

                    />

                </RadarChart>

            </ResponsiveContainer>

        </AnalyticsChartCard>

    );

}

export default FleetHealthChart;