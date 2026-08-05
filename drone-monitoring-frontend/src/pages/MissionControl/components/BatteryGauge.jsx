import { BatteryCharging } from "lucide-react";

import CircularGauge from "./CircularGauge";

function BatteryGauge({ value }) {

    const color =
        value > 60
            ? "#22C55E"
            : value > 30
            ? "#F59E0B"
            : "#EF4444";

    return (

        <CircularGauge

            title="Battery"

            value={value}

            unit="%"

            color={color}

            icon={
                <BatteryCharging
                    size={22}
                    color={color}
                />
            }

        />

    );

}

export default BatteryGauge;