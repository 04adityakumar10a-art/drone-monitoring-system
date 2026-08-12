import {
    Plane ,
    BatteryCharging,
    Activity,
    Wrench
} from "lucide-react";

import KPICard from "./KPICard";

function KPISection({ stats }) {

    return (

        <section className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

            <KPICard

                delay={0}

                title="Fleet Size"

                value={stats.totalDrones}

                subtitle="Registered enterprise drones"

                icon={Plane}

                color="#D4AF37"

            />

            <KPICard

                delay={0.1}

                title="In Flight"

                value={stats.inFlightDrones}

                subtitle="Currently executing missions"

                icon={Activity}

                color="#22C55E"

            />

            <KPICard

                delay={0.2}

                title="Average Battery"

                value={Math.round(stats.averageBattery)}

                suffix="%"

                subtitle="Across the complete fleet"

                icon={BatteryCharging}

                color="#00D2FF"

            />

            <KPICard

                delay={0.3}

                title="Maintenance"

                value={stats.maintenanceDrones}

                subtitle="Require inspection"

                icon={Wrench}

                color="#F97316"

            />

        </section>

    );

}

export default KPISection;